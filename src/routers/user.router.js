const { Router } = require("express");
const { CreateUser, Login } = require("../controllers/user.controller");

let router = Router();

router.post("/create", CreateUser);
router.post("/login", Login);

module.exports = router;
