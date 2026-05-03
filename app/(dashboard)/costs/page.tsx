"use client";

import { useState } from "react";
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock cost catalogue data
const costCatalogue = [
  {
    id: 1,
    name: "Labour",
    description: "Production staff wages per punnet",
    ratePerPunnet: 8.0,
    effectiveDate: "2026-01-01",
    active: true,
  },
  {
    id: 2,
    name: "Electricity",
    description: "Power costs for processing and cold storage",
    ratePerPunnet: 3.5,
    effectiveDate: "2026-01-01",
    active: true,
  },
  {
    id: 3,
    name: "Packaging Materials",
    description: "Punnet containers, labels, and seals",
    ratePerPunnet: 12.0,
    effectiveDate: "2026-03-15",
    active: true,
  },
  {
    id: 4,
    name: "Delivery/Transport",
    description: "Logistics and distribution costs",
    ratePerPunnet: 5.0,
    effectiveDate: "2026-01-01",
    active: true,
  },
  {
    id: 5,
    name: "Quality Control",
    description: "Testing and inspection costs",
    ratePerPunnet: 2.0,
    effectiveDate: "2026-02-01",
    active: true,
  },
  {
    id: 6,
    name: "Cold Storage",
    description: "Refrigeration and storage fees (deprecated)",
    ratePerPunnet: 4.0,
    effectiveDate: "2025-06-01",
    active: false,
  },
];

// Mock batch cost data
const batchCosts = [
  {
    po: "PO-20260427-003",
    product: "Terere",
    punnets: 107,
    sourcingCost: 3600,
    sourcingCostPerPunnet: 33.64,
    productionCosts: {
      Labour: 856,
      Electricity: 374.5,
      "Packaging Materials": 1284,
      "Delivery/Transport": 535,
      "Quality Control": 214,
    },
    totalProductionCost: 3263.5,
    totalCOGS: 6863.5,
    unitCostPerPunnet: 64.14,
    sellingPricePerPunnet: 150,
    contributionMargin: 85.86,
    contributionMarginPercent: 57.24,
    hasOverride: false,
  },
  {
    po: "PO-20260427-003",
    product: "Mrenda",
    punnets: 92,
    sourcingCost: 5000,
    sourcingCostPerPunnet: 54.35,
    productionCosts: {
      Labour: 736,
      Electricity: 322,
      "Packaging Materials": 1104,
      "Delivery/Transport": 460,
      "Quality Control": 184,
    },
    totalProductionCost: 2806,
    totalCOGS: 7806,
    unitCostPerPunnet: 84.85,
    sellingPricePerPunnet: 180,
    contributionMargin: 95.15,
    contributionMarginPercent: 52.86,
    hasOverride: false,
  },
  {
    po: "PO-20260427-003",
    product: "Sukuma",
    punnets: 142,
    sourcingCost: 4000,
    sourcingCostPerPunnet: 28.17,
    productionCosts: {
      Labour: 1136,
      Electricity: 497,
      "Packaging Materials": 1704,
      "Delivery/Transport": 710,
      "Quality Control": 284,
    },
    totalProductionCost: 4331,
    totalCOGS: 8331,
    unitCostPerPunnet: 58.67,
    sellingPricePerPunnet: 100,
    contributionMargin: 41.33,
    contributionMarginPercent: 41.33,
    hasOverride: true,
  },
];

