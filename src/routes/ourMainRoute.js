import express from "express";
import uploadCloud from "../middlewares/upload";
import { ourmainController } from "../controllers/ourmainController";

const OurMainRouter = express.Router();

OurMainRouter.post("/", uploadCloud.array("images"), ourmainController.create);

OurMainRouter.get("/", ourmainController.getList);

OurMainRouter.get("/:_id", ourmainController.getOne);

OurMainRouter.delete("/:_id", ourmainController.deleteOurmain);

OurMainRouter.post("/:_id", ourmainController.update);

export default OurMainRouter;
