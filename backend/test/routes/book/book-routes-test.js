'use strict';

const chai = require("chai");
const request = require('supertest');
const expect = chai.expect;
const sinon = require('sinon');

const app = require('../../../app');
const db = require('../../../connection');
const Book = require('../../../model/book')
const Options = require('../../../model/options')

const testBook = {
    title: 'Test Title',
    category: 'Test Category',
    description: 'Test Description'
};

const testOption = {
    label: 'Test Label',
    value: 'Test Value'
}

let _id;
const errorMessage = { message: 'Error in getting the options' };

describe('Options', function () {

    before((done) => {
        db.connect().then(() => {
            let option = new Options(testOption);
            option.save();
            done();
        }).catch(error => done(error));

    });

    after((done) => {
        Options.deleteOne({ label: testOption.label }).then(() => {
            db.close();
            done();
        }).catch(err => {
            db.close();
            done(err);
        });
    });

    it('should get the options', function (done) {
        request(app)
            .get('/api/book/options')
            .expect(200)
            .end(function (err, res) {
                const index = res.body.findIndex((element) => element.label === testOption.label);
                expect(index).to.not.equal(-1);
                done();
                if (err) done(err);
            });
    });
});

describe('Book', function () {

    before((done) => {
        db.connect().then(() => {
            let book = new Book(testBook);
            book.save().then((response) => {
                _id = response._id
                done();
            });
        }).catch(error => done(error));
    });

    after((done) => {
        Book.deleteOne({ title: testBook.title }).then(() => {
            db.close();
            done();
        }).catch(err => {
            db.close();
            done(err);
        });
    });

    it('should get the count of books', function (done) {
        request(app)
            .get('/api/book/count')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.not.equal(0);
                done();
                if (err) done(err);
            });
    });

    it('should get all the books', function (done) {
        request(app)
            .get('/api/book?pageSize=2&pageIndex=1')
            .expect(200)
            .end(function (err, res) {
                const index = res.body.findIndex((element) => element.title === testBook.title);
                expect(res.body.length).to.not.equal(0);
                expect(index).to.not.equal(-1);
                done();
                if (err) done(err);
            });
    });

    it('should delete the book', function (done) {
        request(app)
            .delete('/api/book/delete/' + _id)
            .expect(200, done);
    });

    it('should add a book', function (done) {
        const testBook_2 = {
            title: 'Test Title 2',
            category: 'Test Category 2',
            description: 'Test Description 2'
        }
        request(app)
            .post('/api/book/add')
            .send(testBook_2)
            .expect(201)
            .end(function (err, res) {
                if(res.body._id) {
                    expect(res.body._id).to.not.be.null;
                    Book.findByIdAndDelete(res.body._id).then(() => done());
                }
                if (err) done(err);
            });
    });

});

describe('Error handling', () => {
    it('should return an error if delete a book failed', function (done) {
        request(app)
            .delete('/api/book/delete/100')
            .expect(500)
            .end(function (err, res) {
                expect(res.body.message).to.not.be.null;
                done();
            });
    });

    it('should return an error if add a book failed', function (done) {
        const testBook_2 = {
            category: 'Test Category 2',
            description: 'Test Description 2'
        }
        request(app)
            .post('/api/book/add')
            .send(testBook_2)
            .expect(500)
            .end(function (err, res) {
                expect(res.body.message).to.not.be.null;
                done();
            });
    });

    it('should return an error when get books failed', function (done) {
        request(app)
            .get('/api/book?pageSize=2&pageIndex=abc')
            .expect(500)
            .end(function (err, res) {
                expect(res.body.message).to.not.be.null;
                done();
            });
    });

    it('should return an error when get a count of total number of books failed', function (done) {
        sinon.stub(Book, 'countDocuments').callsFake(() => {
            return new Promise((resolve) => {
                resolve(errorMessage);
            });
        });
        request(app)
            .get('/api/book/count')
            .expect(500)
            .end(function (err, res) {
                expect(res.body).to.eql(errorMessage);
                done();
            });
    });

    it('should return an error when get options failed', function (done) {
        sinon.stub(Options, 'find').callsFake(() => {
            return new Promise((resolve) => {
                resolve(errorMessage);
            });
        });
        request(app)
            .get('/api/book/options')
            .expect(500)
            .end(function (err, res) {
                expect(res.body).to.eql(errorMessage);
                done();
            });
    });
})