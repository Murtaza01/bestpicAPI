import { Router } from "express";
import { getUsers } from "../controllers/onlineUsers";
import { updateUserWins } from "../controllers/localUsers";

const router = Router()


router.get("/users", getUsers);

router.patch("/:winner", updateUserWins);


export default router
