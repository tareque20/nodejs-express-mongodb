var express = require('express');
var router = express.Router();

Genre = require('../models/genres');

router.get('/api/genres', function (req, res) {
    Genre.getGenres(function (err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres);
    });
});

router.post('/api/genres', function (req, res) {
    var genre = req.body;
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(genre, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    Genre.addGenre(genre, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

router.put('/api/genres/:_id', function (req, res) {
    var id = req.params._id;
    var genre = req.body;
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(genre, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    Genre.updateGenre(id, genre, {}, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

router.delete('/api/genres/:_id', function (req, res) {
    var id = req.params._id;
    Genre.removeGenre(id, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

module.exports = router;