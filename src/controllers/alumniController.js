import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import { alumniService } from "../services";

const create = async (req, res) => {
  const fileUrl = req.files[0].path;
  const createAlumniReq = req.body;
  await alumniService
    .create(createAlumniReq, fileUrl)
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
  await alumniService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getOne = async (req, res) => {
  const AlumniId = req.params._id;
  await alumniService
    .getOne(AlumniId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const deleteAlumni = async (req, res) => {
  const AlumniId = req.params._id;
  await alumniService
    .deleteAlumni(AlumniId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const update = (req, res) => {
  if (req.files && req.files.length > 0) {
    var fileUrl = req.files[0].path;
  }
  const AlumniId = req.params._id;
  const AlumniUpdateReq = req.body;
  alumniService
    .update(AlumniId, AlumniUpdateReq, fileUrl)
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
  getOne,
  deleteAlumni,
  update,
};
