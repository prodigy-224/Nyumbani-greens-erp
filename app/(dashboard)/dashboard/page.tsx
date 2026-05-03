"use client";

import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Leaf,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for dashboard
const kpis = [
  {
    title: "Active Batches",
    value: "12",
    change: "+3",
    trend: "up",
    description: "Currently in pipeline",
    icon: Package,
    color: "emerald",
  },
  {
    title: "Today's Revenue",
    value: "KES 45,230",
    change: "+12.5%",
    trend: "up",
    description: "From Zoho sync",
    icon: DollarSign,
    color: "gold",
  },
  {
    title: "Avg Wastage",
    value: "8.2%",
    change: "-1.3%",
    trend: "down",
    description: "Last 30 days",
    icon: Leaf,
    color: "emerald",
  },
  {
    title: "Net Margin",
    value: "32.4%",
    change: "+2.1%",
    trend: "up",
    description: "Last 30 days",
    icon: TrendingUp,
    color: "gold",
  },
];

const pipelineStages = [
  { name: "Draft", count: 2, color: "bg-muted" },
  { name: "Confirmed", count: 3, color: "bg-violet" },
  { name: "In Production", count: 4, color: "bg-amber" },
  { name: "Packaging", count: 2, color: "bg-blue" },
  { name: "Ready for Sale", count: 1, color: "bg-emerald" },
];

const recentBatches = [
  {
    po: "PO-20260428-001",
    supplier: "Kiambu Farms",
    products: ["Kunde", "Managu"],
    status: "In Production",
    totalCost: "KES 12,500",
    date: "Today",
  },
  {
    po: "PO-20260427-003",
    supplier: "Thika Greens",
    products: ["Terere", "Mrenda", "Sukuma"],
    status: "Packaging",
    totalCost: "KES 18,200",
    date: "Yesterday",
  },
  {
    po: "PO-20260427-002",
    supplier: "Limuru Organics",
    products: ["Spinach"],
    status: "Ready for Sale",
    totalCost: "KES 8,750",
    date: "Yesterday",
  },
  {
    po: "PO-20260426-001",
    supplier: "Kiambu Farms",
    products: ["Kunde", "Saga"],
    status: "Closed",
    totalCost: "KES 15,300",
    date: "2 days ago",
  },
];

const alerts = [
  {
    type: "warning",
    message: "PO-20260428-001: Kunde received 15kg vs 18kg sourced (16.7% variance)",
    time: "2 hours ago",
  },
  {
    type: "error",
    message: "Zoho sync failed: 3 unmatched SKUs require review",
    time: "4 hours ago",
  },
  {
    type: "info",
    message: "PO-20260427-003: Packaging complete, 240 punnets ready",
    time: "5 hours ago",
  },
];

const statusColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Confirmed: "bg-violet/20 text-violet border border-violet/30",
  "In Production": "bg-amber/20 text-amber border border-amber/30",
  Packaging: "bg-blue/20 text-blue border border-blue/30",
  "Ready for Sale": "bg-emerald/20 text-emerald border border-emerald/30",
  Closed: "bg-muted text-muted-foreground",
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Operations overview for April 28, 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Zoho
          </Button>
          <Button
            size="sm"
            className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90"
          >
            + New Product Order
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {kpi.value}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-emerald" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-emerald" />
                    )}
                    <span
                      className={`text-xs ${
                        kpi.trend === "up" ? "text-emerald" : "text-emerald"
                      }`}
                    >
                      {kpi.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {kpi.description}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    kpi.color === "emerald"
                      ? "bg-emerald/10 text-emerald"
                      : "bg-amber/10 text-amber"
                  }`}
                >
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Overview & Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pipeline Kanban */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Batch Pipeline
            </CardTitle>
            <Link
              href="/sourcing"
              className="flex items-center gap-1 text-sm text-green-link hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {pipelineStages.map((stage) => (
                <div
                  key={stage.name}
                  className="flex-1 rounded-lg border border-border bg-background p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                    <span className="text-xs font-medium text-muted-foreground">
                      {stage.name}
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-foreground">
                    {stage.count}
                  </p>
                  <p className="text-xs text-muted-foreground">batches</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Alerts & Exceptions
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {alerts.length} active
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 ${
                  alert.type === "error"
                    ? "border-crimson/30 bg-crimson/5"
                    : alert.type === "warning"
                    ? "border-amber/30 bg-amber/5"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex items-start gap-2">
                  {alert.type === "error" ? (
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-crimson" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-amber" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">
                      {alert.message}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Batches Table */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">
            Recent Product Orders
          </CardTitle>
          <Link
            href="/sourcing"
            className="flex items-center gap-1 text-sm text-green-link hover:underline"
          >
            View all POs <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    PO Number
                  </th>
                  <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Supplier
                  </th>
                  <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Products
                  </th>
                  <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Total Cost
                  </th>
                  <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentBatches.map((batch) => (
                  <tr
                    key={batch.po}
                    className="group hover:bg-muted/30 cursor-pointer"
                  >
                    <td className="py-3">
                      <span className="font-mono text-sm text-green-link">
                        {batch.po}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-foreground">
                      {batch.supplier}
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {batch.products.map((product) => (
                          <Badge
                            key={product}
                            variant="outline"
                            className="text-xs"
                          >
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge className={statusColors[batch.status]}>
                        {batch.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-mono text-sm text-gold-link">
                        {batch.totalCost}
                      </span>
                    </td>
                    <td className="py-3 text-right text-sm text-muted-foreground">
                      {batch.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Zoho Sync Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-emerald flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Connected
                </p>
                <p className="text-xs text-muted-foreground">
                  Last sync: 15 minutes ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                Sync Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inventory Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">
                  1,240 punnets
                </p>
                <p className="text-xs text-muted-foreground">
                  Across 8 active batches
                </p>
              </div>
              <Link
                href="/inventory"
                className="text-sm text-green-link hover:underline"
              >
                View
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Week&apos;s Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gold-link">
                  KES 312,450
                </p>
                <p className="text-xs text-muted-foreground">
                  Revenue from 42 batches
                </p>
              </div>
              <Link
                href="/reports"
                className="text-sm text-green-link hover:underline"
              >
                Details
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
