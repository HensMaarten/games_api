const mongoose = require('mongoose');
const genre = require('./genre');
const platform = require('./platform')
//_id
const GameSchema = new mongoose.Schema({
    title: {type: String},
    platforms: [{type: mongoose.Schema.Types.ObjectId, ref: platform}],
    genre: {type: mongoose.Schema.Types.ObjectId, ref: genre},
    metacritic_url: {type: String},
    trailer_url: {type: String},
}, {
    collection: 'games'
});

module.exports = mongoose.model('Game', GameSchema);