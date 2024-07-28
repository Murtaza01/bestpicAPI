import { Router } from "express";
import multer from "multer";
import {
  deleteUser,
  editUser,
  getUsers,
  getLoggedUser,
  loginUser,
} from "../controllers/onlineUsers";

import auth from "../middlewares/auth";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// "/onlineUsers/token"
router.post("/login", upload, loginUser);

router.post("/token", auth, getLoggedUser);

router.delete("/deleteUser", auth, deleteUser);

router.get("/users", getUsers);

router.patch("/:userId", editUser);

export default router;
