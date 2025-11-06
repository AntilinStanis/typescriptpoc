import { Response } from "express";


interface ErrorResponse {
    code: string;
    statusCode: number,
    message: string,
    details: string,
    instance: string
};

/**
 * Throw Error
 * 
 * Utility function to throw an error with a custom message.
 * Since it always throws, its return type is `never`.
 *
 * @param errMessage - Error message to throw
 * @throws {Error} - Always throws an Error
 */
export const TE = (errMessage: string): never => {
    throw new Error(errMessage);
};
/**
 * Error Response
 * 
 * Sends a JSON response with `success: false` and error details.
 * Sets the HTTP status code before sending.
 *
 * @param res - Express response object
 * @param err - Error object or error details
 * @param code - HTTP status code (e.g., 400, 404, 500)
 * @returns Express Response with JSON body
 */
export const ER = (res: Response, err: ErrorResponse): Response => {
    res.statusCode = err.statusCode;
    console.error({ ERROR: err });
    return res.json({ success: false, statusCode: err.statusCode, error: { code: err.code, message: err.message } });
};
/**
 * Success Response
 * 
 * Sends a JSON response with `success: true` and merges any provided data.
 * Sets the HTTP status code before sending.
 *
 * @param res - Express response object
 * @param data - Data object to include in the response
 * @param code - HTTP status code (e.g., 200, 201)
 * @returns Express Response with JSON body
 */
export const SR = (res: Response, data: object, code: number): Response => {
    let send_data = { success: true };

    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data);//merge the objects
    };

    res.statusCode = code;

    return res.json(send_data)
};