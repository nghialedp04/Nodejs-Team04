import Joi from "joi";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { menubarRepositories } from "../database";

const create = (createMenubarReq, fileUrl) =>
  new Promise(async (resolve, reject) => {
    try {
      const newMenubar = {
        name: createMenubarReq.name,
        image: fileUrl,
      };

      const createdMenubar = await menubarRepositories
        .create(newMenubar)
        .catch((err) => {
          throw err;
        });
      resolve(createdMenubar);
    } catch (error) {
      reject(error);
    }
  });

const getList = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    await menubarRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const menubarService = {
  create,
  getList,
};
