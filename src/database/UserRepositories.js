import { errors } from "../helper";
import { User } from "../schemas/user";

const getList = (pageIndex, pageSize) => {
  const skip = pageIndex === 1 ? 0 : (pageIndex - 1) * pageSize;
  return new Promise((resolve, reject) => {
    try {
      User.find({}, (error, data) => {
        if (error) {
          reject(errors[404]);
        } else {
          resolve(data);
        }
      })
        .skip(skip)
        .limit(pageSize);
    } catch (error) {
      reject(errors);
    }
  });
};

const getMe = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      User.findById(userId, (error, data) => {
        if (error) {
          reject(errors[404]);
        } else {
          if (data === null) {
            reject(errors[404]);
          }
          resolve(data);
        }
      });
    } catch (error) {
      resolve(error);
    }
  });
};

const create = (newUser) => {
  return new Promise((resolve, reject) => {
    try {
      User.create(newUser, (error, resposne) => {
        if (error) {
          reject(errors[422]);
        } else {
          resolve(resposne);
        }
      });
    } catch (error) {
      reject(errors);
    }
  });
};

const update = (UserId, UserUpdateReq) => {
  return new Promise((resolve, reject) => {
    try {
      User.findByIdAndUpdate(UserId, UserUpdateReq, (error, data) => {
        if (error) {
          reject(errors);
        } else {
          if (data === null) {
            reject(errors[404]);
          }
          resolve(data);
        }
      });
    } catch (error) {
      reject(errors);
    }
  });
};

const deleteUser = (UserId) => {
  return new Promise((resolve, reject) => {
    try {
      User.findByIdAndDelete(UserId, (err, data) => {
        if (err) {
          reject(errors[404]);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      resolve(error);
    }
  });
};

export const UserRepositories = {
  getList,
  getMe,
  create,
  update,
  deleteUser,
};
