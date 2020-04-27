const express = require("express");

const feedController = require("../controllers/feed");

const router = express.Router();

// GET /feed/post   get single post by id
router.get("/post/:postId", feedController.getPost);

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post("/post", feedController.createPost);

module.exports = router;
