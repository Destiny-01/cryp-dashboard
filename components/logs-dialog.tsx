"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ClipboardList } from "lucide-react";
import { TradeLog } from "@/types";

interface TradeLogsDialogProps {
  logs: TradeLog[];
  tradeName: string;
  tradeMC: string;
}

const actionLabels: Record<string, string> = {
  BOUGHT: "Bought at MC",
  STOP_LOSS: "Hit SL at MC",
  TP_2X: "Hit 2x TP at MC",
  TP_5X: "Hit 5x TP at MC",
  TP_10X: "Hit 10x TP at MC",
  TP_20X: "Hit 20x TP at MC",
};

export function TradeLogsDialog({
  logs,
  tradeName,
  tradeMC,
}: TradeLogsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          Logs
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Trade Logs - {tradeName} ({tradeMC})
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            {logs?.length > 0 ? (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border pb-2"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(log.timestamp), "MMM d, yyyy HH:mm")}
                    </span>
                    <span className="font-medium">
                      {actionLabels[log.action]}
                    </span>
                  </div>
                  <span className="text-sm font-mono">{log.marketCap}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No logs found</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
