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

const getOne = async (req, res) => {
  const RoadtoId = req.params._id;
  await roadtoService
    .getOne(RoadtoId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const update = async (req, res) => {
  const RoadtoId = req.params._id;
  const RoadtoUpdateReq = req.body;
  await roadtoService
    .update(RoadtoId, RoadtoUpdateReq)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const deleteRoadto = async (req, res) => {
  const RoadtoId = req.params._id;
  await roadtoService
    .deleteRoadto(RoadtoId)
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
  getOne,
  deleteRoadto,
  update,
};
