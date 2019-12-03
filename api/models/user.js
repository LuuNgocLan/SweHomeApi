const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: Boolean, requied: false },
    role: { type: String, required: true, default: "user" },
    avatar: { type: String, requied: true, default: "" },
    favorites: { type: Array, requied: [] },
    phone: { type: String, requied: false },
    address: { type: String, requied: false }
});

module.exports = mongoose.model('User', userSchema);