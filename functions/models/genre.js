const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name: {type: String},
}, {
    collection: 'genres'
});

module.exports = mongoose.model('Genre', GenreSchema);