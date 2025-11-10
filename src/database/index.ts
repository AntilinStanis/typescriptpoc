import { Dialect, Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
import config from "../config";

export class Database {
  private static _sequelize: Sequelize;

  /** Initialize and connect the DB */
  static async connect(): Promise<Sequelize> {
    if (Database._sequelize) return Database._sequelize;

    Database._sequelize = new Sequelize({
      dialect: config.dialect as Dialect,
      host: config.host,
      port: config.dbPort,
      username: config.username,
      password: config.password,
      database: config.name,
      logging: false
    });

    await Database._sequelize.authenticate();
    console.log("Database connected");

    // Auto load schemas & models
    const schemasDir = path.join(__dirname, "schemas");
    const schemaFolders = fs.readdirSync(schemasDir);

    for (const schema of schemaFolders) {
      const schemaPath = path.join(schemasDir, schema);
      if (fs.statSync(schemaPath).isDirectory()) {
        const modelFiles = fs.readdirSync(schemaPath).filter(f => f.endsWith(".model.ts") || f.endsWith(".model.js"));
        for (const file of modelFiles) {
          const modelModule = await import(path.join(schemaPath, file));
          const ModelClass = modelModule.default;
          if (ModelClass?.initModel) {
            await Database._sequelize.createSchema(schema, { logging: false }).catch(() => {});
            ModelClass.initModel(Database._sequelize, schema);
          }
        }
      }
    }

    await Database._sequelize.sync();
    return Database._sequelize;
  }

  /** Return existing instance */
  static get instance(): Sequelize {
    if (!Database._sequelize) throw new Error("Database not initialized. Call Database.connect() first.");
    return Database._sequelize;
  }

  /** Graceful close */
  static async close(): Promise<void> {
    if (Database._sequelize) {
      await Database._sequelize.close();
      console.log("Database connection closed");
    }
  }
}