const request = require('request');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const Place = require("../models/place");
const Homestay = require("../models/homestay");

exports.get_all = (req, res, next) => {
    Place.find()
        .select("name_place placeImage _id list_spots about")
        .exec()
        .then(docs => {
            //   if (docs.length >= 0) {
            res.status(200).json({
                code: 200,
                status: "Success",
                data: docs.map(doc => {
                    return {
                        name_place: doc.name_place,
                        placeImage: doc.placeImage,
                        about: doc.about,
                        list_spots: doc.list_spots
                    };
                })
            });
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                code: 500,
                status: "Error",
                data: err
            });
        });
}

exports.create_place = (req, res, next) => {
    const place = new Place({
        _id: new mongoose.Types.ObjectId(),
        name_place: req.body.name_place,
        about: req.body.about,
        placeImage: req.file.path
    });
    place
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                code: 201,
                status: "Success",
                message: "Created place successfully!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                code: 500,
                status: "Error",
                message: err
            });
        });
}

exports.update_place = (req, res, next) => {

}

exports.get_place = (req, res, next) => {
    const id = req.params.placeId;
    Place.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    code: 200,
                    status: "Success",
                    data: doc
                });
            } else {
                res
                    .status(404)
                    .json({
                        code: 404,
                        status: "Error",
                        data: "No valid entry found for provided ID"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                code: 500,
                status: "Error",
                data: err
            });
        });
}

exports.place_delete = (req, res, next) => {
    const id = req.params.placeId;
    Place.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                code: 200,
                status: "Success",
                message: "Place deleted!"
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
}