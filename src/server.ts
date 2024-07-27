import express from "express";
import { ConnectToDB } from "./database";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
//CRUD
import onlineRouter from "./routers/onlineUsers";
import localRouter from "./routers/localUsers"
import error from "./middlewares/error";
import notFound from "./middlewares/404";

interface CustomRequest extends Request {
  user?:string,
}
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/onlineUsers',onlineRouter)

app.use('/localUsers',localRouter)

app.use(error);

app.use(notFound);

ConnectToDB(() => {
  app.listen(3000);
});
