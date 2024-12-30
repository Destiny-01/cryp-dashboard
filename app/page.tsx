"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { StatsCard } from "@/components/stats-card";
import { Bot, Coins, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Trade } from "@/types";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [stats, setStats] = useState({
    totalCoins: 0,
    ruggedCoins: 0,
    boughtCoins: 0,
    successfulWins: 0,
    losses: 0,
  });

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/trades", { cache: "no-store" });
        const allCoins = await response.json();
        const data = allCoins.filter((d: any) => d.status === "active");
        setTrades(data);

        console.log(data);
        // Calculate stats
        const successfulTrades = data.filter(
          (trade: Trade) => trade.tradeStatus === "tp"
        );
        const lostTrades = data.filter(
          (trade: Trade) =>
            trade.tradeStatus === "sl" && trade.exitMarketCap > 0
        );
        const ruggedTrades = allCoins.filter(
          (trade: Trade) =>
            trade.changePercent < 0 && trade.entryMarketCap === 0
        );
        setStats({
          totalCoins: allCoins.length,
          ruggedCoins: ruggedTrades.length,
          boughtCoins: data.filter((trade: Trade) => trade.entryMarketCap > 0)
            .length,
          successfulWins: successfulTrades.length,
          losses: lostTrades.length,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch trades:", error);
      }
    };

    fetchTrades();
  }, []);

  const statsCards = [
    {
      title: "Coins In Database",
      value: stats.totalCoins.toString(),
      icon: Coins,
      description: "Total tracked coins",
    },
    {
      title: "Rugged Before Bought",
      value: stats.ruggedCoins.toString(),
      icon: TrendingDown,
      description: "Avoided losses",
    },
    {
      title: "Total Coins Bought",
      value: stats.boughtCoins.toString(),
      icon: Wallet,
      description: "All-time purchases",
    },
    {
      title: "Successful Wins",
      value: stats.successfulWins.toString(),
      icon: TrendingUp,
      description: `${(
        (stats.successfulWins / stats.totalCoins) *
        100
      )?.toFixed(0)}% success rate`,
    },
    {
      title: "Losses Count",
      value: stats.losses.toString(),
      icon: Bot,
      description: "Learning from mistakes",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-10 w-10 border-2 rounded-full border-b-transparent animate-spin border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Trading Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor your crypto trading bot performance and analytics
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {statsCards.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Trading History</h2>
              <p className="text-muted-foreground">
                Recent trading activities and performance
              </p>
            </div>
            <DataTable columns={columns} data={trades} />
          </Card>
        </div>
      </div>
    </div>
  );
}
