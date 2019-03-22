// const chai = require("chai");
// const chaiAsPromised = require('chai-as-promised');
// const sinon = require('sinon');
// const request = require('supertest');
// const express = require('express');
// const httpMocks = require('node-mocks-http'
// )
// const app = require('../app');
// const Book = require('../model/book');
// const Option = require('../model/options');

// const expect = chai.expect;
// chai.use(chaiAsPromised);
// let req;
// let res;


// beforeEach(() => {
//     // req = httpMocks.createRequest();
//     // res = httpMocks.createResponse();
//     sinon.stub(Book, 'countDocuments');
//     sinon.stub(Book,'deleteOne');
// });

// afterEach(() => {
//     Book.deleteOne.restore();
//     Book.countDocuments.restore();
// })

// const mockEntry = { _id: '507f1f77bcf86cd799439012', title: 'Test Title', category: 'Test category', description: 'Test Description' };
//         const mockFindOne = {
//             exec: function () {
//                 console.log('i am in mock fid one');
//                 return Promise.resolve(2);
//             }
//         };

// describe('Book Routes', function () {

//     it('should get count of total number of books', function (done) {
//         // sinon.stub(Book, 'countDocuments').callsFake(() => {
//         //     return new Promise((resolve) => {
//         //         resolve(2)
//         //     })
//         // });
//         // expect(Book.countDocuments()).to.eventually.equal(2);
//         Book.countDocuments.callsFake(() => {
//                 return new Promise((resolve) => {
//                     resolve(2)
//                 })
//             });
//         request(app)
//             .get('/api/book/count')
//             .expect(function (res) {
//                 sinon.assert.calledOnce(Book.countDocuments);
//               })
//             .expect(200, done);
//     });

//     it('should get options', function (done) {
//         let option = [
//             {
//                 label: 'History',
//                 value: 'ca_1'
//             }
//         ];
//         sinon.stub(Option, 'find').callsFake(() => {
//             return new Promise((resolve) => {
//                 resolve(option)
//             })
//         });
//         expect(Book.find()).to.eventually.equal(option);
//         request(app)
//             .get('/api/book/options')
//             .expect(200, done);
//     });

//     // it('should add book to the database', function(done) {
//     //     const book = new Book();
//     //     sinon.stub(book, 'save').callsFake(() => {
//     //         console.log('save stub is being called');
//     //         return new Promise((resolve) => {
//     //           resolve({
//     //               _id: '1000',
//     //               title: 'Title',
//     //               category: 'Category',
//     //               description: 'Description'
//     //           });
//     //         })
//     //     });

//     //     //expect(Book.save()).to.eventually.equal();
//     //     // request(app)
//     //     //   .post('/api/book/add')
//     //     //   .set('Accept', 'application/json')
//     //     //   .send({
//     //     //     _id: '',
//     //     //     title: 'Title',
//     //     //     category: 'Category',
//     //     //     description: 'Description'
//     //     //     })
//     //     //   .expect(201, done);
//     // });

//     it('should delete a book', function (done) {
        
//         // const user = {
//         //     _id: '001'
//         // };

//         // const mockFindOne = {
//         //     exec: function () {
//         //         return Promise.resolve(user);
//         //     }
//         // };

//         // const stud = sinon.stub(Book, 'deleteOne').withArgs(user).resolves(mockFindOne);

//         Book.deleteOne.yields(function() {
//             return new Promise((resolve) => {
//                 resolve(mockEntry._id);
//             }) 
//         });

//         request(app)
//             .delete('/api/book/delete/'+mockEntry._id)
//             .expect(function (res) {
//                 sinon.assert.calledOnce(Book.deleteOne);
//               })
//             .expect(200, done)

//     });
// });