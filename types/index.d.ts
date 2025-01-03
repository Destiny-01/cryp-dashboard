export interface Trade {
  _id: string;
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
  tradeStatus: TradeAction;
  createdAt: string;
  logs: TradeLog[];
  updatedAt: string;
}

export interface TradeLog {
  timestamp: Date;
  action: TradeAction;
  marketCap: string;
}

export type TradeAction =
  | "BOUGHT"
  | "STOP_LOSS"
  | "TP_2X"
  | "TP_5X"
  | "TP_10X"
  | "TP_20X";
