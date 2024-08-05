import { Router } from "express";
import multer from "multer";
import {
  deleteUser,
  updateUserWins,
  getLoggedUser,
  loginUser,
  getOnlineUsers,
} from "../controllers/onlineUsers";

import auth from "../middlewares/auth";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// "/onlineUsers/token"
router.post("/login", upload, loginUser);

router.post("/token", auth, getLoggedUser);

router.delete("/deleteUser", auth, deleteUser);

router.get("/users", getOnlineUsers);
// /onlineUsers/:id
router.patch("/:userId", updateUserWins);

export default router;
