require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const OffersRouter = require("./routers/Offer.router");
const CheckoutRouter = require("./routers/checkout.router");
const CartItemsRouter = require("./routers/cart.router");
const PublisherRouter = require("./routers/publisher.router");
const UserRouter = require("./routers/user.router");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/offers", OffersRouter);
app.use("/checkout", CheckoutRouter);
app.use("/cartItems", CartItemsRouter);
app.use("/user", UserRouter);
app.use("/publisher", PublisherRouter);

async function MongooseConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("error: ", error);
  }
}

app.listen(port, async () => {
  await MongooseConnect();
  console.log(`App listening on port ${port}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
