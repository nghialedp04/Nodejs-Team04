import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import uploadCloud from "../middlewares/upload";
import { skillService } from "../services/skillService";

const create = async (req, res) => {
  const fileUrl = req.files[0].path;
  const createSkillReq = req.body;
  await skillService
    .create(createSkillReq, fileUrl)
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
  await skillService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getOne = async (req, res) => {
  const SkillId = req.params._id;
  await skillService
    .getOne(SkillId)
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
    const SkillId = req.params._id;
    const SkillUpdateReq = req.body;
    await skillService
      .update(SkillId, SkillUpdateReq, fileUrl)
      .then((data) => {
        ResponseBase.responseJsonHandler(data, res);
      })
      .catch((error) => {
        Helper.responseJsonHandler(error, null, res);
      });
  } else {
    const SkillId = req.params._id;
    const SkillUpdateReq = req.body;
    await skillService
      .update(SkillId, SkillUpdateReq)
      .then((data) => {
        ResponseBase.responseJsonHandler(data, res);
      })
      .catch((error) => {
        Helper.responseJsonHandler(error, null, res);
      });
  }
};

const deleteSkill = async (req, res) => {
  const SkillId = req.params._id;
  await skillService
    .deleteSkill(SkillId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

export const skillController = {
  create,
  getList,
  getOne,
  update,
  deleteSkill,
};
