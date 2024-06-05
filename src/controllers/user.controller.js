const { default: mongoose } = require("mongoose");
const { collectionNames } = require("../constants");
const { userSchema, userModel } = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const USER_MODEL = mongoose.model(collectionNames.USER, userSchema);

module.exports = {
  CreateUser: async (req, res) => {
    try {
      let { body } = req;
      let userCheck = await USER_MODEL.findOne({ email: body.email });
      if (userCheck) {
        res.json({ error: "User already exists with that email" });
        return;
      }
      let hashedPassword = await bcrypt.hash(body.password, saltRounds);
      let user = await USER_MODEL.create({
        ...body,
        password: hashedPassword,
        type: "user",
      });
      res.json({ data: true });
    } catch (error) {
      console.error(error);
      res.json({ error: "Unexpected error" });
    }
  },
  Login: async (req, res) => {
    try {
      let { body } = req;
      let user = await USER_MODEL.findOne({ email: body.email });
      if (!user) {
        res.json({ error: "No user found" });
      }
      user = user.toObject();
      let passwordCheck = await bcrypt.compare(body.password, user.password);
      if (!passwordCheck) {
        res.status(401).json({ error: "Wrong password" });
      }
      delete user.password;
      let token = jwt.sign(user, process.env.JWT_KEY, {
        expiresIn: "20d",
      });
      res.json({ data: { token, user } });
      return;
    } catch (error) {
      console.error(error);
      res.json({ error: "Unexpected error" });
    }
  },
};
