const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// GET /task/:taskId   get single task by id
// router.get("/user/:taskId", userController.getUser);

// // GET /user/users
router.get("/users", userController.getUsers);

// POST /tasks/create
router.post("/create", userController.createUser);

// GET /login
router.post("/login", userController.login);

module.exports = router;