export default function CostsPage() {
  const [isAddCostOpen, setIsAddCostOpen] = useState(false);
  const [newCostType, setNewCostType] = useState({
    name: "",
    description: "",
    ratePerPunnet: 0,
  });

  const totalProductionRate = costCatalogue
    .filter((c) => c.active)
    .reduce((sum, c) => sum + c.ratePerPunnet, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Cost Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Cost catalogue and batch cost tracking
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="catalogue" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="catalogue" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Cost Catalogue
          </TabsTrigger>
          <TabsTrigger value="batches" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Batch Costs
          </TabsTrigger>
        </TabsList>

        {/* Cost Catalogue Tab */}
        <TabsContent value="catalogue" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {costCatalogue.filter((c) => c.active).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Cost Types</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-link/10">
                  <DollarSign className="h-5 w-5 text-gold-link" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gold-link">
                    KES {totalProductionRate.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Rate / Punnet
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {costCatalogue.filter((c) => !c.active).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Catalogue Table */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                Production Cost Types
              </CardTitle>
              <Dialog open={isAddCostOpen} onOpenChange={setIsAddCostOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Cost Type
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Add New Cost Type</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Cost Type Name
                      </label>
                      <Input
                        placeholder="e.g., Maintenance"
                        value={newCostType.name}
                        onChange={(e) =>
                          setNewCostType({ ...newCostType, name: e.target.value })
                        }
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Description
                      </label>
                      <Input
                        placeholder="Brief description of this cost"
                        value={newCostType.description}
                        onChange={(e) =>
                          setNewCostType({
                            ...newCostType,
                            description: e.target.value,
                          })
                        }
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Rate per Punnet (KES)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newCostType.ratePerPunnet || ""}
                        onChange={(e) =>
                          setNewCostType({
                            ...newCostType,
                            ratePerPunnet: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddCostOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90">
                        Add Cost Type
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Cost Type
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Description
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Rate / Punnet
                      </th>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Effective Date
                      </th>
                      <th className="py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Active
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {costCatalogue.map((cost) => (
                      <tr
                        key={cost.id}
                        className={`hover:bg-muted/30 ${
                          !cost.active ? "opacity-50" : ""
                        }`}
                      >
                        <td className="py-3">
                          <span className="text-sm font-medium text-foreground">
                            {cost.name}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground max-w-xs">
                          {cost.description}
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-mono text-sm text-gold-link">
                            KES {cost.ratePerPunnet.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {cost.effectiveDate}
                        </td>
                        <td className="py-3 text-center">
                          <Switch checked={cost.active} />
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-crimson hover:text-crimson"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Batch Costs Tab */}
        <TabsContent value="batches" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Batch Cost Breakdown - PO-20260427-003
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {batchCosts.map((batch) => (
                <div
                  key={`${batch.po}-${batch.product}`}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-medium text-foreground">
                        {batch.product}
                      </span>
                      <Badge variant="outline">{batch.punnets} punnets</Badge>
                      {batch.hasOverride && (
                        <Badge className="bg-amber/20 text-amber border border-amber/30">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Override
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-semibold ${
                          batch.contributionMarginPercent > 50
                            ? "text-emerald"
                            : batch.contributionMarginPercent > 30
                            ? "text-amber"
                            : "text-crimson"
                        }`}
                      >
                        {batch.contributionMarginPercent.toFixed(1)}% margin
                      </p>
                      <p className="text-xs text-muted-foreground">
                        KES {batch.contributionMargin.toFixed(2)} / punnet
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Sourcing Cost
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        KES {batch.sourcingCost.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        KES {batch.sourcingCostPerPunnet.toFixed(2)} / punnet
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Production Cost
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        KES {batch.totalProductionCost.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        KES {totalProductionRate.toFixed(2)} / punnet
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber/10 border border-amber/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Total COGS
                      </p>
                      <p className="text-lg font-semibold text-amber">
                        KES {batch.totalCOGS.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        KES {batch.unitCostPerPunnet.toFixed(2)} / punnet
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald/10 border border-emerald/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Selling Price
                      </p>
                      <p className="text-lg font-semibold text-emerald">
                        KES {batch.sellingPricePerPunnet}
                      </p>
                      <p className="text-xs text-muted-foreground">/ punnet</p>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      Production Cost Breakdown
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(batch.productionCosts).map(
                        ([type, amount]) => (
                          <div
                            key={type}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm"
                          >
                            <span className="text-muted-foreground">{type}:</span>
                            <span className="font-mono text-gold-link">
                              KES {amount.toLocaleString()}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Unit Cost Comparison */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Unit Cost Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Product
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Sourcing / Punnet
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Production / Punnet
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Total COGS / Punnet
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Selling Price
                      </th>
                      <th className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Margin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {batchCosts.map((batch) => (
                      <tr
                        key={`${batch.po}-${batch.product}`}
                        className="hover:bg-muted/30"
                      >
                        <td className="py-3 text-sm font-medium text-foreground">
                          {batch.product}
                        </td>
                        <td className="py-3 text-right font-mono text-sm text-foreground">
                          KES {batch.sourcingCostPerPunnet.toFixed(2)}
                        </td>
                        <td className="py-3 text-right font-mono text-sm text-foreground">
                          KES {totalProductionRate.toFixed(2)}
                        </td>
                        <td className="py-3 text-right font-mono text-sm text-amber">
                          KES {batch.unitCostPerPunnet.toFixed(2)}
                        </td>
                        <td className="py-3 text-right font-mono text-sm text-foreground">
                          KES {batch.sellingPricePerPunnet.toFixed(2)}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`font-mono text-sm font-medium ${
                              batch.contributionMarginPercent > 50
                                ? "text-emerald"
                                : batch.contributionMarginPercent > 30
                                ? "text-amber"
                                : "text-crimson"
                            }`}
                          >
                            {batch.contributionMarginPercent.toFixed(1)}%
                          </span>
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
