import { ConnectionOptions } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const bullmqConnection: ConnectionOptions = {
  url: process.env.BULL_MQ_REDIS,
};

export default bullmqConnection;
