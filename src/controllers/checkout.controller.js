const { default: mongoose } = require("mongoose");
const { collectionNames } = require("../constants");
const {
  CheckoutSchema,
  CheckoutSchemaModel,
} = require("../schemas/Checkout.schema");
const { uploadModel, uploadSchema } = require("../schemas/upload.schema");
const { cartSchema } = require("../schemas/cart.schema");

const CART_MODEL = mongoose.model(collectionNames.CART, cartSchema);

const CHECKOUT_MODEL = mongoose.model(
  collectionNames.CHECKOUT,
  CheckoutSchemaModel
);

const UPlOAD_MODEL = mongoose.model(collectionNames.UPLOAD, uploadSchema);

module.exports = {
  CreateCheckout: async (req, res) => {
    try {
      let { body } = req;

      let checkout = await CHECKOUT_MODEL.create({
        userId: req.user._id,
        ...body,
      });
      // Emptying cart itmes
      await CART_MODEL.findOneAndUpdate(
        { userId: req.user._id },
        { $set: { items: [] } }
      );
      res.json({ data: checkout });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  uploadDocument: async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let { checkoutId } = req.query;

    let uploadedDocument = await UPlOAD_MODEL.create({
      checkoutId,
      userId: req.user._id,
      filename: req.file.filename,
    });

    let checkoutDocument = await CHECKOUT_MODEL.findOneAndUpdate(
      { _id: checkoutId },
      {
        $set: {
          uploadId: uploadedDocument._id,
        },
      }
    );

    res.status(200).json({ data: req.file.filename });
  },
};
