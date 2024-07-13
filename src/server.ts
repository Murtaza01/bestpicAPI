import express from "express";
import { errorHandler } from "./helpers";
import { ConnectToDB } from "./database";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
//CRUD
import addNewUser from "./CRUD/create";
import { findUser, getChallengers, getUsers } from "./CRUD/read";
import { editUser, updateUserWins } from "./CRUD/update";
import deleteUser from "./CRUD/delete";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/user/new", upload, addNewUser);

app.get("/user/challengers", getChallengers);

app.get("/user/get/all", getUsers);

app.post("/user/get/:userId", findUser);

app.patch("/user/edit/:userId", editUser);

app.patch("/user/challenge/:winner", updateUserWins);

app.delete("/user/delete/:userId", deleteUser);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

ConnectToDB(() => {
  app.listen(3000);
});
