import express from "express";
import { skillController } from "../controllers/skillController";
import uploadCloud from "../middlewares/upload";

const SkillRouter = express.Router();

SkillRouter.post("/", uploadCloud.array("images"), skillController.create);

SkillRouter.get("/", skillController.getList);

SkillRouter.get("/:_id", skillController.getOne);

SkillRouter.post("/:_id", skillController.update);

SkillRouter.delete("/:_id", skillController.deleteSkill);

export default SkillRouter;
