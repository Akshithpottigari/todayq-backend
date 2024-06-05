const { Router } = require("express");
const {
  CreatePublisher,
  PublisherLogin,
} = require("../controllers/publisher.controller");

let router = Router();

router.post("/create", CreatePublisher);
router.post("/login", PublisherLogin);

module.exports = router;
