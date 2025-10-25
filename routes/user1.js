import express from "express";
import {auth} from "../middlewares/verifyToken.js"
const router = express.Router();

import { deleteUser, getAllUsers, loginUser, logoutuser, signupUser, updateUser } from "../controllers/userController.js";

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/all", auth,getAllUsers);
router.put("/users/update",auth, updateUser);
router.delete("/users/delete",auth, deleteUser);
router.post("/users/logout",auth,logoutuser )

export default router;

