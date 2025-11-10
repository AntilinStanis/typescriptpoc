import dotenv from 'dotenv';

// Load .env once at startup
dotenv.config();

/** Strongly typed interface for all app config values */
interface IAppConfig {
  app: string;
  port: number;
  dbPort: number;
  dialect: string;
  host: string;
  username: string;
  password: string;
  name: string;
  schemas: string[];
}

/** Application configuration object (immutable) */
const config: Readonly<IAppConfig> = Object.freeze({
  app: process.env.APP || 'local',
  port: Number(process.env.PORT) || 3000,
  dbPort: Number(process.env.DB_PORT) || 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  name: process.env.DB_NAME || 'test_db',
  schemas: [
    'user',
    'user_1'
  ]
});

export default config;
