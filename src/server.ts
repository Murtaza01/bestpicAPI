import express from "express";
import bodyParser from "body-parser";
import User from "./models/user";
import { ConnectToDB } from "./database";
import multer from "multer";
import { writeFileSync } from "fs";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/upload", upload, (req, res) => {
  // console.log(req.file?.mimetype);
  const buffer = req.file?.buffer as Buffer;
  // writeFileSync("./image.jpg", buffer);
});

app.post("/new", (req, res) => {
  const userObj = req.body;
  const user = new User(userObj);
  user.add();
  res.redirect("/show");
});

app.get("/show", async (req, res) => {
  const users = await User.get();
  res.send(users);
});

app.post("/find", async (req, res) => {
  const id = req.body.id;
  const foundUser = await User.find(id);
  res.send(foundUser);
});

app.get("/delete", async (req, res) => {
  const id = req.body.id;
  const result = await User.delete(id);
  if (result === "success") {
    return res.redirect("/show");
  }
  res.send(result.message);
});

ConnectToDB(() => {
  app.listen(3000);
});
