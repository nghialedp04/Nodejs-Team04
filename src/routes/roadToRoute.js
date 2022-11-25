import express from "express";
import { roadtoController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const RoadToRouter = express.Router();

RoadToRouter.post("/", uploadCloud.array("images"), roadtoController.create);

RoadToRouter.get("/", roadtoController.getList);

export default RoadToRouter;
