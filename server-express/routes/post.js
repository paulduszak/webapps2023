const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`;

router.use(function (req, res, next) {
  // console.log("In post router");
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
  //console.log("In POST /post handler", JSON.stringify(req));
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
  });
  post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        author: savedPost.author,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  //console.log("In GET /post handler");
  Post.find()
    .where("author")
    .equals(req.payload.id)
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// router.put

// router.delete("/:id", async function (req, res) {}
// //   //console.log("In DELETE /post handler");
// //   Post.findByIdAndDelete(req.params.id)
// //     .where("author")
// //     .equals(req.payload.id)
// //     .then((post) => {
// //       if (post) {
// //         return res.status(200).json({
// //           id: post._id,
// //           title: post.title,
// //           content: post.content,});
// //         }}).catch((error) => {

module.exports = router;
