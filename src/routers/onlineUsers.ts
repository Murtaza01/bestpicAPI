import { Router } from "express";
import multer from "multer";
import { deleteUser, editUser, getUsers, loginUser, verifyUser } from "../controllers/onlineUsers";

import auth from "../middlewares/auth";

const router = Router()
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// "/onlineUsers/token"
router.post("/login", upload,loginUser);

router.post("/token",auth, verifyUser)


// CRUD
router.get("/users", getUsers);

router.patch("/:userId", editUser);

router.delete("/:userId", deleteUser);



export default router