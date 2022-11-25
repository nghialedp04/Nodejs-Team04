import regeneratorRuntime, { async } from "regenerator-runtime";
import { ourmainRepositories } from "../database";

const create = (createOurmainReq, fileUrl) =>
  new Promise(async (resolve, reject) => {
    try {
      const newOurmain = {
        name: createOurmainReq.name,
        image: fileUrl,
      };

      const createdOurmain = await ourmainRepositories
        .create(newOurmain)
        .catch((err) => {
          throw err;
        });
      resolve(createdOurmain);
    } catch (error) {
      reject(error);
    }
  });

const getList = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    await ourmainRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const ourmainService = {
  create,
  getList,
};
