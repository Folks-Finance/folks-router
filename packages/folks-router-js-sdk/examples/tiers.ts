import { FolksRouterClient, Network } from "../src";

async function main() {
  const client = new FolksRouterClient(Network.MAINNET);

  // fetch discount tiers
  const tiers = await client.fetchDiscountTiers();
  console.log(tiers);
}

main().catch(console.error);
