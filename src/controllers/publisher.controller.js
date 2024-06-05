const { default: mongoose } = require("mongoose");
const { collectionNames } = require("../constants");
const { publisherSchema } = require("../schemas/publisher.schema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const PUBLISHER_MODEL = mongoose.model(
  collectionNames.PUBLISHER,
  publisherSchema
);

module.exports = {
  CreatePublisher: async (req, res) => {
    try {
      let { body } = req;
      let userCheck = await PUBLISHER_MODEL.findOne({ email: body.email });
      if (userCheck) {
        res.json({ error: "Publisher already exists with that email" });
      }
      let hashedPassword = await bcrypt.hash(body.password, saltRounds);
      let publisher = await PUBLISHER_MODEL.create({
        ...body,
        password: hashedPassword,
        type: "publisher",
      });
      res.json({ data: true });
    } catch (error) {
      console.error(error);
      res.json({ error: "Unexpected error" });
    }
  },
  PublisherLogin: async (req, res) => {
    try {
      let { body } = req;
      let user = await PUBLISHER_MODEL.findOne({ email: body.email });
      if (!user) {
        res.status(401).json({ error: "No publisher found" });
      }
      user = user.toObject();
      let passwordCheck = await bcrypt.compare(body.password, user.password);
      if (!passwordCheck) {
        res.json({ error: "Wrong password" });
      }
      delete user.password;
      let token = jwt.sign(user, process.env.JWT_KEY, {
        expiresIn: "20d",
      });
      res.json({ data: { token, user } });
    } catch (error) {
      console.error(error);
      res.json({ error: "Unexpected error" });
    }
  },
};
