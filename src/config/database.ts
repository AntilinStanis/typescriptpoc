import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "test_db",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "stanis",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: false,
  },
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production"
      ? { require: true, rejectUnauthorized: false }
      : false,
  },
});
