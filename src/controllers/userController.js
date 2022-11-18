import { Helper, ResponseBase } from "../helper";
import { userService } from "../services";

const getList = (req, res) => {
  const pageSize = +req.query.pageSize ? +req.query.pageSize : 10;
  const pageIndex = +req.query.pageIndex ? +req.query.pageIndex : 1;
  userService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getMe = (req, res) => {
  const userId = req.body._id;
  userService
    .getMe(userId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const create = (req, res) => {
  userService
    .create(req.body)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const update = (req, res) => {
  const userId = req.body._id;
  const UpdateUserReq = req.body;
  userService
    .update(userId, UpdateUserReq)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const deleteUser = (req, res) => {
  const userId = req.body._id;
  userService
    .deleteUser(userId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res)
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

export const usersController = {
  getList,
  getMe,
  update,
  create,
  deleteUser,
};
