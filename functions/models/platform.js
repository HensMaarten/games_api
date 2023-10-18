const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
    name: {type: String},
}, {
    collection: 'platforms'
});

module.exports = mongoose.model('Platform', PlatformSchema);