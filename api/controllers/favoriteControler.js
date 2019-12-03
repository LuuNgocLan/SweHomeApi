const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Favorite = require("../models/favorite");
const Homestay = require("../models/homestay");
const User = require("../models/user");

exports.get_favorite = (req, res, next) => {
    //Get User 
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.userId;

    Favorite.find({ user: userId })
        .populate("homestay")
        .exec()
        .then(docs => {
            res.status(200).json({
                code: 200,
                status: "Success",
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.favorite = (req, res, next) => {
    //Get User 
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.userId;
    //Find id Homestay
    const homestayId = req.body.homestayId;
    const isFavorite = req.body.isFavorite;

    console.log(userId + " " + homestayId + " " + isFavorite);

    if (isFavorite) {
        Homestay.findById(homestayId)
            .then(homestay => {
                if (!homestay) {
                    return res.status(404).json({
                        code: 404,
                        status: "Error",
                        message: "Homestay not found"
                    });
                }
                //Create new Favorite
                const favorite = new Favorite({
                    _id: mongoose.Types.ObjectId(),
                    homestay: req.body.homestayId,
                    user: userId
                });
                return favorite.save();
            })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    code: 201,
                    status: "Success",
                    message: "Favorite Successfully"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    code: 500,
                    status: "Error",
                    error: err
                });
            });
    } else {
        Favorite.find({
            homestay: homestayId,
            user: userId
        })
            .exec()
            .then(favorite => {
                if (favorite.length > 0) {
                    Favorite.remove({ _id: favorite._id })
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                code: 200,
                                status: "Success",
                                message: "Homestay was unfavorited"
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                code: 500,
                                status: "Error",
                                message: err
                            });
                        });
                } else {
                    
                }
            })

    }

};


