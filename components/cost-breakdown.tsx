import { Settings } from "lucide-react"

interface CostType {
  name: string
  rate: string
  color: string
  percentage: number
}

const costs: CostType[] = [
  { name: "Sourcing", rate: "KES 85", color: "bg-green-link", percentage: 58 },
  { name: "Labour", rate: "KES 25", color: "bg-violet", percentage: 17 },
  { name: "Electricity", rate: "KES 12", color: "bg-blue", percentage: 8 },
  { name: "Packaging", rate: "KES 15", color: "bg-tomato", percentage: 10 },
  { name: "Delivery", rate: "KES 8", color: "bg-harvest-gold", percentage: 7 },
]

export function CostBreakdown() {
  const totalCost = 145

  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24" id="costs">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[1.2px] text-purple">
              Cost Management
            </span>
            <h2 className="mt-2 text-2xl font-normal text-text-primary lg:text-4xl">
              Unit Cost Breakdown
            </h2>
            <p className="mt-3 text-base text-text-secondary">
              Per-punnet cost analysis with rate management.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-[rgba(192,132,252,0.3)] bg-[rgba(168,85,247,0.15)] px-6 py-2 text-sm font-medium text-purple transition-colors hover:bg-[rgba(168,85,247,0.25)]">
            <Settings className="h-4 w-4" />
            Manage Rates
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cost table */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border-subtle px-6 py-4">
              <h3 className="text-sm font-medium text-text-primary">Cost Catalogue</h3>
            </div>
            <div className="divide-y divide-border-subtle">
              {costs.map((cost) => (
                <div
                  key={cost.name}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${cost.color}`} />
                    <span className="text-sm text-text-primary">{cost.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gold-link">{cost.rate}</span>
                    <span className="text-xs text-text-muted">{cost.percentage}%</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between bg-[#1c1c1c] px-6 py-4">
                <span className="text-sm font-medium text-text-primary">Total Unit Cost</span>
                <span className="text-lg font-medium text-gold-link">KES {totalCost}</span>
              </div>
            </div>
          </div>

          {/* Visual breakdown */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 text-sm font-medium text-text-primary">Cost Distribution</h3>

            {/* Stacked bar */}
            <div className="mb-6 flex h-4 overflow-hidden rounded-full">
              {costs.map((cost) => (
                <div
                  key={cost.name}
                  className={`${cost.color}`}
                  style={{ width: `${cost.percentage}%` }}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {costs.map((cost) => (
                <div key={cost.name} className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${cost.color}`} />
                  <span className="text-xs text-text-muted">{cost.name}</span>
                </div>
              ))}
            </div>

            {/* Margin card */}
            <div className="mt-8 rounded-lg border border-gold-border bg-[rgba(212,160,23,0.08)] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted">
                    Selling Price
                  </p>
                  <p className="mt-1 text-2xl font-normal text-gold-link">KES 190</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted">
                    Net Margin
                  </p>
                  <p className="mt-1 text-2xl font-normal text-green-link">23.7%</p>
                </div>
              </div>
              <div className="mt-4 border-t border-gold-border/30 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Contribution Margin</span>
                  <span className="font-medium text-text-primary">KES 45/punnet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
