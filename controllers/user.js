const User = require("../models/user");

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
  const imageUrl = req.body.imageUrl;
  if (req.body._id) {
    editTask({ userId, name, email, password, imageUrl });
    return;
  }
  addUserToDb({ name, email, password, res, imageUrl });
};

export const addUserToDb = ({ name, email, password, res, imageUrl }) => {
  const user = new User({
    name,
    email,
    password,
    imageUrl,
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

export const editTask = ({ taskId, title, description, imageUrl }) => {
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        res.status(500).json({
          message: "Task not found!",
        });
      }
      task.title = title;
      task.description = description;
      task.imageUrl = imageUrl;
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
