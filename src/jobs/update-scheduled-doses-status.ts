import cron from "node-cron";
import { makeCheckLowStockUseCase } from "@/use-cases/fatories/make-check-low-stock.use-case";

export function startUpdateMissedDosesJob() {
  cron.schedule(
    "0 */2 * * *",
    async () => {
      console.log("Running scheduled doses job...");

      try {
        const checkLowStockUseCase = makeCheckLowStockUseCase();
        await checkLowStockUseCase.execute();
        console.log("Scheduled doses job completed successfully");
      } catch (error) {
        console.error("Error in scheduled doses job:", error);
      }
    },
    {
      timezone: "America/Sao_Paulo",
    }
  );

  console.log("Scheduled doses cron job started - runs every 1 hour");
}
