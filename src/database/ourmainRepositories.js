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

const update = async (OurmainId, OurmainUpdateReq) => {
  return await Ourmain.findByIdAndUpdate(OurmainId, OurmainUpdateReq).catch(
    (err) => {
      throw err;
    }
  );
};

const deleteOurmain = async (OurmainId) => {
  return await Ourmain.findByIdAndDelete(OurmainId).catch((err) => {
    throw err;
  });
};

const findByOurmainName = async (name) => {
  return await Ourmain.findOne({ name: name }).catch((err) => {
    throw err;
  });
};

export const ourmainRepositories = {
  create,
  getList,
  deleteOurmain,
  update,
  findByOurmainName,
};
