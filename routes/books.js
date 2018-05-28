var express = require('express');
var router = express.Router();

Book = require('../models/book');

router.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if (err) {
            throw err;
        }
        console.log(books);
        res.render('books', books);
    });
});

router.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.post('/api/books', function (req, res) {
    var book = req.body;
    const schema = {
        title: Joi.string().min(3).required()
    };

    const result = Joi.validate(book, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    Book.addBook(book, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.put('/api/books/:_id', function (req, res) {
    var id = req.params._id;
    var book = req.body;
    const schema = {
        title: Joi.string().min(3).required()
    };

    const result = Joi.validate(book, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    Book.updateBook(id, book, {}, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.delete('/api/books/:_id', function (req, res) {
    var id = req.params._id;
    Book.removeBook(id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

module.exports = router;