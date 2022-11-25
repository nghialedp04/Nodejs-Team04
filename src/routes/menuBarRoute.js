import express from "express";
import { menubarController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const MenuBarRouter = express.Router();

MenuBarRouter.post("/", uploadCloud.array("images"), menubarController.create);

MenuBarRouter.get("/", menubarController.getList);

MenuBarRouter.get("/:_id", menubarController.getOne);

MenuBarRouter.delete("/:_id", menubarController.deleteMenubar);

MenuBarRouter.put("/:_id", menubarController.update);

export default MenuBarRouter;
