import { param, ValidationChain } from "express-validator";
import { BaseValidator } from "../../domain/BaseValidator";
import { RequestHandler } from "express";

export class AuthValidator extends BaseValidator {
  static signup(): [ValidationChain, ...(ValidationChain | RequestHandler)[]] {
    return [
      param('storeId').isNumeric().withMessage('StoreId is required'),
      param('productId').isNumeric().withMessage('productId is required'),
      BaseValidator.validate
    ];
  }
}