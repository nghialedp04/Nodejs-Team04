import Joi from "joi";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { menubarRepositories } from "../database";
import { errors } from "../helper";
import { MenuBarIMG } from "../schemas/menuBarImg";

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

const getOne = (MenubarId) => {
  return new Promise(async (resolve, reject) => {
    const checkMenuBar = await MenuBarIMG.findById(MenubarId).catch((err) => {
      throw err;
    });
    if (!checkMenuBar) {
      reject(errors.NOT_FOUND);
    }
    resolve(checkMenuBar);
  });
};

const deleteMenubar = (MenubarId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMenuBar = await MenuBarIMG.findById(MenubarId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });
      if (!checkMenuBar) {
        reject(errors.NOT_FOUND);
      }
      await menubarRepositories.deleteMenubar(MenubarId).catch((err) => {
        throw err;
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const update = (MenubarId, MenubarUpdateReq, fileUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMenubar = await MenuBarIMG.findById(MenubarId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkMenubar) {
        reject(errors.NOT_FOUND);
      }

      const checkMenubarUpdate = Joi.object({
        name: Joi.string().required().max(255),
      });

      await checkMenubarUpdate.validateAsync(MenubarUpdateReq).catch((err) => {
        reject({
          Status: 400,
          Message: err.details[0].message,
        });
      });

      if (fileUrl !== undefined) {
        var updateMenubar = {
          name: MenubarUpdateReq.name,
          image: fileUrl,
        };
      } else {
        var updateMenubar = {
          name: MenubarUpdateReq.name,
          image: checkMenubar.image,
        };
      }

      await menubarRepositories
        .update(MenubarId, updateMenubar)
        .catch((err) => {
          throw err;
        });
      resolve(updateMenubar);
    } catch (error) {
      reject(error);
    }
  });
};

export const menubarService = {
  create,
  getList,
  getOne,
  deleteMenubar,
  update,
};
