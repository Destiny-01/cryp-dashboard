import { getApiData } from "@/lib/utils";
import { Trade } from "@/types";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri);
  }
  return cachedClient;
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("trades");

    const allTrades = (await collection
      .find({})
      .toArray()) as unknown as Trade[];
    const tokensData = await Promise.all(
      allTrades.map((trade) => getApiData(trade.tokenAddress))
    );

    const trades = allTrades.map((trade, i) => {
      const currentMarketCap = tokensData[i]?.marketCap || 0;

      let changePercent = 0;

      if (trade.exitMarketCap > 0) {
        changePercent =
          ((trade.exitMarketCap - trade.entryMarketCap) /
            trade.entryMarketCap) *
          100;
      } else if (currentMarketCap > 0) {
        changePercent =
          ((currentMarketCap - trade.entryMarketCap) / trade.entryMarketCap) *
          100;
      } else if (trade.entryMarketCap === 0) {
        changePercent = -100;
      }

      return {
        ...trade,
        marketCap: currentMarketCap,
        changePercent,
      };
    });

    return Response.json(trades);
  } catch (error) {
    console.error("Failed to fetch trades:", error);
    return Response.json({ error: "Failed to fetch trades" }, { status: 500 });
  }
}
