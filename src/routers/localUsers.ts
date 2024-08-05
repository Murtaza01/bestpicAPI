import { Router } from "express";
import { getLocalUsers, updateUserWins } from "../controllers/localUsers";

const router = Router()


router.get("/users", getLocalUsers);

router.patch("/:winner", updateUserWins);


export default router
