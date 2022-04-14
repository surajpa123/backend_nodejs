const express = require("express");
const connect = require("./configs/db.js");

const productController = require("./controller/product_controller");

const app = express();

app.use(express.json());

app.use("/product",productController);



app.listen(3000, async () => {
  await connect();
  console.log("Listing on port 3000");
});
