import express from "express";
import { ConnectToDB } from "./database";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
//CRUD
import onlineRouter from "./routers/onlineUsers";
import localRouter from "./routers/localUsers";
import error from "./middlewares/error";
import notFound from "./middlewares/404";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/onlineusers", onlineRouter);

app.use("/localusers", localRouter);

app.use(error);

app.use(notFound);

ConnectToDB(() => {
  app.listen(PORT, () => console.log("Server is Running on Port:" + PORT));
});

export default app;
