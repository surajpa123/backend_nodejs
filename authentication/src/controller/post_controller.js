
const express = require("express");

const Post = require("../models/post_model")

const authenticate = require("../middle/authentication")

const router = express.Router();

router.patch("", authenticate, async (req, res) => {
    try {
      req.body.user_id = req.user._id;
      const posts = await Post.create(req.body);
  
      return res.send(posts);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
});

  
router.delete("", authenticate, async (req, res) => {
    try {
      req.body.user_id = req.user._id;

      const posts = await Post.findByIdAndDelete(req.body).lean().exec();
      console.log(posts)
  
      return res.send(posts);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
});

router.post("", async (req, res) => {
    try {
      
      const posts = await Post.create(req.body);
      return res.send(posts);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
});
router.get("",  async (req, res) => {
    try {
      const posts = await Post.find().lean().exec()
      return res.send(posts);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
});



module.exports = router;
