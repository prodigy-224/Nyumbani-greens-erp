"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  ChevronDown,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const productOrders = [
  {
    id: "PO-20260428-001",
    supplier: "Kiambu Farms",
    date: "2026-04-28",
    status: "In Production",
    lineItems: [
      { product: "Kunde", kg: 25, pricePerKg: 150, total: 3750 },
      { product: "Managu", kg: 20, pricePerKg: 180, total: 3600 },
    ],
    totalCost: 7350,
    paymentStatus: "Paid",
    location: "Kiambu County",
  },
  {
    id: "PO-20260427-003",
    supplier: "Thika Greens",
    date: "2026-04-27",
    status: "Packaging",
    lineItems: [
      { product: "Terere", kg: 30, pricePerKg: 120, total: 3600 },
      { product: "Mrenda", kg: 25, pricePerKg: 200, total: 5000 },
      { product: "Sukuma", kg: 40, pricePerKg: 100, total: 4000 },
    ],
    totalCost: 12600,
    paymentStatus: "Paid",
    location: "Thika Town",
  },
  {
    id: "PO-20260427-002",
    supplier: "Limuru Organics",
    date: "2026-04-27",
    status: "Ready for Sale",
    lineItems: [{ product: "Spinach", kg: 35, pricePerKg: 250, total: 8750 }],
    totalCost: 8750,
    paymentStatus: "Paid",
    location: "Limuru",
  },
  {
    id: "PO-20260426-001",
    supplier: "Kiambu Farms",
    date: "2026-04-26",
    status: "Closed",
    lineItems: [
      { product: "Kunde", kg: 30, pricePerKg: 150, total: 4500 },
      { product: "Saga", kg: 25, pricePerKg: 220, total: 5500 },
    ],
    totalCost: 10000,
    paymentStatus: "Paid",
    location: "Kiambu County",
  },
  {
    id: "PO-20260428-002",
    supplier: "Naivasha Gardens",
    date: "2026-04-28",
    status: "Draft",
    lineItems: [
      { product: "Kale", kg: 50, pricePerKg: 80, total: 4000 },
      { product: "Cabbage", kg: 30, pricePerKg: 60, total: 1800 },
    ],
    totalCost: 5800,
    paymentStatus: "Pending",
    location: "Naivasha",
  },
  {
    id: "PO-20260428-003",
    supplier: "Meru Highlands",
    date: "2026-04-28",
    status: "Confirmed",
    lineItems: [
      { product: "Managu", kg: 40, pricePerKg: 175, total: 7000 },
    ],
    totalCost: 7000,
    paymentStatus: "Pending",
    location: "Meru County",
  },
];

const statusColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Confirmed: "bg-violet/20 text-violet border border-violet/30",
  Paid: "bg-blue/20 text-blue border border-blue/30",
  "In Production": "bg-amber/20 text-amber border border-amber/30",
  Packaging: "bg-purple/20 text-purple border border-purple/30",
  "Ready for Sale": "bg-emerald/20 text-emerald border border-emerald/30",
  Closed: "bg-muted text-muted-foreground",
};

const paymentColors: Record<string, string> = {
  Paid: "bg-emerald/20 text-emerald border border-emerald/30",
  Pending: "bg-amber/20 text-amber border border-amber/30",
};

const products = ["Kunde", "Managu", "Terere", "Mrenda", "Sukuma", "Spinach", "Saga", "Kale", "Cabbage"];

