/**
 * Main application entry point.
 * Initializes Express, configures middlewares, and starts the server.
 */ 
import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { Database } from "./database";
import { registerRoutes } from "./routes";
import "./globalFunction";
dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

class App {
  public readonly app: Application;
  private server?: import("http").Server;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.handleOSSignals();
    this.handleProcessEvents();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  private async shutdown(exitCode: number): Promise<void> {
    console.log(`Process exited with ${exitCode}`);
    process.exit(exitCode);
  }

  /** Handle OS-level signals for graceful termination */
  private handleOSSignals(): void {
    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGUSR2'];
    signals.forEach((eachSignal: NodeJS.Signals) => {
      process.once(eachSignal, async() => {
        console.log(`Process ${process.pid} received a ${eachSignal} signal`);
        await Database.close();
        await new Promise<void>((resolve, reject) => {
          this.server!.close((err) => {
            if(err) reject(err);
            resolve();
          });
        }).then(()=> console.log("Cleanup process completed")).catch((err)=>console.log("Error during Cleanup - "+ err));
        this.shutdown(0);
      });
    });
  }

  /** Handle uncaught exceptions and unhandled promise rejections */
  private handleProcessEvents(): void {
    const events: {
      name: NodeJS.UncaughtExceptionOrigin;
      handler: (...args: any[]) => void;
    }[] = [
      {
        name: "unhandledRejection",
        handler: (reason: unknown, promise: Promise<unknown>) => {
          console.error("Unhandled Rejection:", reason);
        },
      },
      {
        name: "uncaughtException",
        handler: (error: Error) => {
          console.error("Uncaught Exception:", error);
        },
      },
    ];
    events.forEach(({ name, handler }) => {
      process.on(name, handler);
    });
  }

  /** Start the HTTP server */
  public async start(): Promise<void> {
    await Database.connect().catch((error) => console.log('Error in connecting database - ' + error.message));
    await registerRoutes(this.app);
    this.server = this.app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }
}

const server = new App();
server.start();

export default server.app;