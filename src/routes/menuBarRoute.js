import express from "express";
import { menubarController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const MenuBarRouter = express.Router();

MenuBarRouter.post("/", uploadCloud.array("images"), menubarController.create);

MenuBarRouter.get("/", menubarController.getList);

MenuBarRouter.get("/:_id", menubarController.getOne);

MenuBarRouter.delete("/:_id", menubarController.deleteMenubar);

MenuBarRouter.post("/:_id", uploadCloud.array("images"), menubarController.update);

export default MenuBarRouter;
