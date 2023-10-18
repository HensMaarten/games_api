const mongoose = require('mongoose');
const Game = require('./game');
//_id
const UserSchema = new mongoose.Schema({
    username: {type: String},
    owned_games: [{type: mongoose.Schema.Types.ObjectId, ref: Game}],
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);