export default function SourcingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<typeof productOrders[0] | null>(null);
  const [createdPOs, setCreatedPOs] = useState<typeof productOrders>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // New PO form state
  const [newPO, setNewPO] = useState({
    supplier: "",
    location: "",
    lineItems: [{ product: "", kg: 0, pricePerKg: 0 }],
  });

  const allPOs = [...productOrders, ...createdPOs];

  const filteredOrders = allPOs.filter((po) => {
    const matchesSearch =
      po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allPOs.length,
    draft: allPOs.filter((po) => po.status === "Draft").length,
    active: allPOs.filter((po) => !["Draft", "Closed"].includes(po.status)).length,
    totalValue: allPOs.reduce((sum, po) => sum + po.totalCost, 0),
  };

  const addLineItem = () => {
    setNewPO({
      ...newPO,
      lineItems: [...newPO.lineItems, { product: "", kg: 0, pricePerKg: 0 }],
    });
  };

  const removeLineItem = (index: number) => {
    setNewPO({
      ...newPO,
      lineItems: newPO.lineItems.filter((_, i) => i !== index),
    });
  };

  const updateLineItem = (index: number, field: string, value: string | number) => {
    const updated = [...newPO.lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setNewPO({ ...newPO, lineItems: updated });
  };

  const calculateLineTotal = (kg: number, pricePerKg: number) => kg * pricePerKg;
  const calculatePOTotal = () =>
    newPO.lineItems.reduce((sum, item) => sum + calculateLineTotal(item.kg, item.pricePerKg), 0);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!newPO.supplier.trim()) {
      errors.supplier = "Supplier name is required";
    }
    if (!newPO.location.trim()) {
      errors.location = "Location is required";
    }
    
    const validLineItems = newPO.lineItems.filter(
      (item) => item.product && item.kg > 0 && item.pricePerKg > 0
    );
    
    if (validLineItems.length === 0) {
      errors.lineItems = "At least one valid line item is required (product, kg > 0, price > 0)";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAsDraft = () => {
    if (!validateForm()) return;

    const poNumber = `PO-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(allPOs.length + 1).padStart(3, "0")}`;
    const newPORecord = {
      id: poNumber,
      supplier: newPO.supplier,
      location: newPO.location,
      date: new Date().toISOString().slice(0, 10),
      status: "Draft",
      lineItems: newPO.lineItems.filter((item) => item.product && item.kg > 0 && item.pricePerKg > 0),
      totalCost: calculatePOTotal(),
      paymentStatus: "Pending",
    };

    setCreatedPOs([...createdPOs, newPORecord]);
    resetForm();
    setIsCreateOpen(false);
  };

  const handleConfirmPO = () => {
    if (!validateForm()) return;

    const poNumber = `PO-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(allPOs.length + 1).padStart(3, "0")}`;
    const newPORecord = {
      id: poNumber,
      supplier: newPO.supplier,
      location: newPO.location,
      date: new Date().toISOString().slice(0, 10),
      status: "Confirmed",
      lineItems: newPO.lineItems.filter((item) => item.product && item.kg > 0 && item.pricePerKg > 0),
      totalCost: calculatePOTotal(),
      paymentStatus: "Pending",
    };

    setCreatedPOs([...createdPOs, newPORecord]);
    resetForm();
    setIsCreateOpen(false);
  };

  const resetForm = () => {
    setNewPO({
      supplier: "",
      location: "",
      lineItems: [{ product: "", kg: 0, pricePerKg: 0 }],
    });
    setValidationErrors({});
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Sourcing</h1>
          <p className="text-sm text-muted-foreground">
            Manage product orders and supplier batches
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90">
              <Plus className="mr-2 h-4 w-4" />
              New Product Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle>Create New Product Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Validation Errors */}
              {Object.keys(validationErrors).length > 0 && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                  <p className="text-sm text-red-500 font-medium">Please fix the following errors:</p>
                  <ul className="text-sm text-red-500/80 mt-2 space-y-1">
                    {Object.entries(validationErrors).map(([key, error]) => (
                      <li key={key}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Supplier Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Supplier Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter supplier name"
                    value={newPO.supplier}
                    onChange={(e) => setNewPO({ ...newPO, supplier: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Sourcing location"
                    value={newPO.location}
                    onChange={(e) => setNewPO({ ...newPO, location: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Line Items <span className="text-red-500">*</span>
                  </label>
                  <Button variant="outline" size="sm" onClick={addLineItem} className="hover:bg-muted">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Product
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {newPO.lineItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background p-3"
                    >
                      <Select
                        value={item.product}
                        onValueChange={(value) => updateLineItem(index, "product", value)}
                      >
                        <SelectTrigger className="w-40 bg-input border-border">
                          <SelectValue placeholder="Product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          placeholder="0"
                          value={item.kg || ""}
                          onChange={(e) => updateLineItem(index, "kg", parseFloat(e.target.value) || 0)}
                          className="w-20 bg-input border-border"
                        />
                        <span className="text-sm text-muted-foreground">kg</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">@</span>
                        <Input
                          type="number"
                          placeholder="0"
                          value={item.pricePerKg || ""}
                          onChange={(e) => updateLineItem(index, "pricePerKg", parseFloat(e.target.value) || 0)}
                          className="w-24 bg-input border-border"
                        />
                        <span className="text-sm text-muted-foreground">/kg</span>
                      </div>
                      <div className="flex-1 text-right">
                        <span className="font-mono text-sm text-gold-link">
                          KES {calculateLineTotal(item.kg, item.pricePerKg).toLocaleString()}
                        </span>
                      </div>
                      {newPO.lineItems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-crimson"
                          onClick={() => removeLineItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Running Total */}
                <div className="flex items-center justify-between rounded-lg border border-green-border bg-accent p-3">
                  <span className="text-sm font-medium text-foreground">
                    Total PO Value
                  </span>
                  <span className="font-mono text-lg font-semibold text-gold-link">
                    KES {calculatePOTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    setIsCreateOpen(false);
                  }}
                  className="hover:bg-muted"
                >
                  Cancel
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleSaveAsDraft}
                  className="hover:bg-muted"
                >
                  Save as Draft
                </Button>
                <Button 
                  className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90 active:scale-95 transition-transform"
                  onClick={handleConfirmPO}
                >
                  Confirm & Lock PO
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total POs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10">
              <Clock className="h-5 w-5 text-violet" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.draft}</p>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10">
              <CheckCircle2 className="h-5 w-5 text-emerald" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.active}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10">
              <DollarSign className="h-5 w-5 text-amber" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gold-link">
                KES {stats.totalValue.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by PO number or supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-input border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44 bg-input border-border">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="In Production">In Production</SelectItem>
            <SelectItem value="Packaging">Packaging</SelectItem>
            <SelectItem value="Ready for Sale">Ready for Sale</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* PO Table */}
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    PO Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Supplier
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Products
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Total
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((po) => (
                  <tr
                    key={po.id}
                    className="group hover:bg-muted/30 cursor-pointer"
                    onClick={() => setSelectedPO(po)}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-green-link">
                        {po.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {po.supplier}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {po.location}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {po.lineItems.map((item) => (
                          <Badge
                            key={item.product}
                            variant="outline"
                            className="text-xs"
                          >
                            {item.product} ({item.kg}kg)
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={statusColors[po.status]}>
                        {po.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={paymentColors[po.paymentStatus]}>
                        {po.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm text-gold-link">
                        KES {po.totalCost.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                      {po.date}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-crimson">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* PO Detail Drawer */}
      {selectedPO && (
        <Dialog open={!!selectedPO} onOpenChange={() => setSelectedPO(null)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="font-mono text-green-link">
                  {selectedPO.id}
                </DialogTitle>
                <Badge className={statusColors[selectedPO.status]}>
                  {selectedPO.status}
                </Badge>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Supplier Info */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Supplier
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {selectedPO.supplier}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {selectedPO.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Date
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {selectedPO.date}
                  </p>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Line Items
                </p>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                          Product
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">
                          Quantity
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">
                          Price/kg
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {selectedPO.lineItems.map((item) => (
                        <tr key={item.product}>
                          <td className="px-3 py-2 text-sm text-foreground">
                            {item.product}
                          </td>
                          <td className="px-3 py-2 text-right text-sm text-foreground">
                            {item.kg} kg
                          </td>
                          <td className="px-3 py-2 text-right text-sm text-muted-foreground">
                            KES {item.pricePerKg}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-sm text-gold-link">
                            KES {item.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-muted/30">
                      <tr>
                        <td colSpan={3} className="px-3 py-2 text-sm font-medium text-foreground">
                          Total
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-sm font-semibold text-gold-link">
                          KES {selectedPO.totalCost.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline">
                  Edit PO
                </Button>
                {selectedPO.paymentStatus === "Pending" && (
                  <Button variant="outline" className="text-amber">
                    Mark as Paid
                  </Button>
                )}
                {selectedPO.status === "Draft" && (
                  <Button className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90">
                    Confirm & Lock
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
