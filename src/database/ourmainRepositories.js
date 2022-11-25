import regeneratorRuntime, { async } from "regenerator-runtime";
import { Ourmain } from "../schemas/ourMain";

const create = async (createOurmainReq) => {
  return await Ourmain.create(createOurmainReq).catch((err) => {
    throw err;
  });
};

const getList = async (pageIndex, pageSize) => {
  const skip = +pageIndex === 1 ? 0 : (+pageIndex - 1) * +pageSize;
  return await Ourmain.find({})
    .skip(skip)
    .limit(+pageSize)
    .catch((err) => {
      throw err;
    });
};

export const ourmainRepositories = {
  create,
  getList,
};
