"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trade } from "@/types";
import { formatNumber, formatTimestamp } from "@/lib/utils";

export const columns: ColumnDef<Trade>[] = [
  {
    accessorKey: "name",
    header: createSortableHeader("Coin Name"),
    cell: ({ row }) => (
      <Link
        href={`https://dexscreener.com/solana/${row.original.pairAddress}`}
        target="_blank"
        className="font-medium text-center underline"
      >
        ${row.original.symbol}
      </Link>
    ),
  },
  {
    accessorKey: "timeBought",
    header: createSortableHeader("Time Bought"),
    cell: ({ row }) => {
      const date = row.getValue("timeBought") as string;
      return <div className="text-center">{formatTimestamp(date)}</div>;
    },
  },
  {
    accessorKey: "entryMarketCap",
    header: createSortableHeader("MC Bought"),
    cell: ({ row }) => {
      const value = row.getValue("entryMarketCap") as number;
      return (
        <div className="text-center">{formatNumber(value) || "Not bought"}</div>
      );
    },
  },
  {
    accessorKey: "exitMarketCap",
    header: createSortableHeader("MC Sold"),
    cell: ({ row }) => {
      const value = row.getValue("exitMarketCap") as number;
      return (
        <div className="text-center">{formatNumber(value) || "Not sold"}</div>
      );
    },
  },
  {
    accessorKey: "marketCap",
    header: createSortableHeader("Current MC"),
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
    accessorKey: "highestMarketCap",
    header: createSortableHeader("Highest MC"),
    cell: ({ row }) => {
      const value = (row.getValue("highestMarketCap") ||
        row.getValue("marketCap")) as number;
      return (
        <div className="text-center">
          {value.toLocaleString() +
            ` (${(
              ((row.original.highestMarketCap - row.original.entryMarketCap) /
                row.original.entryMarketCap) *
              100
            ).toFixed(2)}%)` || "Not available"}
        </div>
      );
    },
  },
  {
    accessorKey: "lowestMarketCap",
    header: createSortableHeader("Lowest MC"),
    cell: ({ row }) => {
      const value = (row.getValue("lowestMarketCap") ||
        row.getValue("marketCap")) as number;
      return (
        <div className="text-center">
          {value.toLocaleString() +
            ` (${(
              ((row.original.lowestMarketCap - row.original.entryMarketCap) /
                row.original.entryMarketCap) *
              100
            ).toFixed(2)}%)` || "Not available"}
        </div>
      );
    },
  },
  {
    accessorKey: "changePercent",
    header: createSortableHeader("% Change"),
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
    accessorKey: "sold",
    header: createSortableHeader("Status"),
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.status === "tp" ? (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Profit
          </span>
        ) : row.original.status === "sl" ? (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            Loss
          </span>
        ) : (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Holding
          </span>
        )}
      </div>
    ),
  },
];

// Helper function to create sortable headers
function createSortableHeader(label: string) {
  return ({ column }: { column: Column<any> }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="w-full"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
