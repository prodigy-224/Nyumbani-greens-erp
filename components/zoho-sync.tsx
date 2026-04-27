import { RefreshCw, Check, X, AlertCircle } from "lucide-react"

interface SyncLog {
  id: string
  timestamp: string
  recordsPulled: number
  matched: number
  unmatched: number
  errors: number
  status: "success" | "failed" | "partial"
}

const syncLogs: SyncLog[] = [
  { id: "1", timestamp: "2026-04-27 14:32:08", recordsPulled: 47, matched: 45, unmatched: 2, errors: 0, status: "success" },
  { id: "2", timestamp: "2026-04-27 12:15:23", recordsPulled: 32, matched: 32, unmatched: 0, errors: 0, status: "success" },
  { id: "3", timestamp: "2026-04-27 08:45:11", recordsPulled: 28, matched: 25, unmatched: 2, errors: 1, status: "partial" },
  { id: "4", timestamp: "2026-04-26 18:22:45", recordsPulled: 0, matched: 0, unmatched: 0, errors: 3, status: "failed" },
  { id: "5", timestamp: "2026-04-26 14:08:33", recordsPulled: 56, matched: 56, unmatched: 0, errors: 0, status: "success" },
]

const statusStyles = {
  success: { bg: "bg-[rgba(45,138,62,0.15)]", text: "text-green-link", icon: Check },
  failed: { bg: "bg-[rgba(220,38,38,0.15)]", text: "text-crimson", icon: X },
  partial: { bg: "bg-[rgba(212,160,23,0.15)]", text: "text-gold-link", icon: AlertCircle },
}

export function ZohoSync() {
  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24" id="zoho">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[1.2px] text-violet">
              Zoho Integration
            </span>
            <h2 className="mt-2 text-2xl font-normal text-text-primary lg:text-4xl">
              Sales Sync
            </h2>
            <p className="mt-3 text-base text-text-secondary">
              Reconcile issued stock with Zoho sales records.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Sync status indicator */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute h-3 w-3 animate-ping rounded-full bg-nyumbani-green/40" />
                <div className="relative h-3 w-3 rounded-full bg-nyumbani-green" />
              </div>
              <span className="text-sm text-text-muted">Last sync: 2 min ago</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-green-border bg-[rgba(45,138,62,0.15)] px-6 py-2 text-sm font-medium text-green-link transition-colors hover:bg-[rgba(45,138,62,0.25)]">
              <RefreshCw className="h-4 w-4" />
              Sync Now
            </button>
          </div>
        </div>

        {/* SKU Example */}
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-[#1c1c1c] px-4 py-3">
          <span className="text-sm text-text-muted">Sample SKU Format:</span>
          <span className="rounded-full bg-[rgba(139,92,246,0.15)] px-3 py-1 font-mono text-sm text-violet">
            KUNDE-PO20260427-001
          </span>
          <span className="rounded-full bg-[rgba(139,92,246,0.15)] px-3 py-1 font-mono text-sm text-violet">
            SPINACH-PO20260426-003
          </span>
        </div>

        {/* Sync Log Table */}
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="border-b border-border-subtle bg-[#1c1c1c] px-4 py-3">
            <h3 className="text-sm font-medium text-text-primary">Sync History</h3>
          </div>

          {/* Table header - desktop */}
          <div className="hidden border-b border-border-subtle bg-card lg:block">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Timestamp</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Records Pulled</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Matched</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Unmatched</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Errors</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-text-muted">Status</span>
            </div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-border-subtle">
            {syncLogs.map((log) => {
              const StatusIcon = statusStyles[log.status].icon
              return (
                <div key={log.id} className="transition-colors hover:bg-[rgba(255,255,255,0.02)]">
                  {/* Mobile layout */}
                  <div className="block p-4 lg:hidden">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs text-text-muted">{log.timestamp}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[log.status].bg} ${statusStyles[log.status].text}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {log.status}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-text-muted">Pulled: </span>
                        <span className="text-text-primary">{log.recordsPulled}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">Matched: </span>
                        <span className="text-green-link">{log.matched}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">Unmatched: </span>
                        <span className={log.unmatched > 0 ? "text-gold-link" : "text-text-primary"}>
                          {log.unmatched}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-muted">Errors: </span>
                        <span className={log.errors > 0 ? "text-crimson" : "text-text-primary"}>
                          {log.errors}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-4 py-3 lg:grid">
                    <span className="font-mono text-xs text-text-muted">{log.timestamp}</span>
                    <span className="text-sm text-text-primary">{log.recordsPulled}</span>
                    <span className="text-sm text-green-link">{log.matched}</span>
                    <span className={`text-sm ${log.unmatched > 0 ? "text-gold-link" : "text-text-muted"}`}>
                      {log.unmatched}
                    </span>
                    <span className={`text-sm ${log.errors > 0 ? "text-crimson" : "text-text-muted"}`}>
                      {log.errors}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[log.status].bg} ${statusStyles[log.status].text}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {log.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
