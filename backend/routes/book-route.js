
const express = require('express');
const router = express.Router();

const Book = require('../model/book');
const Option = require('../model/options');

router.post('/add', (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description
    });

    book.save().then(() => {
        res.status(201).json(book)
    }).catch(error => {
        console.log('Error has occured while adding a book');
        next(error);
    });
});

router.get('/options', (req, res, next) => {
    Option.find().then(documents => {
        res.status(200).json(documents);
    }).catch(error => {
        console.log('Error has occured retrieving options');
        next(error);
    });
});

router.get('', (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    const query = Book.find();

    query.skip(pageSize * (pageIndex - 1)).limit(pageSize);
    query.then(documents => {
        res.status(200).json(documents);
    }).catch(error => {
        console.log('Error has occured retrieving books');
        next(error);
    });
});

router.get('/count', (req, res, next) => {
    Book.countDocuments().then(count => {
        res.status(200).json(count);
    }).catch(error => {
        console.log('Error has occured total number of books');
        next(error);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Book.deleteOne({ _id: req.params.id }).then(
        response => {
            if (response.n > 0) {
                res.status(200).json(req.params.id);
            }
        }).catch(error => {
            console.log('Error has occured while deleting the book');
            next(error);
        });
});

module.exports = router;


