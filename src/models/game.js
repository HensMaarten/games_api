const mongoose = require('mongoose');
//_id
const GameSchema = new mongoose.Schema({
    title: {type: String},
    platforms: {type: Array},
    genre: {type: String},
    metacritic_url: {type: String},
    trailer_url: {type: String},
}, {
    collection: 'games'
});

module.exports = mongoose.model('Game', GameSchema);