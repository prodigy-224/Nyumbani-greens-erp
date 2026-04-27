import { Check, Circle, ArrowRight } from "lucide-react"

interface PipelineStage {
  name: string
  status: "completed" | "active" | "upcoming"
  date?: string
}

const stages: PipelineStage[] = [
  { name: "Draft", status: "completed", date: "Apr 25" },
  { name: "Confirmed", status: "completed", date: "Apr 25" },
  { name: "In Production", status: "active", date: "Apr 26" },
  { name: "Packaged", status: "upcoming" },
  { name: "Issued", status: "upcoming" },
  { name: "Sales Synced", status: "upcoming" },
  { name: "Closed", status: "upcoming" },
]

function StageIndicator({ status }: { status: PipelineStage["status"] }) {
  if (status === "completed") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nyumbani-green">
        <Check className="h-4 w-4 text-white" />
      </div>
    )
  }
  if (status === "active") {
    return (
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="absolute h-8 w-8 animate-ping rounded-full bg-nyumbani-green/30" />
        <div className="relative h-3 w-3 rounded-full bg-nyumbani-green" />
      </div>
    )
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border-prominent">
      <Circle className="h-3 w-3 text-text-dim" />
    </div>
  )
}

export function Pipeline() {
  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24" id="production">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[1.2px] text-text-muted">
            Production Module
          </span>
          <h2 className="mt-2 text-2xl font-normal text-text-primary lg:text-4xl">
            Batch Pipeline
          </h2>
          <p className="mt-3 text-base text-text-secondary">
            Track batch progression from sourcing through production to final sale.
          </p>
        </div>

        {/* Pipeline stepper */}
        <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="font-mono text-sm text-green-link">PO20260427-001</span>
              <p className="mt-1 text-sm text-text-secondary">Kiambu Fresh Farms</p>
            </div>
            <span className="rounded-full bg-[rgba(212,160,23,0.15)] px-3 py-1 text-xs font-medium text-gold-link">
              In Production
            </span>
          </div>

          {/* Horizontal pipeline */}
          <div className="hidden lg:block">
            <div className="flex items-center">
              {stages.map((stage, index) => (
                <div key={stage.name} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <StageIndicator status={stage.status} />
                    <span
                      className={`mt-3 text-xs font-medium ${
                        stage.status === "active"
                          ? "text-green-link"
                          : stage.status === "completed"
                          ? "text-text-primary"
                          : "text-text-muted"
                      }`}
                    >
                      {stage.name}
                    </span>
                    {stage.date && (
                      <span className="mt-1 text-[10px] text-text-dim">{stage.date}</span>
                    )}
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 flex-1 ${
                        stage.status === "completed" ? "bg-nyumbani-green" : "bg-border-prominent"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile pipeline - vertical */}
          <div className="space-y-4 lg:hidden">
            {stages.map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <StageIndicator status={stage.status} />
                  {index < stages.length - 1 && (
                    <div
                      className={`h-8 w-0.5 ${
                        stage.status === "completed" ? "bg-nyumbani-green" : "bg-border-prominent"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <span
                    className={`text-sm font-medium ${
                      stage.status === "active"
                        ? "text-green-link"
                        : stage.status === "completed"
                        ? "text-text-primary"
                        : "text-text-muted"
                    }`}
                  >
                    {stage.name}
                  </span>
                  {stage.date && <span className="ml-2 text-xs text-text-dim">{stage.date}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-green-border bg-[rgba(45,138,62,0.15)] px-6 py-2.5 text-sm font-medium text-green-link transition-colors hover:bg-[rgba(45,138,62,0.25)]">
              Move to Packaged
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-border-prominent bg-primary px-6 py-2.5 text-sm font-medium text-text-primary opacity-80 transition-colors hover:opacity-100">
              View Details
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
