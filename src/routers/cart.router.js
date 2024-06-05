const express = require("express");
const router = express.Router();
const {
  GetCartItemsByUser,
  UpsertCartItemsByUser,
} = require("../controllers/cart.controller");
const { UserJWTMiddleware } = require("../middlewares/userJwtMiddleware");

router.get("/", UserJWTMiddleware, GetCartItemsByUser);
router.put("/", UserJWTMiddleware, UpsertCartItemsByUser);

module.exports = router;
