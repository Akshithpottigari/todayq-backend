const mongoose = require("mongoose");
const { collectionNames } = require("../constants");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["user"],
    default: "user",
  },
});

const userModel = mongoose.model(collectionNames.USER, userSchema);

module.exports = {
  userSchema,
  userModel,
};
