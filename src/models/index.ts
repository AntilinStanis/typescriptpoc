import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { sequelize } from "../config/database";

const basename = path.basename(__filename);
const db: { [key: string]: any } = {};

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    const modelClass = model.default || Object.values(model)[0];
    if (modelClass && modelClass.init) {
      db[modelClass.name] = modelClass;
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
