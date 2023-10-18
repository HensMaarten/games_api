const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
app.use(cors({ origin: "*" }));

const Game = require("./models/game");
const User = require("./models/user");
const Genre = require("./models/genre");
const Platform = require("./models/platform");

router.get("/", (req, res) => {
  console.log("/api route called");
  res.send("<h1>Welcome to my Api, these are the available routes:</h1>");
});

router.get("/genres", async (req, res) => {
  console.log("/genres route called");
  try {
    res.json(await Genre.find());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/genre/:id", async (req, res) => {
  console.log("/genre/:id route called");
  try {
    res.json(await Genre.findById(req.params.id));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/platforms", async (req, res) => {
  console.log("/platforms route called");
  try {
    res.json(await Platform.find());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/platform/:id", async (req, res) => {
  console.log("/platform/:id route called");
  try {
    res.json(await Platform.findById(req.params.id));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/users", async (req, res) => {
  console.log("/users route called");
  try {
    res.json(
      await User.find().populate({
        path: "owned_games",
        populate: [
          { path: "genre", select: "name" },
          { path: "platforms", select: "name" },
        ],
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/user/:id", async (req, res) => {
  console.log("/user/:id route called");
  try {
    res.json(
      await User.findById(req.params.id)
      .populate({
        path: "owned_games",
        populate: [
          { path: "genre", select: "name" },
          { path: "platforms", select: "name" },
        ],
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/games", async (req, res) => {
  console.log("/games route called");
  try {
    res.json(await Game.find().populate("platforms").populate("genre"));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getgamebyid/:id", async (req, res) => {
  console.log("/getgamebyid/:id route called");
  try {
    res.json(
      await Game.findById(req.params.id).populate("platforms").populate("genre")
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getgamebytitle/:title", async (req, res) => {
  console.log("/getgamebytitle/:title route called");
  try {
    res.json(
      await Game.find({ title: req.params.title.toLowerCase() })
        .populate("platforms")
        .populate("genre")
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/game/create", async (req, res) => {
  console.log("/game/create route called");
  const data = JSON.parse(req.body);
  console.log("body" + data.title);
  try {
    res.json(await Game.create(data));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/game/update/:id", async (req, res) => {
  console.log("/game/update/:id route called");
  const data = JSON.parse(req.body);
  try {
    res.json(await Game.findByIdAndUpdate(req.params.id, { $set: data }));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/game/delete/:id", async (req, res) => {
  console.log("/game/delete/:id route called");
  try {
    res.json(await Game.findByIdAndDelete(req.params.id));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.use("/.netlify/functions/api", router);
mongoose.connect(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports.handler = serverless(app);
