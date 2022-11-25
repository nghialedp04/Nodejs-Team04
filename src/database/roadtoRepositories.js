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

const update = async (RoadtoId, RoadtoUpdateReq) => {
  return await RoadTo.findByIdAndUpdate(RoadtoId, RoadtoUpdateReq).catch((err) => {
    throw err;
  });
};

const deleteRoadto = async (RoadtoId) => {
  return await RoadTo.findByIdAndDelete(RoadtoId).catch((err) => {
    throw err;
  });
};

const findByRoadtoName = async (name) => {
  return await RoadTo.findOne({ name: name }).catch((err) => {
    throw err;
  });
};

export const roadtoRepositories = {
  create,
  getList,
  findByRoadtoName,
  deleteRoadto,
  update
};
