import express from "express";
import uploadCloud from "../middlewares/upload";
import { ourmainController } from "../controllers/ourmainController";
import multer from "multer";

const OurMainRouter = express.Router();

OurMainRouter.post("/", uploadCloud.array("images"), ourmainController.create);

OurMainRouter.get("/", ourmainController.getList);

OurMainRouter.get("/:_id", ourmainController.getOne);

OurMainRouter.delete("/:_id", ourmainController.deleteOurmain);

const upload = uploadCloud.array('images')
OurMainRouter.post("/:_id", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send('err')
        } else if (err) {
        res.send('err')
      }
      ourmainController.update(req, res)
    })
});
export default OurMainRouter;
