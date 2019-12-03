const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name_place:{type: String, required: true},
    placeImage:{type: String, required: true},
    list_spots:{type: Array, required: false},
    about:{type: String, required: false}
})

module.exports = mongoose.model('Place', placeSchema);