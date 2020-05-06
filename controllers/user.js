const User = require("../models/user");

////////////////////////////

var aws = require("aws-sdk");
require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-1", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const S3_BUCKET = process.env.bucket;
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req, res) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read",
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    // Send it all back
    res.json({ success: true, data: { returnData } });
  });
};

////////////////////////////

export const getUsers = (req, res, next) => {
  User.find()
    .then((users) =>
      res.status(200).json({
        users,
      })
    )
    .catch((err) => console.log({ err }));
};

export const createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userId = req.body._id;

  if (req.body._id) {
    editTask({ userId, name, email, password });
    return;
  }
  addUserToDb({ name, email, password, res });
};

export const addUserToDb = ({ name, email, password, res }) => {
  const user = new User({
    name,
    email,
    password,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "user created successfully!",
        user: result,
      });
    })
    .catch((err) => console.log({ err }));
};

export const editTask = ({ taskId, title, description }) => {
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        res.status(500).json({
          message: "Task not found!",
        });
      }
      task.title = title;
      task.description = description;
      return task.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Task fetch successfully!",
        task: result,
      });
    })
    .catch((err) => console.log("Errorrrrrr", err));
};

export const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email, password })
    .then((user) =>
      res.status(200).json({
        user,
        status: true,
      })
    )
    .catch((err) => console.log({ err }));
};
