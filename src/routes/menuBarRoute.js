import express from "express";
import multer from "multer";
import { menubarController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const MenuBarRouter = express.Router();
MenuBarRouter.post("/", uploadCloud.array("images"), menubarController.create);

MenuBarRouter.get("/", menubarController.getList);

MenuBarRouter.get("/:_id", menubarController.getOne);

MenuBarRouter.delete("/:_id", menubarController.deleteMenubar);

const upload = uploadCloud.array('images')
MenuBarRouter.post("/:_id", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send('err')
        } else if (err) {
        res.send('err')
      }
      menubarController.update(req, res)
    })
});
export default MenuBarRouter;
