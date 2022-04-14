const express = require("express");
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const redis = require("../configs/redis")

const router = express.Router();

const Product = require("../models/product_model");

router.get("", async (req,res) => {
    // check the redis frist for data
    try {
        redis.get("fetchproducts", async function (err, fetchproducts) {
          if (err) return res.status(500).send({ message: err.message });
          if (fetchproducts)
            return res
              .status(200)
              .send({ posts: JSON.parse(fetchproducts), redis: true });
    
          const products = await Product.find().lean().exec();
          redis.set("fetchproducts", JSON.stringify(products));
    
          return res.status(200).send({products, redis: false });
        });
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    // if yes then serve
    // if not fetch the dat
})
router.post("", async (req,res) => {

    try{
        const product = await Product.create(req.body)
        const products = await Product.find().lean().exec();
        redis.set("allproduct",product._id.toString(), JSON.stringify(products));
        return res.status(201).send(product);
    }catch(err){
        return res.status(500).send({ message: err.message });
    }
})
router.get("/:id", async (req, res) => {
  try {
    // posts.620e26e3016519842f847e6f
    redis.get(`products.${req.params.id}`, async function (err, fetchproducts) {
      if (err) return res.status(500).send({ message: err.message });

      if (fetchproducts)
        return res
          .status(200)
          .send({ post: JSON.parse(fetchproducts), redis: true });

      const product = await Product.findById(req.params.id).lean().exec();
      redis.set(`products.${req.params.id}`, JSON.stringify(product));

      return res.status(200).send({ product, redis: false });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const products = await Product.find().lean().exec();

    redis.set(`products.${req.params.id}`, JSON.stringify(product));
    redis.set("allproduct", JSON.stringify(products));

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    const products = await Product.find().lean().exec();

    redis.del(`products.${req.params.id}`);
    redis.set("allproduct", JSON.stringify(products));

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;