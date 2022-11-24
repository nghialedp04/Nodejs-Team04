import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import { skillService } from "../services/skillService";

const create =  (req, res) => {
  const fileUrl = req.file.path;
  const createSkillReq = req.body
    skillService
    .create(createSkillReq, fileUrl)
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
  skillService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const update = (req, res) => {
  const SkillId = req.body.id;
  const SkillUpdateReq = req.body;
  skillService
    .update(SkillId, SkillUpdateReq)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const deleteSkill = (req, res) => {
  const SkillId = req.body._id;
  skillService
    .deleteUser(SkillId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};


export const skillController = {
  create,
  getList,
  update,
  deleteSkill,
};
