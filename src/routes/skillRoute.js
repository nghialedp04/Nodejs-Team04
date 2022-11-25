import express from "express";
import { skillController } from "../controllers/skillController";
import uploadCloud from "../middlewares/upload";

const SkillRouter = express.Router();

SkillRouter.post("/", uploadCloud.array("images"), skillController.create);

SkillRouter.get("/", skillController.getList);

SkillRouter.put("/", skillController.update);

// SkillRouter.delete("/", skillController.deleteSkill);

export default SkillRouter;
