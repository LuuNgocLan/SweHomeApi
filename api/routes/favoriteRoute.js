const express = require("express");
const router = express.Router();

const FavoriteControler = require('../controllers/favoriteControler');
const checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, FavoriteControler.favorite);

router.get("/", checkAuth, FavoriteControler.get_favorite);

module.exports = router;    
