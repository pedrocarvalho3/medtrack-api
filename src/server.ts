import { app } from "./app";
import { env } from "./env";
import { startStockMonitorJob } from "./jobs/stock-monitor";
import { startUpdateMissedDosesJob } from "./jobs/update-scheduled-doses-status";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running!");

    startStockMonitorJob();
    startUpdateMissedDosesJob();
  });
