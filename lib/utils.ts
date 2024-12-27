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

export const formatTimestamp = (isoString: string) => {
  if (!isoString) return "-- --";
  const date = new Date(isoString);

  // Extract details
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  // Format time with AM/PM
  const isPM = hours >= 12;
  const hour12 = hours % 12 || 12; // Convert to 12-hour format
  const minutePadded = minutes.toString().padStart(2, "0");
  const time = `${hour12}:${minutePadded}${isPM ? "pm" : "am"}`;

  // Format timezone (example assumes GMT+1)
  const timezone = "GMT+1";

  // Format day with suffix
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${time} ${timezone} ${day}${daySuffix} ${month}, ${year}`;
};
