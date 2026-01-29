// express import
import express from "express";

// app create
const app = express();

// middleware: JSON body read karne ke liye
app.use(express.json());

// in-memory users data
let users = [
  {
    id: 1,
    username: "quert",
    password: "qwer123",
  },
  {
    id: 2,
    username: "ramesh",
    password: "123456",
  },
];

// home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "home route",
  });
});

// get all users
app.get("/user", (req, res) => {
  res.status(200).json(users);
});

// create user
app.post("/user", (req, res) => {
  // body se username aur password destructure
  const { username, password } = req.body;

  // validation
  if (!username || !password) {
    return res.status(400).json({
      message: "username and password required",
    });
  }

  // password length check
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
    id: users.length + 1,
    username,
    password,
  };

  // push into array
  users.push(newUser);

  // response
  res.status(201).json({
    message: "user created",
    user: newUser,
  });
});

// update username only (PUT with destructuring)
app.put("/user/:id", (req, res) => {
  // params se id
  const id = parseInt(req.params.id);

  // body se sirf username destructure
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

  // update username
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

  // remove user
  const deletedUser = users.splice(index, 1);

  // response
  res.status(200).json({
    message: "user deleted",
    user: deletedUser[0],
  });
});

// server start
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
