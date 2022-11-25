import express from "express";
import { roadtoController } from "../controllers";

const RoadToRouter = express.Router();

RoadToRouter.post("/" , roadtoController.create);

RoadToRouter.get("/", roadtoController.getList);

export default RoadToRouter;
