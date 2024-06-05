const { default: mongoose, Types } = require("mongoose");
const { collectionNames } = require("../constants");
const { cartSchema } = require("../schemas/cart.schema");

const CART_MODEL = mongoose.model(collectionNames.CART, cartSchema);

module.exports = {
  GetCartItemsByUser: async (req, res) => {
    try {
      let user = req.user;
      let cart = await CART_MODEL.find({
        userId: new Types.ObjectId(user._id),
      }).populate("items");

      res.json({ data: cart });
    } catch (error) {
      res.status(500).json({error: "Unknown error"})
    }
  },
  UpsertCartItemsByUser: async (req, res) => {
    try {
      let { body, user } = req;
      // body.items = body.items.map((item) => ({
      //   ...item,
      //   offer: new Types.ObjectId(item.offer),
      // }));
      let cart = await CART_MODEL.findOneAndUpdate(
        {
          userId: user._id,
        },
        body,
        { upsert: true }
      );
      res.json({ data: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
