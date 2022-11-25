import express from "express";
import { alumniController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const AlumniRouter = express.Router();

AlumniRouter.post("/", uploadCloud.array("images"), alumniController.create);

AlumniRouter.get("/", alumniController.getList);

export default AlumniRouter;
