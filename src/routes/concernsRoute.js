import express from "express";
import { concernController } from "../controllers/concernController";

const ConcernRouter = express.Router();

ConcernRouter.post("/", concernController.create);

ConcernRouter.get("/", concernController.getList);

// ConcernRouter.put("/", concernController.update);


// ConcernRouter.delete("/", concernController.deleteSkill);

export default ConcernRouter;
