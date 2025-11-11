import { Response } from "express";
import { ApiResponse } from "./interfaces/globalFunctions.interface";

declare global {
  var to: <T, E = any>(promise: Promise<T>) => Promise<[E | null, T | null]>;
  var TE: (errMsg: string, log?: boolean) => never;
  var ReE: (
    res: Response,
    errorObject: { message: string; error: string, instance: string },
    code?: number
  ) => Promise<Response<ApiResponse<null>>>;
  var ReS: (
    res: Response,
    resObject: { message: string; data: any, instance: string },
    code?: number
  ) => Promise<Response<ApiResponse<null>>>;
}
Error.prepareStackTrace = (err, stack) => JSON.stringify({
    message: err.message,
    stack: stack.map(frame => ({
      file: frame.getFileName(),
      function: frame.getFunctionName(),
      column: frame.getColumnNumber(),
      line: frame.getLineNumber()
    }))
});

(global as any).to = async function <T, E = any>(promise: Promise<T>): Promise<[E | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err as E, null];
  }
};

(global as any).TE = function (errMsg: string, log = false): never {
  if (log) console.error(errMsg);
  throw new Error(errMsg);
};

(global as any).ReE = async (
  res: Response,
  errorObject: { message: string; error: string, instance: string },
  code = 422
): Promise<Response<ApiResponse<null>>> => {
  const response: ApiResponse<null> = {
    success: false,
    message: errorObject.message,
    error: errorObject.error,
    instance: errorObject.instance
  };
  return res.status(code).json(response);
};

(global as any).ReS = async (
  res: Response,
  resObject: { message: string; data: any, instance: string },
  code = 200
): Promise<Response<ApiResponse<null>>> => {
  const response: ApiResponse<null> = {
    success: true,
    message: resObject.message,
    data: resObject.data,
    instance: resObject.instance
  };
  return res.status(code).json(response);
};

export {};