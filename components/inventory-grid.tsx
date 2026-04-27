import { Package } from "lucide-react"

interface InventoryItem {
  id: string
  product: string
  poNumber: string
  batchDate: string
  punnetsRemaining: number
  daysSinceIntake: number
  freshness: "fresh" | "moderate" | "aging"
}

const freshnessColors = {
  fresh: "bg-nyumbani-green",
  moderate: "bg-harvest-gold",
  aging: "bg-crimson",
}

const inventory: InventoryItem[] = [
  { id: "1", product: "Kale - Sukuma Wiki", poNumber: "PO20260427-001", batchDate: "Apr 27", punnetsRemaining: 124, daysSinceIntake: 1, freshness: "fresh" },
  { id: "2", product: "Spinach - Baby", poNumber: "PO20260426-003", batchDate: "Apr 26", punnetsRemaining: 86, daysSinceIntake: 2, freshness: "fresh" },
  { id: "3", product: "Tomatoes - Cherry", poNumber: "PO20260425-002", batchDate: "Apr 25", punnetsRemaining: 45, daysSinceIntake: 3, freshness: "moderate" },
  { id: "4", product: "Kunde - Cowpeas", poNumber: "PO20260424-001", batchDate: "Apr 24", punnetsRemaining: 32, daysSinceIntake: 4, freshness: "moderate" },
  { id: "5", product: "Managu - Nightshade", poNumber: "PO20260423-004", batchDate: "Apr 23", punnetsRemaining: 18, daysSinceIntake: 5, freshness: "moderate" },
  { id: "6", product: "Lettuce - Butterhead", poNumber: "PO20260420-002", batchDate: "Apr 20", punnetsRemaining: 8, daysSinceIntake: 8, freshness: "aging" },
]

function InventoryCard({ item }: { item: InventoryItem }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-border-prominent">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <Package className="h-5 w-5 text-text-muted" />
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${freshnessColors[item.freshness]}`} />
          <span className="text-xs text-text-muted">
            {item.daysSinceIntake}d
          </span>
        </div>
      </div>

      <h3 className="text-base font-normal text-text-primary">{item.product}</h3>
      <p className="mt-1 font-mono text-xs text-violet">{item.poNumber}</p>
      <p className="mt-1 text-xs text-text-muted">{item.batchDate}</p>

      <div className="mt-4 border-t border-border-subtle pt-4">
        <p className="text-[32px] font-normal leading-tight text-text-primary">
          {item.punnetsRemaining}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.04em] text-text-muted">
          Punnets Remaining
        </p>
      </div>

      {/* Progress bar showing stock level */}
      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-nyumbani-green to-green-link"
            style={{ width: `${Math.min((item.punnetsRemaining / 150) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function InventoryGrid() {
  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24" id="inventory">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[1.2px] text-text-muted">
              Inventory Module
            </span>
            <h2 className="mt-2 text-2xl font-normal text-text-primary lg:text-4xl">
              Current Stock
            </h2>
            <p className="mt-3 text-base text-text-secondary">
              Live inventory levels with freshness tracking.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-nyumbani-green" />
              <span className="text-text-muted">{"< 3 days"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-harvest-gold" />
              <span className="text-text-muted">3-7 days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-crimson" />
              <span className="text-text-muted">{"> 7 days"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inventory.map((item) => (
            <InventoryCard key={item.id} item={item} />
          ))}
        </div>

        {/* Summary bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-[#1c1c1c] p-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-2xl font-normal text-text-primary">313</p>
              <p className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted">Total Punnets</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-2xl font-normal text-green-link">6</p>
              <p className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted">Active Products</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-2xl font-normal text-crimson">1</p>
              <p className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted">Needs Attention</p>
            </div>
          </div>
          <button className="rounded-full border border-border-prominent bg-primary px-6 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-secondary">
            Record Shrinkage
          </button>
        </div>
      </div>
    </section>
  )
}
