import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import { ourmainService } from "../services";

const create = async (req, res) => {
  const fileUrl = req.files[0].path;
  const createOurmainReq = req.body;

  await ourmainService
    .create(createOurmainReq, fileUrl)
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
  await ourmainService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

export const ourmainController = {
  create,
  getList,
};
