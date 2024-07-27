import express from "express";
import { errorHandler } from "./helpers";
import { ConnectToDB } from "./database";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
//CRUD
import loginUser from "./CRUD/create";
import { findUser, getChallengers, getUsers } from "./CRUD/read";
import { editUser, updateUserWins } from "./CRUD/update";
import deleteUser from "./CRUD/delete";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", upload, loginUser);

app.get("/challengers", getChallengers);

app.get("/users", getUsers);

app.get("/user/:userId", findUser);

app.patch("/user/:userId", editUser);

app.patch("/challenge/:winner", updateUserWins);

app.delete("/user/:userId", deleteUser);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json("Sorry can't find that!");
});

ConnectToDB(() => {
  app.listen(3000);
});
