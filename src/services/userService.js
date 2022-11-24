import { UserRepositories } from "../database";
import { errors } from "../helper";

const getList = (pageIndex, pageSize) => {
  return new Promise((resolve, reject) => {
    UserRepositories.getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getMe = (userId) => {
  return new Promise((resolve, reject) => {
    UserRepositories.getMe(userId)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const create = (UserCreateReq) => {
  const newUser = {
    name: UserCreateReq.name,
    phone: UserCreateReq.phone,
    email: UserCreateReq.email,
    password: UserCreateReq.password,
  };

  return new Promise((resolve, reject) => {
    UserRepositories.create(newUser)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const update = (UserId, UpdateUserReq) => {
  return new Promise((resolve, reject) => {
    if (UserId && UpdateUserReq) {
      UserRepositories.update(UserId, UpdateUserReq)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(errors);
    }
  });
};

const deleteUser = (UserId) => {
  return new Promise((resolve, reject) => {
    if (UserId) {
      UserRepositories.deleteUser(UserId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(errors);
    }
  });
};

export const userService = {
  getList,
  getMe,
  update,
  create,
  deleteUser,
};
