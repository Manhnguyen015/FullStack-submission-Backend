const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/createUser", async (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res
      .status(400)
      .json({ error: "Username, name, and password are required." });
  }
  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});
//
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blog", {
    title: 1,
    author: 1,
    id: 1,
  });
  res.json(users);
});

module.exports = usersRouter;
