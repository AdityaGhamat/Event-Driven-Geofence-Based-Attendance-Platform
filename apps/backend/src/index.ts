import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import apiRoutes from "./routes";
import { errorMiddleware } from "./modules/core/middlewares/errormiddleware";
import { connectDb } from "./modules/core/utils/connectdb";

import { initSchedule } from "./modules/attendance/cron/schedule";
import { scheduleWorker } from "./modules/attendance/worker/attendance.worker";
import { aggregationWorker } from "./modules/attendance/worker/aggregation.worker";

class Server {
  public app: Express;

  constructor() {
    this.app = express();
    dotenv.config();

    this.middleware();
    this.routes();
    this.errorHandler();
  }

  private middleware() {
    const port = process.env.PORT || 3000;
    const allowedOrigins = [
      "http://localhost:5173",
      `http://localhost:${port}`,
      "https://event-driven-geofence-based-attenda.vercel.app",
      "https://event-driven-geofence-based-attendance-x952.onrender.com",
      "https://event-driven-geofence-based-attendance.onrender.com",
      "https://amazing-strudel-fbd896.netlify.app",
      "https://attendify.adityaghamat.in",
    ].filter(Boolean);

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          }
          callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
      })
    );

    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

    this.app.use(express.static(frontendDistPath));
  }

  private routes() {
    this.app.get("/api/health", (_req: Request, res: Response) => {
      res.status(200).json({
        status: "success",
        message: "Geofence Attendance System API is operational",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || "development",
        uptime: `${process.uptime().toFixed(2)}s`,
      });
    });

    this.app.use("/api", apiRoutes);

    this.app.use((req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
    });
  }

  private errorHandler() {
    this.app.use(errorMiddleware);
  }

  public async start(port: number) {
    this.app.listen(port, "0.0.0.0", () => {
      console.log(`Server started on 0.0.0.0:${port}`);
    });
    try {
      await connectDb();
      scheduleWorker.run();
      aggregationWorker.run();
      await initSchedule();
    } catch (error) {
      console.error("❌ Database failed to connect:", error);
      process.exit(1);
    }
  }
}

export default new Server();
