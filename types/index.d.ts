export interface Trade {
  tokenAddress: string;
  pairAddress: string;
  symbol: string;
  entryMarketCap: number;
  marketCap: number;
  changePercent: number;
  exitMarketCap: number;
  amountHolding: number;
  initialVolume: number;
  initialMarketCap: number;
  highestMarketCap: number;
  lowestMarketCap: number;
  checks: number;
  tradeComplete: boolean;
  status: STATUS;
  tradeStatus: "tp" | "sl" | "na";
  createdAt: string;
  updatedAt: string;
}
