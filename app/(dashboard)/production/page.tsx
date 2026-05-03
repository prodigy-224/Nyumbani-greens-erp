"use client";

import { useState } from "react";
import {
  Scale,
  Star,
  Scissors,
  Package,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  Clock,
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

// Mock production data
const productionBatches = [
  {
    id: "PO-20260428-001",
    supplier: "Kiambu Farms",
    status: "Processing",
    stage: 2,
    lineItems: [
      {
        product: "Kunde",
        sourcedKg: 25,
        receivedKg: 23.5,
        variance: -6,
        grade: "Good",
        preProcessKg: 23.5,
        postProcessKg: 21.2,
        wastage: 9.8,
        punnets: 0,
        punnetWeight: 250,
      },
      {
        product: "Managu",
        sourcedKg: 20,
        receivedKg: 19.8,
        variance: -1,
        grade: "Excellent",
        preProcessKg: 19.8,
        postProcessKg: 18.5,
        wastage: 6.6,
        punnets: 0,
        punnetWeight: 250,
      },
    ],
  },
  {
    id: "PO-20260427-003",
    supplier: "Thika Greens",
    status: "Packaging",
    stage: 3,
    lineItems: [
      {
        product: "Terere",
        sourcedKg: 30,
        receivedKg: 29.5,
        variance: -1.7,
        grade: "Good",
        preProcessKg: 29.5,
        postProcessKg: 26.8,
        wastage: 9.2,
        punnets: 107,
        punnetWeight: 250,
      },
      {
        product: "Mrenda",
        sourcedKg: 25,
        receivedKg: 24.8,
        variance: -0.8,
        grade: "Excellent",
        preProcessKg: 24.8,
        postProcessKg: 23.1,
        wastage: 6.9,
        punnets: 92,
        punnetWeight: 250,
      },
      {
        product: "Sukuma",
        sourcedKg: 40,
        receivedKg: 39.2,
        variance: -2,
        grade: "Good",
        preProcessKg: 39.2,
        postProcessKg: 35.5,
        wastage: 9.4,
        punnets: 142,
        punnetWeight: 250,
      },
    ],
  },
  {
    id: "PO-20260428-003",
    supplier: "Meru Highlands",
    status: "Intake",
    stage: 0,
    lineItems: [
      {
        product: "Managu",
        sourcedKg: 40,
        receivedKg: 0,
        variance: 0,
        grade: null,
        preProcessKg: 0,
        postProcessKg: 0,
        wastage: 0,
        punnets: 0,
        punnetWeight: 250,
      },
    ],
  },
];

const stages = [
  { name: "Intake", icon: Scale, description: "Verify received weight" },
  { name: "Grading", icon: Star, description: "Assess quality" },
  { name: "Processing", icon: Scissors, description: "Clean & prepare" },
  { name: "Packaging", icon: Package, description: "Pack into punnets" },
];

const gradeColors: Record<string, string> = {
  Excellent: "bg-emerald/20 text-emerald border border-emerald/30",
  Good: "bg-blue/20 text-blue border border-blue/30",
  Bad: "bg-crimson/20 text-crimson border border-crimson/30",
};

export default function ProductionPage() {
  const [selectedBatch, setSelectedBatch] = useState<typeof productionBatches[0] | null>(null);
  const [currentBatch, setCurrentBatch] = useState<typeof productionBatches[0] | null>(null);
  
  // State for each stage's form data per line item
  const [intakeData, setIntakeData] = useState<Record<string, { receivedKg: number; variance: number }>({});
  const [gradeData, setGradeData] = useState<Record<string, string>>({});
  const [processingData, setProcessingData] = useState<Record<string, { preProcessKg: number; postProcessKg: number; wastage: number; wastagePercent: number }>>({});
  const [packagingData, setPackagingData] = useState<Record<string, { punnets: number; punnetWeight: number }>>({});

  const getStageStatus = (batchStage: number, stageIndex: number) => {
    if (stageIndex < batchStage) return "complete";
    if (stageIndex === batchStage) return "current";
    return "pending";
  };

  const handleOpenBatch = (batch: typeof productionBatches[0]) => {
    setSelectedBatch(batch);
    setCurrentBatch(JSON.parse(JSON.stringify(batch))); // Deep copy to preserve original state
  };

  const handleAdvanceStage = () => {
    if (!currentBatch) return;
    
    // Advance the stage
    const newBatch = { ...currentBatch, stage: currentBatch.stage + 1 };
    setCurrentBatch(newBatch);
  };

  const getLineItemKey = (lineItem: string) => {
    return currentBatch ? `${currentBatch.id}-${lineItem}` : '';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Production</h1>
          <p className="text-sm text-muted-foreground">
            Intake, grading, processing, and packaging
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-amber border-amber/30">
            <Clock className="mr-1 h-3 w-3" />
            {productionBatches.length} batches in production
          </Badge>
        </div>
      </div>

      {/* Production Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10">
              <Scale className="h-5 w-5 text-violet" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Awaiting Intake</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10">
              <Scissors className="h-5 w-5 text-amber" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
              <Package className="h-5 w-5 text-blue" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Packaging</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10">
              <TrendingDown className="h-5 w-5 text-emerald" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">8.4%</p>
              <p className="text-sm text-muted-foreground">Avg Wastage</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Queue */}
      <div className="space-y-4">
        {productionBatches.map((batch) => (
          <Card
            key={batch.id}
            className="border-border bg-card hover:border-green-border transition-colors cursor-pointer"
            onClick={() => handleOpenBatch(batch)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-green-link">
                      {batch.id}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {batch.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {batch.supplier} • {batch.lineItems.length} product(s)
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Pipeline Progress */}
              <div className="flex items-center gap-2 mb-4">
                {stages.map((stage, index) => {
                  const status = getStageStatus(batch.stage, index);
                  return (
                    <div key={stage.name} className="flex items-center flex-1">
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full ${
                          status === "complete"
                            ? "bg-emerald text-white"
                            : status === "current"
                            ? "bg-amber text-white animate-pulse"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {status === "complete" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <stage.icon className="h-4 w-4" />
                        )}
                      </div>
                      {index < stages.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-2 rounded ${
                            status === "complete" ? "bg-emerald" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Line Items Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {batch.lineItems.map((item) => (
                  <div
                    key={item.product}
                    className="rounded-lg border border-border bg-background p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {item.product}
                      </span>
                      {item.grade && (
                        <Badge className={gradeColors[item.grade]}>
                          {item.grade}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Sourced:</span>
                        <span className="text-foreground">{item.sourcedKg} kg</span>
                      </div>
                      {item.receivedKg > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span>Received:</span>
                            <span
                              className={
                                Math.abs(item.variance) > 5
                                  ? "text-crimson"
                                  : "text-foreground"
                              }
                            >
                              {item.receivedKg} kg
                              {item.variance !== 0 && (
                                <span className="ml-1">
                                  ({item.variance > 0 ? "+" : ""}
                                  {item.variance.toFixed(1)}%)
                                </span>
                              )}
                            </span>
                          </div>
                          {item.postProcessKg > 0 && (
                            <div className="flex justify-between">
                              <span>Wastage:</span>
                              <span
                                className={
                                  item.wastage > 10 ? "text-amber" : "text-emerald"
                                }
                              >
                                {item.wastage.toFixed(1)}%
                              </span>
                            </div>
                          )}
                          {item.punnets > 0 && (
                            <div className="flex justify-between">
                              <span>Punnets:</span>
                              <span className="text-gold-link font-medium">
                                {item.punnets}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Batch Detail Modal */}
      {currentBatch && (
        <Dialog open={!!currentBatch} onOpenChange={() => setCurrentBatch(null)}>
          <DialogContent className="max-w-4xl bg-card border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle className="font-mono text-green-link">
                  {currentBatch.id}
                </DialogTitle>
                <Badge variant="outline">{stages[currentBatch.stage].name}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentBatch.supplier}
              </p>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Stage Progress */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                {stages.map((stage, index) => {
                  const status = getStageStatus(currentBatch.stage, index);
                  return (
                    <div key={stage.name} className="flex flex-col items-center flex-1">
                      <div
                        className={`flex items-center justify-center h-12 w-12 rounded-full mb-2 ${
                          status === "complete"
                            ? "bg-emerald text-white"
                            : status === "current"
                            ? "bg-amber text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <stage.icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          status === "current" ? "text-amber" : "text-foreground"
                        }`}
                      >
                        {stage.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stage.description}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Line Items Detail */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Line Items
                </h3>
                {currentBatch.lineItems.map((item, index) => {
                  const key = getLineItemKey(item.product);
                  const currentIntake = intakeData[key];
                  const currentGrade = gradeData[key];
                  const currentProcessing = processingData[key];
                  const currentPackaging = packagingData[key];

                  return (
                    <div
                      key={item.product}
                      className="rounded-lg border border-border bg-background p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium text-foreground">
                            {item.product}
                          </span>
                          {currentBatch.stage > 1 && item.grade && (
                            <Badge className={gradeColors[item.grade]}>
                              {item.grade}
                            </Badge>
                          )}
                        </div>
                        {currentIntake && Math.abs(currentIntake.variance) > 5 && (
                          <Badge className="bg-crimson/20 text-crimson border border-crimson/30">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            High Variance
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* INTAKE STAGE */}
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Sourced Weight
                          </label>
                          <p className="text-lg font-semibold text-foreground">
                            {item.sourcedKg} kg
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Received Weight
                          </label>
                          {currentBatch.stage === 0 ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="0.0"
                                  className="bg-input border-border text-right flex-1"
                                  value={currentIntake?.receivedKg ?? ""}
                                  onChange={(e) => {
                                    const receivedKg = parseFloat(e.target.value) || 0;
                                    const variance = ((receivedKg - item.sourcedKg) / item.sourcedKg) * 100;
                                    setIntakeData({
                                      ...intakeData,
                                      [key]: { receivedKg, variance: parseFloat(variance.toFixed(1)) },
                                    });
                                  }}
                                />
                                <span className="text-sm text-muted-foreground">kg</span>
                              </div>
                              {currentIntake && (
                                <p className={`text-xs font-medium ${
                                  Math.abs(currentIntake.variance) > 5 ? "text-crimson" : "text-emerald"
                                }`}>
                                  {currentIntake.variance > 0 ? "+" : ""}{currentIntake.variance.toFixed(1)}%
                                </p>
                              )}
                            </div>
                          ) : (
                            <p
                              className={`text-lg font-semibold ${
                                currentIntake && Math.abs(currentIntake.variance) > 5
                                  ? "text-crimson"
                                  : "text-foreground"
                              }`}
                            >
                              {currentIntake?.receivedKg ?? item.receivedKg} kg
                              {currentIntake && currentIntake.variance !== 0 && (
                                <span className="text-sm ml-1">
                                  ({currentIntake.variance > 0 ? "+" : ""}
                                  {currentIntake.variance.toFixed(1)}%)
                                </span>
                              )}
                            </p>
                          )}
                        </div>

                        {/* GRADING STAGE */}
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Grade
                          </label>
                          {currentBatch.stage === 1 ? (
                            <div className="flex gap-2">
                              {["Bad", "Good", "Excellent"].map((grade) => (
                                <button
                                  key={grade}
                                  onClick={() =>
                                    setGradeData({
                                      ...gradeData,
                                      [key]: grade,
                                    })
                                  }
                                  className={`flex-1 px-2 py-2 text-xs font-medium rounded transition-all ${
                                    currentGrade === grade
                                      ? gradeColors[grade]
                                      : "bg-muted text-muted-foreground hover:bg-muted/70 active:scale-95"
                                  }`}
                                >
                                  {grade}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <>
                              {currentGrade ? (
                                <Badge className={gradeColors[currentGrade]}>
                                  {currentGrade}
                                </Badge>
                              ) : item.grade ? (
                                <Badge className={gradeColors[item.grade]}>
                                  {item.grade}
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </>
                          )}
                        </div>

                        {/* PROCESSING STAGE */}
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Wastage
                          </label>
                          {currentBatch.stage === 2 ? (
                            <div className="text-sm font-medium text-amber">
                              {currentProcessing ? `${currentProcessing.wastagePercent.toFixed(1)}%` : "—"}
                            </div>
                          ) : (
                            <p
                              className={`text-lg font-semibold ${
                                currentProcessing && currentProcessing.wastagePercent > 10
                                  ? "text-amber"
                                  : "text-emerald"
                              }`}
                            >
                              {currentProcessing?.wastagePercent.toFixed(1) ?? item.wastage.toFixed(1)}%
                            </p>
                          )}
                        </div>
                      </div>

                      {/* PROCESSING DETAILS */}
                      {currentBatch.stage >= 2 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          {currentBatch.stage === 2 ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                  Pre-process kg
                                </label>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    className="bg-input border-border text-right flex-1"
                                    value={currentProcessing?.preProcessKg ?? ""}
                                    onChange={(e) => {
                                      const preProcessKg = parseFloat(e.target.value) || 0;
                                      const postProcessKg = currentProcessing?.postProcessKg ?? 0;
                                      const wastage = preProcessKg - postProcessKg;
                                      const wastagePercent = preProcessKg > 0 ? (wastage / preProcessKg) * 100 : 0;
                                      setProcessingData({
                                        ...processingData,
                                        [key]: {
                                          preProcessKg,
                                          postProcessKg,
                                          wastage: parseFloat(wastage.toFixed(1)),
                                          wastagePercent: parseFloat(wastagePercent.toFixed(1)),
                                        },
                                      });
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">kg</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                  Post-process kg
                                </label>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    className="bg-input border-border text-right flex-1"
                                    value={currentProcessing?.postProcessKg ?? ""}
                                    onChange={(e) => {
                                      const postProcessKg = parseFloat(e.target.value) || 0;
                                      const preProcessKg = currentProcessing?.preProcessKg ?? 0;
                                      const wastage = preProcessKg - postProcessKg;
                                      const wastagePercent = preProcessKg > 0 ? (wastage / preProcessKg) * 100 : 0;
                                      setProcessingData({
                                        ...processingData,
                                        [key]: {
                                          preProcessKg,
                                          postProcessKg,
                                          wastage: parseFloat(wastage.toFixed(1)),
                                          wastagePercent: parseFloat(wastagePercent.toFixed(1)),
                                        },
                                      });
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">kg</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Pre-process:</span>
                                <span className="ml-2 text-foreground font-medium">
                                  {currentProcessing?.preProcessKg ?? item.preProcessKg} kg
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Post-process:</span>
                                <span className="ml-2 text-foreground font-medium">
                                  {currentProcessing?.postProcessKg ?? item.postProcessKg} kg
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Lost:</span>
                                <span className="ml-2 text-amber font-medium">
                                  {currentProcessing?.wastage ?? (item.preProcessKg - item.postProcessKg).toFixed(1)} kg
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* PACKAGING DETAILS */}
                      {currentBatch.stage >= 3 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          {currentBatch.stage === 3 ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                  Punnet Count
                                </label>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    step="1"
                                    placeholder="0"
                                    className="bg-input border-border text-right flex-1"
                                    value={currentPackaging?.punnets ?? ""}
                                    onChange={(e) =>
                                      setPackagingData({
                                        ...packagingData,
                                        [key]: {
                                          punnets: parseInt(e.target.value) || 0,
                                          punnetWeight: currentPackaging?.punnetWeight ?? 250,
                                        },
                                      })
                                    }
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                                  Standard Punnet Weight (g)
                                </label>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    step="10"
                                    placeholder="250"
                                    className="bg-input border-border text-right flex-1"
                                    value={currentPackaging?.punnetWeight ?? item.punnetWeight}
                                    onChange={(e) =>
                                      setPackagingData({
                                        ...packagingData,
                                        [key]: {
                                          punnets: currentPackaging?.punnets ?? 0,
                                          punnetWeight: parseInt(e.target.value) || 250,
                                        },
                                      })
                                    }
                                  />
                                  <span className="text-sm text-muted-foreground">g</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Punnets:</span>
                                <span className="ml-2 text-gold-link font-medium">
                                  {currentPackaging?.punnets ?? item.punnets}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Punnet Weight:</span>
                                <span className="ml-2 text-foreground font-medium">
                                  {currentPackaging?.punnetWeight ?? item.punnetWeight}g
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setCurrentBatch(null)}>
                  Close
                </Button>
                {currentBatch.stage < 3 && (
                  <Button 
                    className="bg-nyumbani-green text-white hover:bg-nyumbani-green/90 active:scale-95 transition-all"
                    onClick={handleAdvanceStage}
                  >
                    Complete {stages[currentBatch.stage].name}
                  </Button>
                )}
                {currentBatch.stage === 3 && (
                  <Button 
                    className="bg-emerald text-white hover:bg-emerald/90 active:scale-95 transition-all"
                    disabled
                  >
                    Batch Complete
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
