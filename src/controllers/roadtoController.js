import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import { roadtoService } from "../services";

const create = async (req, res) => {
  const createRoadtoReq = req.body;

  await roadtoService
    .create(createRoadtoReq)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getList = async (req, res) => {
  const pageSize = +req.query.pageSize ? +req.query.pageSize : 10;
  const pageIndex = +req.query.pageIndex ? +req.query.pageIndex : 1;
  await roadtoService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

export const roadtoController = {
  create,
  getList,
};
