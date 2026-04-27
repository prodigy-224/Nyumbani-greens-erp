import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPICardProps {
  label: string
  value: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  variant?: "default" | "gold" | "green" | "danger"
}

function KPICard({ label, value, trend, trendValue, variant = "default" }: KPICardProps) {
  const valueColors = {
    default: "text-text-primary",
    gold: "text-gold-link",
    green: "text-green-link",
    danger: "text-crimson",
  }

  const trendColors = {
    up: "text-green-link",
    down: "text-crimson",
    neutral: "text-text-muted",
  }

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <div className="rounded-xl border border-border-prominent bg-card p-5 transition-colors hover:border-border-light">
      <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">
        {label}
      </p>
      <p className={`mt-2 text-[32px] font-normal leading-tight tracking-[-0.02em] ${valueColors[variant]}`}>
        {value}
      </p>
      {trend && trendValue && (
        <div className={`mt-3 flex items-center gap-1 text-xs ${trendColors[trend]}`}>
          <TrendIcon className="h-3 w-3" />
          <span>{trendValue}</span>
          <span className="text-text-muted">vs last batch</span>
        </div>
      )}
    </div>
  )
}

export function KPICards() {
  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24" id="dashboard">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[1.2px] text-text-muted">
              Dashboard
            </span>
            <h2 className="mt-2 text-2xl font-normal text-text-primary lg:text-4xl">
              Operations Overview
            </h2>
          </div>
          <button className="hidden rounded-full border border-gold-border bg-[rgba(212,160,23,0.15)] px-6 py-2 text-sm font-medium text-gold-link transition-colors hover:bg-[rgba(212,160,23,0.25)] lg:block">
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label="Average Wastage"
            value="3.2%"
            trend="down"
            trendValue="0.8%"
            variant="green"
          />
          <KPICard
            label="Average Shrinkage"
            value="1.8%"
            trend="down"
            trendValue="0.3%"
            variant="green"
          />
          <KPICard
            label="Unit Cost/Punnet"
            value="KES 145"
            trend="up"
            trendValue="KES 12"
            variant="gold"
          />
          <KPICard
            label="Net Margin"
            value="24.6%"
            trend="up"
            trendValue="2.1%"
            variant="gold"
          />
        </div>

        {/* Secondary row */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KPICard
            label="Active Batches"
            value="12"
            variant="default"
          />
          <KPICard
            label="Pending Sync"
            value="3"
            variant="default"
          />
          <KPICard
            label="This Week Revenue"
            value="KES 892K"
            trend="up"
            trendValue="18%"
            variant="gold"
          />
        </div>
      </div>
    </section>
  )
}
