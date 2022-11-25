import express from "express";
import multer from "multer";
import { alumniController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const AlumniRouter = express.Router();

AlumniRouter.post("/", uploadCloud.array("images"), alumniController.create);

AlumniRouter.get("/", alumniController.getList);

AlumniRouter.get("/:_id", alumniController.getOne);

AlumniRouter.delete("/:_id", alumniController.deleteAlumni);

const upload = uploadCloud.array('images')
AlumniRouter.post("/:_id", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send('err')
        } else if (err) {
        res.send('err')
      }
      alumniController.update(req, res)
    })
});
export default AlumniRouter;
