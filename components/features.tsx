import {
  ShoppingCart,
  Factory,
  Package,
  RefreshCw,
  Calculator,
  BarChart3,
} from "lucide-react"

const features = [
  {
    icon: ShoppingCart,
    title: "Sourcing",
    description: "Create and manage product orders with supplier tracking, line items, and automatic PO numbering.",
    color: "text-green-link",
    borderColor: "border-green-border",
    bgColor: "bg-[rgba(45,138,62,0.08)]",
  },
  {
    icon: Factory,
    title: "Production",
    description: "Track intake validation, grading, processing, and packaging with real-time wastage monitoring.",
    color: "text-gold-link",
    borderColor: "border-gold-border",
    bgColor: "bg-[rgba(212,160,23,0.08)]",
  },
  {
    icon: Package,
    title: "Inventory",
    description: "Monitor stock levels, freshness indicators, and shrinkage with batch-level traceability.",
    color: "text-green-link",
    borderColor: "border-green-border",
    bgColor: "bg-[rgba(45,138,62,0.08)]",
  },
  {
    icon: RefreshCw,
    title: "Zoho Integration",
    description: "Automatic sales sync with SKU tagging, reconciliation, and variance tracking.",
    color: "text-violet",
    borderColor: "border-[rgba(139,92,246,0.3)]",
    bgColor: "bg-[rgba(139,92,246,0.08)]",
  },
  {
    icon: Calculator,
    title: "Cost Management",
    description: "Rate catalogues, per-punnet costing, contribution margin analysis, and override tracking.",
    color: "text-purple",
    borderColor: "border-[rgba(192,132,252,0.3)]",
    bgColor: "bg-[rgba(168,85,247,0.08)]",
  },
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "KPI cards, trend charts, batch comparisons, and financial summaries at a glance.",
    color: "text-gold-link",
    borderColor: "border-gold-border",
    bgColor: "bg-[rgba(212,160,23,0.08)]",
  },
]

export function Features() {
  return (
    <section className="border-y border-border-subtle px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[1.2px] text-text-muted">
            Modules
          </span>
          <h2 className="mt-3 text-2xl font-normal text-text-primary lg:text-4xl">
            <span className="text-balance">End-to-End Operations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary">
            From farm gate to customer delivery, every step tracked with precision.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border ${feature.borderColor} ${feature.bgColor} p-6 transition-all hover:border-opacity-50`}
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feature.borderColor} bg-background/50`}
                >
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-normal text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
