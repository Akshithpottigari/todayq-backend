const express = require("express");
const { GetOffers, CreateOffer } = require("../controllers/offer.controller");
const {
  PublisherJWTMiddleware,
} = require("../middlewares/PublisherJwtMiddleware");
const router = express.Router();

router.get("/", GetOffers);
router.post("/", PublisherJWTMiddleware, CreateOffer);

module.exports = router;
