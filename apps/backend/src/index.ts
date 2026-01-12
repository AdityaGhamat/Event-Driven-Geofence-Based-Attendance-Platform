import cookieParser from "cookie-parser";
import express from "express";
import { Express } from "express";
import type { Request, Response } from "express";
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
      "https://event-driven-geofence-based-attenda.vercel.app",
      "https://amazing-strudel-fbd896.netlify.app/",
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
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        status: "success",
        message: "Geofence Attendance System API is operational",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || "development",
        uptime: `${process.uptime().toFixed(2)}s`,
      });
    });
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
    this.app.listen(port, "0.0.0.0");
  }
}

export default new Server();
