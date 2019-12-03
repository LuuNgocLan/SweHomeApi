const express = require("express");
const router = express.Router();

const homestayController = require("../controllers/homestayController");

router.post("/crawldata", homestayController.crawl_data);

router.get("/", homestayController.get_all);

router.post("/search", homestayController.search);

router.get("/:homestayId", homestayController.get_detail);

router.post("/top_spots", homestayController.get_top_spots);

router.post("/recommend", homestayController.base_content_recommendation);

// router.get("/search", homestayController.search);

module.exports = router;