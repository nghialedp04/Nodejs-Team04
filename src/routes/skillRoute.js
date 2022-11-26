import express from "express";
import multer from "multer";
import { skillController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const SkillRouter = express.Router();
const upload = uploadCloud.array('images')

SkillRouter.post("/", uploadCloud.array("images"), skillController.create);

SkillRouter.get("/", skillController.getList);

SkillRouter.get("/:_id", skillController.getOne);

SkillRouter.post("/:_id", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send('err')
        } else if (err) {
        res.send('err')
      }
      skillController.update(req, res)
    })
});

SkillRouter.delete("/:_id", skillController.deleteSkill);

export default SkillRouter;
