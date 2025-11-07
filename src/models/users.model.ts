import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
  declare id: number;
  declare is_superadmin: boolean;
  declare email: string;
  declare password: string;
  declare token: string | null;
  declare tokenExpires: Date | null;
  declare isDeleted: boolean;
  declare isActive: boolean;
  declare isSuspended: boolean;
  declare role_id: number;
  declare modified_by: number | null;
  declare createdAt: Date;
  declare modifiedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    is_superadmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user",
    modelName: "User",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "modifiedAt",
  }
);
