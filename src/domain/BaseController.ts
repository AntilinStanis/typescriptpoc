import { Router } from "express";

export abstract class BaseController {
  public readonly router = Router();

  constructor() {}

  protected abstract registerRoutes(): void;
}