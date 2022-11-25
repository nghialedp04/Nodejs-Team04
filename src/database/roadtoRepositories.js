import regeneratorRuntime, { async } from "regenerator-runtime";
import { RoadTo } from "../schemas/roadToDevplus";

const create = async (createRoadtoReq) => {
  return await RoadTo.create(createRoadtoReq).catch((err) => {
    throw err;
  });
};

const getList = async (pageIndex, pageSize) => {
  const skip = +pageIndex === 1 ? 0 : (+pageIndex - 1) * +pageSize;
  return await RoadTo.find({})
    .skip(skip)
    .limit(+pageSize)
    .catch((err) => {
      throw err;
    });
};

export const roadtoRepositories = {
  create,
  getList,
};
