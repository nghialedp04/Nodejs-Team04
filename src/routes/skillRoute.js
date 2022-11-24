import express from "express";
import { skillController } from "../controllers/skillController";
import uploadCloud from "../middlewares/upload";

const SkillRouter = express.Router();

SkillRouter.post("/", uploadCloud.single('image'), skillController.create);

SkillRouter.put("/", skillController.update);

SkillRouter.get("/", skillController.getList);

SkillRouter.delete("/", skillController.deleteSkill);

export default SkillRouter;
