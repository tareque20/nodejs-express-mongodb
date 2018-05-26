var mongoose = require('mongoose');

// Books Schema
var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },

    create_date: {
        type: Date,
        default: Date.now()
    }
});


var Book = module.exports = mongoose.model('Book', bookSchema);

// get genres
module.exports.getBooks = function (callback, limit) {
    Book.find(callback).limit(limit);
};