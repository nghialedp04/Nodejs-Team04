import express from "express";
import { usersController } from "../controllers";

const UserRouter = express.Router();

UserRouter.get("/", usersController.getList);

UserRouter.get("/me", usersController.getMe);

UserRouter.post("/", usersController.create);

UserRouter.put("/", usersController.update);

UserRouter.delete("/", usersController.deleteUser);

export default UserRouter;
