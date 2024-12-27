import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApiData = async (token: string) => {
  try {
    const req = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${token}`
    );
    const request = await req.json();

    const pairData = request.pairs[0];
    const symbol =
      pairData.baseToken.address ===
      "So11111111111111111111111111111111111111112"
        ? pairData.quoteToken.symbol
        : pairData.baseToken.symbol;

    return {
      pairAddress: pairData.pairAddress,
      tokenAddress: token,
      symbol,
      volume: pairData.volume.h1,
      marketCap: pairData.marketCap,
      liquidity: pairData.liquidity.usd,
      priceChange: pairData.priceChange.h1,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
