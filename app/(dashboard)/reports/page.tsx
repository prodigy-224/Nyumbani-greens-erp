"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import reportsData from "@/data/reports.json";

const batchComparison = reportsData.batchComparison;
const productTrends = reportsData.productTrends;
const financialSummary = reportsData.financialSummary;
const kpis = reportsData.kpis;

export default function ReportsPage() {
  const [selectedProduct, setSelectedProduct] = useState("Kunde");
  const [dateRange, setDateRange] = useState("30");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([
    "PO-20260427-003",
    "PO-20260426-001",
  ]);

  const toggleBatchSelection = (po: string) => {
    if (selectedBatches.includes(po)) {
      setSelectedBatches(selectedBatches.filter((p) => p !== po));
    } else {
      setSelectedBatches([...selectedBatches, po]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Reports & Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Batch comparison, trends, and financial summaries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36 bg-input border-border">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="60">Last 60 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Rolling KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Wastage</p>
                <p className="text-2xl font-semibold text-foreground">
                  {kpis.avgWastage}%
                </p>
                <div className="flex items-center gap-1 text-xs text-emerald">
                  <TrendingDown className="h-3 w-3" />
                  -0.8% vs prev period
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-emerald/10 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-emerald" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Shrinkage</p>
                <p className="text-2xl font-semibold text-foreground">
                  {kpis.avgShrinkage}%
                </p>
                <div className="flex items-center gap-1 text-xs text-amber">
                  <TrendingUp className="h-3 w-3" />
                  +0.3% vs prev period
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Unit Cost</p>
                <p className="text-2xl font-semibold text-gold-link">
                  KES {kpis.avgUnitCost}
                </p>
                <div className="flex items-center gap-1 text-xs text-emerald">
                  <TrendingDown className="h-3 w-3" />
                  -2.1% vs prev period
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gold-link/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-gold-link" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Net Margin</p>
                <p className="text-2xl font-semibold text-emerald">
                  {kpis.avgNetMargin}%
                </p>
                <div className="flex items-center gap-1 text-xs text-emerald">
                  <TrendingUp className="h-3 w-3" />
                  +4.2% vs prev period
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-emerald/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="comparison">Batch Comparison</TabsTrigger>
          <TabsTrigger value="trends">Product Trends</TabsTrigger>
          <TabsTrigger value="financial">Financial Summary</TabsTrigger>
        </TabsList>

        {/* Batch Comparison Tab */}
        <TabsContent value="comparison" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Batch Comparison
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select batches to compare ({selectedBatches.length} selected)
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Select
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        PO Number
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Sourced
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Received
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Wastage %
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Punnets
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Sold
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Shrinkage %
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Unit Cost
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Revenue
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Net Margin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {batchComparison.map((batch) => (
                      <tr
                        key={batch.po}
                        className={`hover:bg-muted/30 cursor-pointer ${
                          selectedBatches.includes(batch.po)
                            ? "bg-accent/50"
                            : ""
                        }`}
                        onClick={() => toggleBatchSelection(batch.po)}
                      >
                        <td className="py-3">
                          <input
                            type="checkbox"
                            checked={selectedBatches.includes(batch.po)}
                            onChange={() => toggleBatchSelection(batch.po)}
                            className="rounded border-border"
                          />
                        </td>
                        <td className="py-3">
                          <div>
                            <span className="font-mono text-sm text-green-link">
                              {batch.po}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {batch.supplier}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-right text-sm text-foreground">
                          {batch.sourcedKg} kg
                        </td>
                        <td className="py-3 text-right text-sm text-foreground">
                          {batch.receivedKg} kg
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`text-sm font-medium ${
                              batch.wastagePercent > 10
                                ? "text-crimson"
                                : batch.wastagePercent > 8
                                  ? "text-amber"
                                  : "text-emerald"
                            }`}
                          >
                            {batch.wastagePercent}%
                          </span>
                        </td>
                        <td className="py-3 text-right text-sm text-foreground">
                          {batch.packedPunnets}
                        </td>
                        <td className="py-3 text-right text-sm text-emerald">
                          {batch.punnetsSold}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`text-sm font-medium ${
                              batch.shrinkagePercent > 3
                                ? "text-crimson"
                                : batch.shrinkagePercent > 2
                                  ? "text-amber"
                                  : "text-emerald"
                            }`}
                          >
                            {batch.shrinkagePercent}%
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono text-sm text-foreground">
                          KES {batch.unitCostPerPunnet.toFixed(2)}
                        </td>
                        <td className="py-3 text-right font-mono text-sm text-gold-link">
                          {batch.revenue > 0
                            ? `KES ${batch.revenue.toLocaleString()}`
                            : "—"}
                        </td>
                        <td className="py-3 text-right">
                          {batch.netMarginPercent > 0 ? (
                            <span
                              className={`text-sm font-medium ${
                                batch.netMarginPercent > 50
                                  ? "text-emerald"
                                  : batch.netMarginPercent > 30
                                    ? "text-amber"
                                    : "text-crimson"
                              }`}
                            >
                              {batch.netMarginPercent}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-48 bg-input border-border">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kunde">Kunde</SelectItem>
                <SelectItem value="Managu">Managu</SelectItem>
                <SelectItem value="Terere">Terere</SelectItem>
                <SelectItem value="Mrenda">Mrenda</SelectItem>
                <SelectItem value="Sukuma">Sukuma</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline">
              Last{" "}
              {productTrends[selectedProduct as keyof typeof productTrends]
                ?.batches.length || 0}{" "}
              batches
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {selectedProduct &&
              productTrends[selectedProduct as keyof typeof productTrends] && (
                <>
                  <Card className="border-border bg-card">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        Avg Wastage
                      </p>
                      <p className="text-2xl font-semibold text-foreground">
                        {
                          productTrends[
                            selectedProduct as keyof typeof productTrends
                          ].avgWastage
                        }
                        %
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        Avg Shrinkage
                      </p>
                      <p className="text-2xl font-semibold text-foreground">
                        {
                          productTrends[
                            selectedProduct as keyof typeof productTrends
                          ].avgShrinkage
                        }
                        %
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        Avg Unit Cost
                      </p>
                      <p className="text-2xl font-semibold text-gold-link">
                        KES{" "}
                        {
                          productTrends[
                            selectedProduct as keyof typeof productTrends
                          ].avgUnitCost
                        }
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        Avg Margin
                      </p>
                      <p className="text-2xl font-semibold text-emerald">
                        {
                          productTrends[
                            selectedProduct as keyof typeof productTrends
                          ].avgMargin
                        }
                        %
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                {selectedProduct} - Batch History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Batch
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Wastage %
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Shrinkage %
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Unit Cost
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Margin %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {productTrends[
                      selectedProduct as keyof typeof productTrends
                    ]?.batches.map((batch) => (
                      <tr key={batch.po} className="hover:bg-muted/30">
                        <td className="py-3">
                          <span className="font-mono text-sm text-green-link">
                            {batch.po}
                          </span>
                        </td>
                        <td className="py-3 text-right text-sm">
                          <span
                            className={
                              batch.wastage > 10
                                ? "text-crimson"
                                : batch.wastage > 8
                                  ? "text-amber"
                                  : "text-emerald"
                            }
                          >
                            {batch.wastage}%
                          </span>
                        </td>
                        <td className="py-3 text-right text-sm">
                          <span
                            className={
                              batch.shrinkage > 3
                                ? "text-crimson"
                                : batch.shrinkage > 2
                                  ? "text-amber"
                                  : "text-emerald"
                            }
                          >
                            {batch.shrinkage}%
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono text-sm text-foreground">
                          KES {batch.unitCost}
                        </td>
                        <td className="py-3 text-right text-sm text-emerald">
                          {batch.margin}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Summary Tab */}
        <TabsContent value="financial" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Financial Summary
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Last sync:{" "}
                  {new Date(
                    financialSummary.lastSyncTimestamp,
                  ).toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Sourcing Spend
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    KES {financialSummary.totalSourcingSpend.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Production Costs
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    KES {financialSummary.totalProductionCosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber/10 border border-amber/30">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total COGS
                  </p>
                  <p className="text-2xl font-semibold text-amber">
                    KES {financialSummary.totalCOGS.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Revenue (from Zoho)
                  </p>
                  <p className="text-2xl font-semibold text-gold-link">
                    KES {financialSummary.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-emerald/10 border border-emerald/30">
                  <p className="text-sm text-muted-foreground mb-1">
                    Net Profit
                  </p>
                  <p className="text-2xl font-semibold text-emerald">
                    KES {financialSummary.netProfit.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-emerald/10 border border-emerald/30">
                  <p className="text-sm text-muted-foreground mb-1">
                    Average Net Margin
                  </p>
                  <p className="text-2xl font-semibold text-emerald">
                    {financialSummary.avgNetMargin}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Type Breakdown */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Cost Type Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Sourcing",
                    amount: 51500,
                    percent: 61.3,
                    color: "bg-violet",
                  },
                  {
                    name: "Labour",
                    amount: 12800,
                    percent: 15.2,
                    color: "bg-blue",
                  },
                  {
                    name: "Packaging Materials",
                    amount: 9600,
                    percent: 11.4,
                    color: "bg-emerald",
                  },
                  {
                    name: "Delivery/Transport",
                    amount: 5350,
                    percent: 6.4,
                    color: "bg-amber",
                  },
                  {
                    name: "Electricity",
                    amount: 3200,
                    percent: 3.8,
                    color: "bg-purple",
                  },
                  {
                    name: "Quality Control",
                    amount: 1500,
                    percent: 1.9,
                    color: "bg-tomato",
                  },
                ].map((cost) => (
                  <div key={cost.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{cost.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-muted-foreground">
                          KES {cost.amount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          ({cost.percent}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${cost.color}`}
                        style={{ width: `${cost.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
