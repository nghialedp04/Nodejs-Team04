import express from "express";
import { roadtoController } from "../controllers";

const RoadToRouter = express.Router();

RoadToRouter.post("/" , roadtoController.create);

RoadToRouter.get("/", roadtoController.getList);

RoadToRouter.get("/:_id", roadtoController.getOne);

RoadToRouter.delete("/:_id", roadtoController.deleteRoadto);

RoadToRouter.put("/:_id", roadtoController.update);

export default RoadToRouter;
