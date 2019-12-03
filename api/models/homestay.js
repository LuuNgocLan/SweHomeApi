const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homestay = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: false },
    price: { type: String, required: false },
    description: { type: String, required: false },
    url: { type: String, required: false },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
    about: { type: Array, required: [] },
    review_score: { type: Number, required: false },
    num_reviews: { type: Number, required: false },
    list_review: [{
        name: { type: String, required: false },
        country: { type: String, required: false },
        content: { type: String, required: false },
        score: { type: Number, required: false },
        avatar: { type: String, required: false },
        date: { type: String, required: false },
        age: { type: String, required: false }
    }],
    image_map: { type: String, required: false },
    image_center: { type: String, required: false },
    house_facilities: { type: Array, required: false },
    meals: { type: String, required: false },
    house_rules: { type: String, required: false },
    address: { type: String, required: false },
    available_for: { type: Array, required: false },
    area_facilities: { type: Array, required: false },
    about_area: { type: String, required: false }
});

module.exports = mongoose.model('Homestay', homestay);
