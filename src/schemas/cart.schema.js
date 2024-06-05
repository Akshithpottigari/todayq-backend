const mongoose = require("mongoose");
const { collectionNames } = require("../constants");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: collectionNames.USER,
    required: true,
  },
  items: [
    {
      type: mongoose.Types.ObjectId,
      ref: collectionNames.OFFERS,
      required: true,
    },
  ],
});
const cartModel = mongoose.model(collectionNames.CART, cartSchema);
module.exports = { cartModel, cartSchema };
