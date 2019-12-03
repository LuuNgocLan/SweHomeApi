const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    homestay: { type: mongoose.Schema.Types.ObjectId, ref: 'Homestay', required: true },
    user: { type: String, required: true}
});

module.exports = mongoose.model('Favorite', favoriteSchema);