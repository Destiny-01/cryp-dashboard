"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trade } from "@/types";

export const columns: ColumnDef<Trade>[] = [
  {
    accessorKey: "name",
    header: "Coin Name",
    cell: ({ row }) => (
      <div className="font-medium text-center">
        {row.getValue("name")} ({row.original.symbol})
      </div>
    ),
  },
  {
    accessorKey: "entryMarketCap",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Market Cap Bought
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("entryMarketCap") as number;
      return (
        <div className="text-center">
          {value.toLocaleString() || "Not bought"}
        </div>
      );
    },
  },
  {
    accessorKey: "marketCap",
    header: "Current MC",
    cell: ({ row }) => {
      const value = row.getValue("marketCap") as number;
      return (
        <div className="text-center">
          {value.toLocaleString() || "Not available"}
        </div>
      );
    },
  },
  {
    accessorKey: "changePercent",
    header: "% Change",
    cell: ({ row }) => {
      const change = row.getValue("changePercent") as number;
      const isPositive = change >= 0;
      return (
        <div
          className={`text-center ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {change?.toFixed(2)}%
        </div>
      );
    },
  },
  {
    accessorKey: "highestMc",
    header: "Highest MC",
    cell: ({ row }) => {
      const value = (row.getValue("highestMarketCap") ||
        row.getValue("marketCap")) as number;
      return (
        <div className="text-center">
          {value.toLocaleString() || "Not available"}
        </div>
      );
    },
  },
  {
    accessorKey: "lowestMc",
    header: "Lowest MC",
    cell: ({ row }) => {
      const value = (row.getValue("lowestMarketCap") ||
        row.getValue("marketCap")) as number;
      return (
        <div className="text-center">
          {value.toLocaleString() || "Not available"}
        </div>
      );
    },
  },
  {
    accessorKey: "sold",
    header: "Status",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.exitMarketCap ? (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Sold
          </span>
        ) : (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Holding
          </span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={`https://dexscreener.com/solana/${row.original.pairAddress}`}
              target="_blank"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      );
    },
  },
];
