const express = require("express");
const mongoose = require("mongoose");
const router = express();

const User = require("../models/user");

// middleware for finding user by id
let findById = async (req, res, next) => {
  let user;
  try {
    user = await User.find({ user_id: req.params.id });

    if (!user) {
      res.status(404).json({
        message_type: "warning",
        message: "could not find a user",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error,
    });
  }
  res.user = user[0];
  next();
};

// GET all of the instances of a certain model
router.get("/users", async (req, res) => {
  const users = await User.find();
  try {
    if (users) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        users: users,
      });
    } else {
      res.status(404).json({
        message_type: "warning",
        message: "could not find a user",
      });
    }
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error,
    });
  }
});

// GET a single instance of a certain model by id
router.get("/user/:id", findById, async (req, res) => {
  try {
    res.status(201).json({
      message_type: "success",
      message: "good response",
      user: res.user,
    });
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error,
    });
  }
});

// POST a single new instance of a certain model
router.post("/user", async (req, res) => {
  const user = await new User({
    id: req.body.id,
    fullName: req.body.fullName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    theme: req.body.theme,
  });

  try {
    const new_user = await user.save();
    if (new_user) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        user: new_user,
      });
    } else {
      res.status(500).json({
        message_type: "error",
        message: "could not save to database",
      });
    }
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error,
    });
  }
});

// PATCH a single instance of a certain model
router.patch("/user/:id", findById, async (req, res) => {
  if (req.body.id != null) {
    res.user.id = req.body.id;
  }
  if (req.body.fullName != null) {
    res.user.fullName = req.body.fullName;
  }
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.age != null) {
    res.user.age = req.body.age;
  }
  if (req.body.theme != null) {
    res.user.theme = req.body.theme;
  }

  try {
    const updated_user = await res.user.save();

    if (updated_user) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        user: updated_user,
      });
    } else {
      res.status(500).json({
        message_type: "error",
        message: "could not save to database",
      });
    }
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error,
    });
  }
});

// DELETE a single instance of a certain model
router.delete("/user/:id", findById, async (req, res) => {
  try {
    await res.user.remove();
    res.status(201).json({
      message_type: "success",
      message: "user deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error,
    });
  }
});

module.exports = router;
