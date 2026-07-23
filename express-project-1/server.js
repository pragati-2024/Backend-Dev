import express from "express";
import fs from "fs";
// middleware import (folder ke andar se)
import logfun from "./middleware/middleware.js";
// data import (data ko users naam se use kar rahe hain)
import { data as users } from "./data.js";

// dotenv import + CONFIG CALL
import { config } from "dotenv";
config();  //ab .env kaam karega

const app = express();

// port (env se ya default)
const port = process.env.PORT || 5000;

// middleware

// JSON body read karne ke liye
app.use(express.json());

// har route ke liye logging middleware
// flow: req → middleware → route → res
app.use(logfun);
// home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "home route",
  });
});

app.get("/user", (req, res) => {
  res.status(200).json(users);
});

// create user
app.post("/user", (req, res) => {
  // body se username aur password destructure
  const { username, password } = req.body;

  // validation: empty fields
  if (!username || !password) {
    return res.status(400).json({
      message: "username and password required",
    });
  }

  // password length validation
  if (password.length < 6) {
    return res.status(400).json({
      message: "password must be at least 6 characters",
    });
  }

  // duplicate username check
  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(409).json({
      message: "username already exists",
    });
  }

  // new user object
  const newUser = {
    id: users.length + 1, // learning purpose ke liye 
    username,
    password,
  };

  // user add
  users.push(newUser);

  // response
  res.status(201).json({
    message: "user created",
    user: newUser,
  });
});

// update username only
app.put("/user/:id", (req, res) => {
  // params se id
  const id = parseInt(req.params.id);

  // body se username
  const { username } = req.body;

  // user index find
  const index = users.findIndex((u) => u.id === id);

  // user not found
  if (index === -1) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  // username missing
  if (!username) {
    return res.status(400).json({
      message: "username is required",
    });
  }

  // update username (spread operator use karke)
  users[index] = {
    ...users[index],
    username,
  };

  // response
  res.status(200).json({
    message: "username updated",
    user: users[index],
  });
});

// delete user
app.delete("/user/:id", (req, res) => {
  // params se id
  const id = parseInt(req.params.id);

  // index find
  const index = users.findIndex((u) => u.id === id);

  // user not found
  if (index === -1) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  // user remove
  const deletedUser = users.splice(index, 1);

  // response
  res.status(200).json({
    message: "user deleted",
    user: deletedUser[0],
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
