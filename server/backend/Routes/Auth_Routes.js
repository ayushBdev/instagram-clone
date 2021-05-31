import express from "express";
import { signin, signup, getUsers, getUserById, postFollowing } from "../Controllers/Auth_Controller.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/update/:id", postFollowing);

export default router;