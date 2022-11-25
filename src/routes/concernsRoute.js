import express from "express";
import { concernController } from "../controllers/concernController";

const ConcernRouter = express.Router();

ConcernRouter.post("/", concernController.create);

ConcernRouter.get("/", concernController.getList);

ConcernRouter.get("/:_id", concernController.getOne);

ConcernRouter.put("/:_id", concernController.update);

ConcernRouter.delete("/:_id", concernController.deleteConcern);

export default ConcernRouter;
