import { async } from "regenerator-runtime";
import { Helper, ResponseBase } from "../helper";
import { menubarService } from "../services";

const create = async (req, res) => {
  const fileUrl = req.files[0].path;
  const createMenubarReq = req.body;

  await menubarService
    .create(createMenubarReq, fileUrl)
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
  await menubarService
    .getList(pageIndex, pageSize)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const getOne = async (req, res) => {
  const MenubarId = req.params._id;
  await menubarService
    .getOne(MenubarId)
    .then((data) => {
      ResponseBase.responseJsonHandler(data, res);
    })
    .catch((error) => {
      Helper.responseJsonHandler(error, null, res);
    });
};

const deleteMenubar = async (req, res) => {
  const MenubarId = req.params._id;
  await menubarService
    .deleteMenubar(MenubarId)
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
    const MenubarId = req.params._id;
    const MenubarUpdateReq = req.body;
    await menubarService
      .update(MenubarId, MenubarUpdateReq, fileUrl)
      .then((data) => {
        ResponseBase.responseJsonHandler(data, res);
      })
      .catch((error) => {
        Helper.responseJsonHandler(error, null, res);
      });
  } else {
    const MenubarId = req.params._id;
    const MenubarUpdateReq = req.body;
    await menubarService
      .update(MenubarId, MenubarUpdateReq)
      .then((data) => {
        ResponseBase.responseJsonHandler(data, res);
      })
      .catch((error) => {
        Helper.responseJsonHandler(error, null, res);
      });
  }
};

export const menubarController = {
  create,
  getList,
  getOne,
  deleteMenubar,
  update,
};
