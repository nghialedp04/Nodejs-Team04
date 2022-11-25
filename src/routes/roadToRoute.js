import express from "express";
import multer from "multer";
import { roadtoController } from "../controllers";
import uploadCloud from "../middlewares/upload";

const RoadToRouter = express.Router();

RoadToRouter.post("/" , roadtoController.create);

RoadToRouter.get("/", roadtoController.getList);

RoadToRouter.get("/:_id", roadtoController.getOne);

RoadToRouter.delete("/:_id", roadtoController.deleteRoadto);

const upload = uploadCloud.array('images')
RoadToRouter.post("/:_id", function (req, res) {
  upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send('err')
        } else if (err) {
        res.send('err')
      }
      roadtoController.update(req, res)
    })
});
export default RoadToRouter;
