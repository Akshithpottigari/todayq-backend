const { default: mongoose, Schema, Types } = require("mongoose");
const { collectionNames } = require("../constants");

const CheckoutSchema = mongoose.Schema;

const CheckoutSchemaModel = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: collectionNames.USER,
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: collectionNames.OFFERS,
        required: true,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    address: {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
      },
      zipCode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    uploadId: {
      type: Types.ObjectId,
      // required: true,
      ref: collectionNames.UPLOAD,
    },
    paymentDetails: {
      cc: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const CheckoutModel = mongoose.model(
  collectionNames.CHECKOUT,
  CheckoutSchemaModel
);

module.exports = {
  CheckoutSchema,
  CheckoutModel,
  CheckoutSchemaModel,
};
