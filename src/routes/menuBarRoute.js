import express from "express";
import { menubarController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const MenuBarRouter = express.Router();

MenuBarRouter.post("/", uploadCloud.array("images"), menubarController.create);

MenuBarRouter.get("/", menubarController.getList);

export default MenuBarRouter;
