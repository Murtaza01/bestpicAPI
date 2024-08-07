import { Router } from "express";
import { getLocalUsers, updateUserWins } from "../controllers/localUsers";

const router = Router()

// localusers
router.get("/", getLocalUsers);

router.patch("/:winner", updateUserWins);


export default router
