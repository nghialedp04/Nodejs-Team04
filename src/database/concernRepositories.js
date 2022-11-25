import regeneratorRuntime, { async } from "regenerator-runtime";
import { Concern } from "../schemas/concerns";

const create = async (newConcern) => {
  return await Concern.create(newConcern).catch((err) => {
    throw err;
  });
};

const getList = async (pageIndex, pageSize) => {
  const skip = +pageIndex === 1 ? 0 : (+pageIndex - 1) * +pageSize;
  return await Concern.find({})
    .skip(skip)
    .limit(+pageSize)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const update = async (ConcernId, ConcernUpdateReq) => {
  return await Concern.findByIdAndUpdate(ConcernId, ConcernUpdateReq).catch(
    (err) => {
      throw err;
    }
  );
};

const deleteConcern = async (ConcernId) => {
  return await Concern.findByIdAndDelete(ConcernId).catch((err) => {
    throw err;
  });
};

const findByConcernName = (name) => {
  return Concern.findOne({ name: name }).catch((err) => {
    throw err;
  });
};

export const concernRepositories = {
  create,
  getList,
  update,
  deleteConcern,
  findByConcernName,
};
