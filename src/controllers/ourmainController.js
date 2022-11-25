import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import uploadCloud from "../middlewares/upload";
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

const getOne = async (req, res) => {
  const OurmainId = req.params._id;
  await ourmainService
    .getOne(OurmainId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const update = async (req, res) => {
  if (req.files !== undefined) {
    uploadCloud.array("images");
    const fileUrl = req.files[0].path;
    const OurmainId = req.params._id;
    const OurmainUpdateReq = req.body;
    await ourmainService
      .update(OurmainId, OurmainUpdateReq, fileUrl)
      .then((data) => {
        ResponseBase.responseJsonHandler(data, res);
      })
      .catch((error) => {
        Helper.responseJsonHandler(error, null, res);
      });
  } else {
    const OurmainId = req.params._id;
    const OurmainUpdateReq = req.body;
    await ourmainService
      .update(OurmainId, OurmainUpdateReq)
      .then((data) => {
        ResponseBase.responseJsonHandler(data, res);
      })
      .catch((error) => {
        Helper.responseJsonHandler(error, null, res);
      });
  }
};

const deleteOurmain = async (req, res) => {
  const OurmainId = req.params._id;
  await ourmainService
    .deleteOurmain(OurmainId)
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
  getOne,
  deleteOurmain,
  update,
};
