import express from "express";
import "dotenv/config";
import cors from "cors";
import adminRouter from "./modules/admin/routers";
import driverRouter from "./modules/driver/routers";
import init from "./configs/init";
import { handleExpressError } from "./utils/express";

init();
const app = express();

app.use(
  cors({
    origin: true,
    maxAge: 60 * 10, // 10 mins
    /* preflightContinue: true, */
    credentials: true,
    exposedHeaders: [
      "content-disposition",
      "content-length",
      "content-type",
      "date",
      "etag",
    ],
  })
);
// middleware routers
app.use(express.json());

// Routes handller
app.use("/driver", driverRouter);
app.use("/admin", adminRouter);

handleExpressError(app);
process.on("unhandledRejection", (reason, promise) => {
  console.error("unhandledRejection:", reason);
  console.error("unhandledRejection:", promise);
});

// error handler for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("uncaughtException:", error);
});

export default app;
