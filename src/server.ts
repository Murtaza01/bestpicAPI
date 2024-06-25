import express, { ErrorRequestHandler } from "express";
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
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.send("error accord");
};

app.post("/user/new", upload, async (req, res) => {
  const imageName = req.body.name + "'s" + " Image";
  const userObj = req.body;
  const result = (await handleUpload(
    req.file!,
    imageName
  )) as UploadApiResponse;
  userObj.imageUrl = result.secure_url;
  const user = new User(userObj);
  user.add();
  res.redirect("/user/all");
});

app.get("/user/all", async (req, res) => {
  const users = await User.get();
  res.send(users);
});

app.post("/user/find", async (req, res) => {
  const userId = req.body.id;
  const foundUser = await User.find(userId);
  res.send(foundUser);
});

app.patch("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const newData = req.body;
  try {
    const result = await User.update(userId, newData);
    res.send(result);
  } catch (error: any) {
    const err = new Error(error);
    next(err);
  }
});

app.delete("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const result = await User.delete(userId);
    res.send(result);
  } catch (error: any) {
    const err = new Error(error);
    next(err);
  }
});

app.use(errorHandler);

ConnectToDB(() => {
  app.listen(3000);
});
