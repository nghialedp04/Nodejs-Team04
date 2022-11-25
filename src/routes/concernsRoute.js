import express from "express";
import multer from "multer";
import { concernController } from "../controllers/concernController";
import uploadCloud from "../middlewares/upload";

const ConcernRouter = express.Router();

ConcernRouter.post("/", concernController.create);

ConcernRouter.get("/", concernController.getList);

ConcernRouter.get("/:_id", concernController.getOne);

const upload = uploadCloud.array('images')
ConcernRouter.post("/:_id", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send('err')
        } else if (err) {
        res.send('err')
      }
      concernController.update(req, res)
    })
});
ConcernRouter.delete("/:_id", concernController.deleteConcern);

export default ConcernRouter;
