import cron from "node-cron";

import { scrapeFandom } from "./scrape-fandom-streaming";

async function run() {
  try {
    const data = await scrapeFandom();
    console.log(`[${new Date().toISOString()}] Scrape concluído (${data.length} itens)`);
  } catch (error) {
    console.error("Falha ao executar o scrape do Fandom:", (error as Error).message);
  }
}

cron.schedule("*/1 * * * *", () => {
  void run();
});

void run();
