"use client";

import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  TrendingDown,
  ArrowUpRight,
  Plus,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import inventoryData from "@/data/inventory.json";

const inventoryItems = inventoryData.inventoryItems;

const shrinkageReasons = ["Damaged", "Expired", "Quality Reject", "Other"];

const freshnessColors: Record<string, string> = {
  Fresh: "bg-emerald/20 text-emerald border border-emerald/30",
  Good: "bg-blue/20 text-blue border border-blue/30",
  Monitor: "bg-amber/20 text-amber border border-amber/30",
  Critical: "bg-crimson/20 text-crimson border border-crimson/30",
};

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [shrinkageDialog, setShrinkageDialog] = useState<{
    product: string;
    po: string;
  } | null>(null);
  const [shrinkageForm, setShrinkageForm] = useState({
    punnets: 0,
    reason: "",
  });

  const totalPunnets = inventoryItems.reduce(
    (sum, item) => sum + item.totalRemaining,
    0,
  );

  const totalBatches = inventoryItems.reduce(
    (sum, item) => sum + item.batches.length,
    0,
  );

  const avgShrinkage =
    inventoryItems.reduce(
      (sum, item) =>
        sum +
        item.batches.reduce((bSum, b) => bSum + b.shrinkage, 0) /
          item.batches.length,
      0,
    ) / inventoryItems.length;

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.product
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesProduct =
      productFilter === "all" || item.product === productFilter;
    return matchesSearch && matchesProduct;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Punnet inventory by product and batch
          </p>
        </div>
        <Button className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Issue to Zoho
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10">
              <Package className="h-5 w-5 text-emerald" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {totalPunnets}
              </p>
              <p className="text-sm text-muted-foreground">Total Punnets</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10">
              <Package className="h-5 w-5 text-violet" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {totalBatches}
              </p>
              <p className="text-sm text-muted-foreground">Active Batches</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10">
              <TrendingDown className="h-5 w-5 text-amber" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {avgShrinkage.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Shrinkage</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10">
              <AlertTriangle className="h-5 w-5 text-crimson" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Needs Attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-input border-border"
          />
        </div>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger className="w-44 bg-input border-border">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {inventoryItems.map((item) => (
              <SelectItem key={item.product} value={item.product}>
                {item.product}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.product} className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  {item.product}
                </CardTitle>
                <Badge className={freshnessColors[item.freshness]}>
                  {item.freshness}
                </Badge>
              </div>
              <p className="text-2xl font-semibold text-gold-link">
                {item.totalRemaining}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  punnets
                </span>
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {item.batches.map((batch) => (
                <div
                  key={batch.po}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-green-link">
                      {batch.po}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {batch.daysSinceIntake === 0
                        ? "Today"
                        : `${batch.daysSinceIntake}d ago`}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Stock Level</span>
                      <span className="text-foreground">
                        {batch.punnetsRemaining} / {batch.punnetsPacked}
                      </span>
                    </div>
                    <Progress
                      value={
                        (batch.punnetsRemaining / batch.punnetsPacked) * 100
                      }
                      className="h-2"
                    />

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-xs">
                      <div>
                        <p className="text-muted-foreground">Issued</p>
                        <p className="text-foreground font-medium">
                          {batch.punnetsIssued}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Sold</p>
                        <p className="text-emerald font-medium">
                          {batch.punnetsSold}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Shrinkage</p>
                        <p
                          className={`font-medium ${
                            batch.shrinkage > 3 ? "text-crimson" : "text-amber"
                          }`}
                        >
                          {batch.shrinkage}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-2 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() =>
                        setShrinkageDialog({
                          product: item.product,
                          po: batch.po,
                        })
                      }
                    >
                      Record Shrinkage
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 text-xs bg-nyumbani-green text-white hover:bg-nyumbani-green/90"
                    >
                      Issue to Zoho
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Shrinkage Dialog */}
      {shrinkageDialog && (
        <Dialog
          open={!!shrinkageDialog}
          onOpenChange={() => setShrinkageDialog(null)}
        >
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Record Shrinkage</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Product</p>
                  <p className="font-medium text-foreground">
                    {shrinkageDialog.product}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Batch</p>
                  <p className="font-mono text-green-link">
                    {shrinkageDialog.po}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Number of Punnets
                </label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={shrinkageForm.punnets || ""}
                  onChange={(e) =>
                    setShrinkageForm({
                      ...shrinkageForm,
                      punnets: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Reason
                </label>
                <Select
                  value={shrinkageForm.reason}
                  onValueChange={(value) =>
                    setShrinkageForm({ ...shrinkageForm, reason: value })
                  }
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {shrinkageReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShrinkageDialog(null)}
                >
                  Cancel
                </Button>
                <Button className="bg-crimson text-white hover:bg-crimson/90">
                  Record Shrinkage
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
