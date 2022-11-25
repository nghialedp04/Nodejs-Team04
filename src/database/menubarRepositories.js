import { MenuBarIMG } from "../schemas/menuBarImg";
import regeneratorRuntime, { async } from "regenerator-runtime";

const create = async (createMenuBarReq) => {
  return await MenuBarIMG.create(createMenuBarReq).catch((err) => {
    throw err;
  });
};

const getList = async (pageIndex, pageSize) => {
  const skip = +pageIndex === 1 ? 0 : (+pageIndex - 1) * +pageSize;
  return await MenuBarIMG.find({})
    .skip(skip)
    .limit(+pageSize)
    .catch((err) => {
      throw err;
    });
};

export const menubarRepositories = {
  create,
  getList,
};
