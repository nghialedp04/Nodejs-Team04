import regeneratorRuntime, { async } from "regenerator-runtime";
import { Alumni } from "../schemas/alumni";

const create = async (createAlumniReq) => {
  return await Alumni.create(createAlumniReq).catch((err) => {
    throw err;
  });
};

const getList = async (pageIndex, pageSize) => {
  const skip = +pageIndex === 1 ? 0 : (+pageIndex - 1) * +pageSize;
  return await Alumni.find({})
    .skip(skip)
    .limit(+pageSize)
    .catch((err) => {
      throw err;
    });
};

const findByAlumniName = async (name) => {
  return await Alumni.findOne({ name: name }).catch((err) => {
    throw err;
  });
};

export const alumniRepositories = {
  create,
  getList,
  findByAlumniName,
};
