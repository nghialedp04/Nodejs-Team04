import { Helper, ResponseBase } from "../helper";
import uploadCloud from "../middlewares/upload";
import { skillService } from "../services/skillService";

const create = (req, res) => {
  const fileUrl = req.files[0].path;
  const createSkillReq = req.body;
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
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getOne = (req, res) => {
  const SkillId = req.params._id;
  skillService
    .getOne(SkillId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const update = (req, res) => {
  if (req.files !== undefined) {
    uploadCloud.array("images");
    const fileUrl = req.files[0].path;
    const SkillId = req.params._id;
    const SkillUpdateReq = req.body;
    skillService
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
    skillService
      .update(SkillId, SkillUpdateReq)
      .then((data) => {
        ResponseBase.responseJsonHandler(data, res);
      })
      .catch((error) => {
        Helper.responseJsonHandler(error, null, res);
      });
  }
};

const deleteSkill = (req, res) => {
  const SkillId = req.params._id;
  skillService
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
