import { Helper, ResponseBase } from "../helper";
import { alumniService } from "../services";

const create = (req, res) => {
  const fileUrl = req.files[0].path;
  const createAlumniReq = req.body;
  alumniService
    .create(createAlumniReq, fileUrl)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getList = (req, res) => {
  const pageSize = +req.query.pageSize ? +req.query.pageSize : 10;
  const pageIndex = +req.query.pageIndex ? +req.query.pageIndex : 1;
  alumniService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

export const alumniController = {
  create,
  getList,
};
