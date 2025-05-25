import cron from "node-cron";
import { makeCheckLowStockUseCase } from "@/use-cases/fatories/make-check-low-stock.use-case";

export function startStockMonitorJob() {
  cron.schedule(
    "0 * * * *",
    async () => {
      console.log("Running stock monitor job...");

      try {
        const checkLowStockUseCase = makeCheckLowStockUseCase();
        await checkLowStockUseCase.execute();
        console.log("Stock monitor job completed successfully");
      } catch (error) {
        console.error("Error in stock monitor job:", error);
      }
    },
    {
      timezone: "America/Sao_Paulo",
    }
  );

  console.log("Stock monitor cron job started - runs every 1 hour");
}
