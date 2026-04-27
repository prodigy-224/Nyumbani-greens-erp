"use client"

import { useState } from "react"
import { ChevronDown, Filter, MoreHorizontal, ExternalLink } from "lucide-react"

interface Batch {
  id: string
  poNumber: string
  supplier: string
  date: string
  status: "draft" | "confirmed" | "in-production" | "packaged" | "closed" | "paid"
  total: string
  products: number
}

const statusStyles = {
  draft: "bg-secondary text-text-muted",
  confirmed: "bg-[rgba(45,138,62,0.15)] text-green-link",
  "in-production": "bg-[rgba(212,160,23,0.15)] text-gold-link",
  packaged: "bg-[rgba(59,130,246,0.15)] text-blue",
  closed: "bg-secondary text-text-primary",
  paid: "bg-[rgba(45,138,62,0.15)] text-green-link",
}

const statusLabels = {
  draft: "Draft",
  confirmed: "Confirmed",
  "in-production": "In Production",
  packaged: "Packaged",
  closed: "Closed",
  paid: "Paid",
}

const batches: Batch[] = [
  { id: "1", poNumber: "PO20260427-001", supplier: "Kiambu Fresh Farms", date: "Apr 27, 2026", status: "in-production", total: "KES 48,500", products: 5 },
  { id: "2", poNumber: "PO20260426-003", supplier: "Nairobi Greens Co.", date: "Apr 26, 2026", status: "confirmed", total: "KES 32,100", products: 3 },
  { id: "3", poNumber: "PO20260425-002", supplier: "Limuru Organics", date: "Apr 25, 2026", status: "packaged", total: "KES 67,200", products: 8 },
  { id: "4", poNumber: "PO20260424-001", supplier: "Kiambu Fresh Farms", date: "Apr 24, 2026", status: "paid", total: "KES 41,800", products: 4 },
  { id: "5", poNumber: "PO20260423-004", supplier: "Thika Valley Produce", date: "Apr 23, 2026", status: "closed", total: "KES 55,300", products: 6 },
  { id: "6", poNumber: "PO20260422-001", supplier: "Nairobi Greens Co.", date: "Apr 22, 2026", status: "paid", total: "KES 29,400", products: 3 },
]

export function BatchTable() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>("1")

  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24" id="sourcing">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[1.2px] text-text-muted">
              Sourcing Module
            </span>
            <h2 className="mt-2 text-2xl font-normal text-text-primary lg:text-4xl">
              Product Orders
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-primary px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-secondary">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-green-border bg-[rgba(45,138,62,0.15)] px-6 py-2 text-sm font-medium text-green-link transition-colors hover:bg-[rgba(45,138,62,0.25)]">
              Create PO
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-border">
          {/* Table header */}
          <div className="hidden border-b border-border-subtle bg-[#1c1c1c] lg:block">
            <div className="grid grid-cols-[1fr_1.5fr_auto_auto_auto_auto] gap-4 px-4 py-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">PO Number</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Supplier</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Date</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Status</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Total</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Actions</span>
            </div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-border-subtle">
            {batches.map((batch) => (
              <div
                key={batch.id}
                onClick={() => setSelectedBatch(batch.id)}
                className={`cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.02)] ${
                  selectedBatch === batch.id
                    ? "border-l-[3px] border-l-nyumbani-green bg-[rgba(45,138,62,0.08)]"
                    : "border-l-[3px] border-l-transparent"
                }`}
              >
                {/* Mobile layout */}
                <div className="block p-4 lg:hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-sm text-green-link">{batch.poNumber}</span>
                      <p className="mt-1 text-sm text-text-secondary">{batch.supplier}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[batch.status]}`}>
                      {statusLabels[batch.status]}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-text-muted">{batch.date}</span>
                    <span className="font-medium text-gold-link">{batch.total}</span>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden grid-cols-[1fr_1.5fr_auto_auto_auto_auto] items-center gap-4 px-4 py-3 lg:grid">
                  <span className="font-mono text-sm text-green-link">{batch.poNumber}</span>
                  <span className="text-sm text-text-secondary">{batch.supplier}</span>
                  <span className="text-sm text-text-muted">{batch.date}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[batch.status]}`}>
                    {statusLabels[batch.status]}
                  </span>
                  <span className="text-sm font-medium text-gold-link">{batch.total}</span>
                  <div className="flex items-center gap-2">
                    <button className="rounded p-1 text-text-muted transition-colors hover:bg-secondary hover:text-text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button className="rounded p-1 text-text-muted transition-colors hover:bg-secondary hover:text-text-primary">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination hint */}
        <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
          <span>Showing 6 of 124 orders</span>
          <button className="text-green-link hover:underline">View all orders →</button>
        </div>
      </div>
    </section>
  )
}
