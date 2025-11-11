import { Application } from "express";
import { AuthController } from "../controllers/auth.controller";

export async function registerRoutes(app: Application): Promise<void> {
  app.get("/ping", (req, res) => {
    res.status(200).send("Application running successfully");
  });
  app.use("/v1/admin", new AuthController()?.router);
  app.use("/v1/:storeId", new AuthController()?.router);
}
