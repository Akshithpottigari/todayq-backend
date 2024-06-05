const mongoose = require("mongoose");
const { collectionNames } = require("../constants");

const uploadSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  checkoutId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  filename: {
    type: String,
    required: true,
  },
});

const uploadModel = mongoose.model(collectionNames.UPLOAD, uploadSchema);

module.exports = {
  uploadModel,
  uploadSchema,
};
