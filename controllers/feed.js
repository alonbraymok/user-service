const Post = require("../models/post");

export const getPosts = (req, res, next) => {
  Post.find()
    .then((posts) =>
      res.status(200).json({
        posts,
      })
    )
    .catch((err) => console.log({ err }));
};

export const createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "sadd",
    creator: {
      name: "Alon braymok",
    },
  });
  post
    .save()
    .then((result) => {
      console.log({ result });
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => console.log({ err }));
};

export const getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      console.log({ post });
      if (!post) {
        res.status(500).json({
          message: "Post not found!",
        });
      }
      res.status(200).json({
        message: "Post fetch successfully!",
        post,
      });
    })
    .catch((err) => console.log("Errorrrrrr", err));
};
