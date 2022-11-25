import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import { concernService } from "../services/concernService";

const create = async (req, res) => {
  const createConcernReq = req.body;
  await concernService
    .create(createConcernReq)
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
  await concernService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getOne = async (req, res) => {
  const ConcernId = req.params._id;
  await concernService
    .getOne(ConcernId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const update = async (req, res) => {
  const ConcernId = req.params._id;
  const ConcernUpdateReq = req.body;
  await concernService
    .update(ConcernId, ConcernUpdateReq)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const deleteConcern = async (req, res) => {
  const ConcernId = req.params._id;
  await concernService
    .deleteConcern(ConcernId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

export const concernController = {
  create,
  getList,
  getOne,
  update,
  deleteConcern,
};
