import { Router } from "express";

export abstract class BaseController {
  public readonly router = Router({mergeParams: true});

  constructor() {}

  protected abstract registerRoutes(): void;
}