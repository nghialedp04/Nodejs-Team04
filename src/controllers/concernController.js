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

const getList = (req, res) => {
  const pageSize = +req.query.pageSize ? +req.query.pageSize : 10;
  const pageIndex = +req.query.pageIndex ? +req.query.pageIndex : 1;
  concernService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

// const update = (req, res) => {
//   const ConcernId = req.body._id;
//   const ConcernUpdateReq = req.body;

//   concernService
//     .update(ConcernId, ConcernUpdateReq)
//     .then((data) => {
//       ResponseBase.responseJsonHandler(data, res);
//     })
//     .catch((error) => {
//       Helper.responseJsonHandler(error, null, res);
//     });
// };

// const deleteConcern = (req, res) => {
//   const ConcernId = req.body._id;
//   concernService
//     .deleteSkill(ConcernId)
//     .then((data) => {
//       ResponseBase.responseJsonHandler(data, res);
//     })
//     .catch((error) => {
//       Helper.responseJsonHandler(error, null, res);
//     });
// };

export const concernController = {
  create,
  getList,
  // update,
  // deleteConcern,
};
