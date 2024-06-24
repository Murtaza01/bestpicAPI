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

app.get("/show", async (req, res) => {
  const users = await User.get();
  res.send(users);
});

app.post("/find", async (req, res) => {
  const userId = req.body.id;
  const foundUser = await User.find(userId);
  res.send(foundUser);
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  const result = await User.delete(id);
  if (result === "success") {
    return res.send("Success !");
  }
  res.send(result.message);
});

ConnectToDB(() => {
  app.listen(3000);
});
