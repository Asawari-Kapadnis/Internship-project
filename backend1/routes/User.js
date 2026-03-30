import express from "express"
import { AddWorkout, getUserDashboard, UserLogin, UserRegister } from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

console.log(" User routes file loaded");

router.post("/signup",UserRegister);
router.post("/signin",UserLogin);
router.get("/dashboard",verifyToken, getUserDashboard);
router.post("/addWorkout", verifyToken, AddWorkout);

export default router