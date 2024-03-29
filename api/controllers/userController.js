const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Homestay = require("../models/homestay")

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          code: 409,
          status: "Error",
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              username: req.body.username,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  code: 201,
                  status: "Success",
                  message: "Register success!"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  console.log(req.body.email + " " + req.body.password);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          code: 401,
          status: "Error",
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            code: 401,
            status: "Error",
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "100h"
            }
          );
          return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Login successful",
            token: token
          });
        }
        res.status(401).json({
          code: 401,
          status: "Error",
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_all = (req, res, next) => {
  User.find()
    .select("email _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            email: doc.email,
            _id: doc._id,
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json({
        code: 200,
        status: "Success",
        data: response
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
        message: err
      });
    });
}

exports.edit_profile = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const userId = decoded.userId;

  User.update({ _id: userId }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        code: 200,
        status: "Success",
        message: "Profile updated",

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

exports.get_profile = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const userId = decoded.userId;

  User.findById(userId)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          code: 200,
          status: "Success",
          profile: doc
        });
      } else {
        res
          .status(404)
          .json({
            code: 404,
            status: "Error",
            message: "User not found!"
          });
      }
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

