"use client";

import { useState } from "react";
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Play,
  Settings,
  ExternalLink,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import zohoData from "@/data/zoho.json";

const syncStatus = zohoData.syncStatus;
const stockIssues = zohoData.stockIssues;
const syncLogs = zohoData.syncLogs;
const unmatchedSKUs = zohoData.unmatchedSKUs;

const statusColors: Record<string, string> = {
  Success: "bg-emerald/20 text-emerald border border-emerald/30",
  Warning: "bg-amber/20 text-amber border border-amber/30",
  Error: "bg-crimson/20 text-crimson border border-crimson/30",
  Failed: "bg-crimson/20 text-crimson border border-crimson/30",
};

export default function ZohoPage() {
  const [isManualSyncing, setIsManualSyncing] = useState(false);

  const handleManualSync = () => {
    setIsManualSyncing(true);
    setTimeout(() => setIsManualSyncing(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Zoho Integration
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage stock issuance and sales sync
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            size="sm"
            className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90"
            onClick={handleManualSync}
            disabled={isManualSyncing}
          >
            {isManualSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  syncStatus.connected ? "bg-emerald/10" : "bg-crimson/10"
                }`}
              >
                {syncStatus.connected ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald" />
                ) : (
                  <XCircle className="h-6 w-6 text-crimson" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-foreground">
                    Zoho Inventory
                  </h3>
                  <Badge
                    className={
                      syncStatus.connected
                        ? statusColors.Success
                        : statusColors.Error
                    }
                  >
                    {syncStatus.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last sync: {new Date(syncStatus.lastSync).toLocaleString()} •
                  Next sync in {syncStatus.interval} min
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">
                  {syncStatus.recordsPulled}
                </p>
                <p className="text-xs text-muted-foreground">Records Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-emerald">
                  {syncStatus.recordsMatched}
                </p>
                <p className="text-xs text-muted-foreground">Matched</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-amber">
                  {syncStatus.unmatched}
                </p>
                <p className="text-xs text-muted-foreground">Unmatched</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="issues" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="issues" className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Stock Issues
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <ArrowDownLeft className="h-4 w-4" />
            Sales Sync
          </TabsTrigger>
          <TabsTrigger value="unmatched" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Unmatched ({unmatchedSKUs.length})
          </TabsTrigger>
        </TabsList>

        {/* Stock Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Stock Issues to Zoho
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by SKU or PO..."
                      className="pl-9 h-8 bg-input border-border"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Issue ID
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        PO / Product
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Zoho SKU
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Issued
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Sold
                      </th>
                      <th className="py-3 text-right pr-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Unsold
                      </th>
                      <th className="py-3 text-left pl-4 text-xs font-medium uppercase tracking-wider text-muted-foreground min-w-[10rem]">
                        Push Status
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {stockIssues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-muted/30">
                        <td className="py-3">
                          <span className="font-mono text-sm text-foreground">
                            {issue.id}
                          </span>
                        </td>
                        <td className="py-3">
                          <div>
                            <span className="font-mono text-xs text-green-link">
                              {issue.po}
                            </span>
                            <p className="text-sm text-foreground">
                              {issue.product}
                            </p>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs text-violet border-violet/30"
                          >
                            {issue.sku}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-sm text-foreground">
                          {issue.punnetsIssued}
                        </td>
                        <td className="py-3 text-right text-sm text-emerald">
                          {issue.punnetsSold}
                        </td>
                        <td className="py-3 text-right text-sm text-amber pr-6">
                          {issue.punnetsUnsold}
                        </td>
                        <td className="py-3 min-w-[10rem] whitespace-nowrap pl-4">
                          <Badge className={statusColors[issue.pushStatus]}>
                            {issue.pushStatus}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-sm text-muted-foreground">
                          {new Date(issue.issueDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Sync Tab */}
        <TabsContent value="sales" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Sync Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Timestamp
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Trigger
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Pulled
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Matched
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Unmatched
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Duplicates
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Errors
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {syncLogs.map((log, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="py-3">
                          <span className="font-mono text-sm text-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className="text-xs">
                            {log.trigger}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-sm text-foreground">
                          {log.recordsPulled}
                        </td>
                        <td className="py-3 text-right text-sm text-emerald">
                          {log.matched}
                        </td>
                        <td className="py-3 text-right text-sm text-amber">
                          {log.unmatched}
                        </td>
                        <td className="py-3 text-right text-sm text-muted-foreground">
                          {log.duplicates}
                        </td>
                        <td className="py-3 text-right text-sm text-crimson">
                          {log.errors}
                        </td>
                        <td className="py-3">
                          <Badge className={statusColors[log.status]}>
                            {log.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unmatched SKUs Tab */}
        <TabsContent value="unmatched" className="space-y-4">
          <Card className="border-amber/30 bg-amber/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {unmatchedSKUs.length} unmatched SKUs require attention
                  </p>
                  <p className="text-xs text-muted-foreground">
                    These Zoho sales could not be matched to ERP batches.
                    Revenue is not attributed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Unmatched SKU Exceptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Zoho Order ID
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        SKU (Unmatched)
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Product
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Quantity
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Revenue
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Order Date
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {unmatchedSKUs.map((item) => (
                      <tr key={item.zohoOrderId} className="hover:bg-muted/30">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-foreground">
                              {item.zohoOrderId}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs text-crimson border-crimson/30"
                          >
                            {item.sku}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-foreground">
                          {item.product}
                        </td>
                        <td className="py-3 text-right text-sm text-foreground">
                          {item.quantity}
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-mono text-sm text-gold-link">
                            KES {item.revenue.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 text-right text-sm text-muted-foreground">
                          {new Date(item.orderDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="outline" size="sm">
                            Map to Batch
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
