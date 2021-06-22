import express from "express";
import { signin, signup, getUsers, getUserById, postFollowing, unfollow } from "../Controllers/Auth_Controller.js";
import Middleware from "../Middleware/Middleware.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/follow/:id", Middleware, postFollowing);
router.patch("/unfollow/:id", Middleware, unfollow);

export default router;