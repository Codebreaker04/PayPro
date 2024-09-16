const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const middleware = require("../middleware");

const userSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(30),
  lastName: z.string().max(30),
});

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { success } = userSchema.safeParse(body);

    if (!success) {
      return res.status(401).json({ msg: "invalid input types " });
    }

    const isUser = await User.findOne({ username: body.username });

    if (isUser) {
      return res
        .status(401)
        .json({ msg: "Email already taken/ Incorrect email" });
    }

    const user = await User.create({
      username: body.username,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    });

    const account = await Account.create({
      userId: user._id,
      balance: 100,
    });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      JWT_SECRET,
    );

    res.json({
      msg: "User created successfully",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({ msg: "An error occurred during sign-Up" });
  }
});

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res, err) => {
  try {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);

    if (!success) {
      return res.status(401).json({ msg: "incorrect inputs " });
    }

    const user = await User.findOne({
      username: body.username,
      // password: body.password,
    });

    if (!user) {
      return res.status(401).json({ msg: "Invalid username" });
    }

    if (user.password != body.password) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      JWT_SECRET,
    );

    res.json({
      msg: "User loggedIn successfully",
      token: token,
    });
  } catch (err) {
    return err.status(500).json({ msg: "An error occurred during sign-in" });
  }
});

const updateBody = z.object({
  password: z.string().min(6),
  firstName: z.string().max(30),
  lastName: z.string().max(30),
});

router.put("/", middleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ msg: "Error while updating information" });
  }

  await User.updateOne(req.body, {
    _id: req.userId,
  });

  res.status(200).json({
    msg: "Updated information successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter, $options: "i" },
      },
      {
        lastName: { $regex: filter, $options: "i" },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
      id: user._id,
    })),
  });
});

module.exports = router;
