import errors from "./errors";

export { default as errors } from "./errors";

export class Helper {
  static responseJsonHandler(error, data, expressResponse) {
    let obj = { error: error, data: data };
    if (obj.error) {
      expressResponse.json(obj.error);
    } else {
      expressResponse.json(obj.data);
    }
  }
}

export class ResponseBase {
  static responseJsonHandler(data, expressResponse) {
    expressResponse.json({
      status: 200,
      message: "Successful",
      data: data,
    });
  }
}
