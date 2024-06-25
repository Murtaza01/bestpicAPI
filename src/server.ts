import express from "express";
import bodyParser from "body-parser";
import User from "./models/user";
import { ConnectToDB } from "./database";
import multer from "multer";
import handleUpload from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/new-user", upload, async (req, res) => {
  const imageName = req.body.name + "'s" + " Image";
  const userObj = req.body;
  const result = (await handleUpload(
    req.file!,
    imageName
  )) as UploadApiResponse;
  userObj.imageUrl = result.secure_url;
  const user = new User(userObj);
  user.add();
  res.redirect("/show");
});

app.get("/user/all", async (req, res) => {
  const users = await User.get();
  res.send(users);
});

app.post("/find", async (req, res) => {
  const userId = req.body.id;
  const foundUser = await User.find(userId);
  res.send(foundUser);
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(req.params);
  const newData = req.body;
  const result = await User.update(userId, newData);
  if (result?.acknowledged) {
    res.send(result);
  }
});

app.delete("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const result = await User.delete(userId);
  if (result === "ok") {
    return res.send("User Deleted Successfully !");
  }
  res.send(result.message);
});

ConnectToDB(() => {
  app.listen(3000);
});
