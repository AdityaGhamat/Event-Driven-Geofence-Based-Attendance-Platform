import cookieParser from "cookie-parser";
import express from "express";
import { Express } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import { errorMiddleware } from "./modules/core/middlewares/errormiddleware";
import { connectDb } from "./modules/core/utils/connectdb";
import cors from "cors";

import { initSchedule } from "./modules/attendance/cron/schedule";
import { scheduleWorker } from "./modules/attendance/worker/attendance.worker";
import { aggregationWorker } from "./modules/attendance/worker/aggregation.worker";

//cron jobs

class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorMiddleware();
  }
  private middleware() {
    dotenv.config();
    const allowedOrigins = [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean);
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.use("/api", apiRoutes);
  }

  private errorMiddleware() {
    this.app.use(errorMiddleware);
  }

  public async start(port: number) {
    await connectDb();
    scheduleWorker.run();
    aggregationWorker.run();
    await initSchedule();
    this.app.listen(port);
  }
}

export default new Server();
