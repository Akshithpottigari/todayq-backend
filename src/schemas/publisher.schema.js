const mongoose = require("mongoose");
const { collectionNames } = require("../constants");

const publisherSchema = new mongoose.Schema({
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
    enum: ["publisher"],
    default: "publisher",
  },
});

const publisherModel = mongoose.model(
  collectionNames.PUBLISHER,
  publisherSchema
);

module.exports = {
  publisherSchema,
  publisherModel,
};
