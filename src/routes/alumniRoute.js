import express from "express";
import { alumniController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const AlumniRouter = express.Router();

AlumniRouter.post("/", uploadCloud.array("images"), alumniController.create);

AlumniRouter.get("/", alumniController.getList);

AlumniRouter.get("/:_id", alumniController.getOne);

AlumniRouter.delete("/:_id", alumniController.deleteAlumni);

AlumniRouter.post("/:_id", uploadCloud.array("images"), alumniController.update);

export default AlumniRouter;
