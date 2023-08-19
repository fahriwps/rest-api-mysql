import express from "express";
import userController from "../controllers/user.controller"

const userRoutes = express.Router();

userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getIdUser);

export default userRoutes;