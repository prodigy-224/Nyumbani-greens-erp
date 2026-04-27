import { ArrowRight, Leaf } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-24 lg:px-8 lg:py-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(45,138,62,0.03)] to-transparent" />
      
      <div className="relative mx-auto max-w-[1400px]">
        {/* Tag */}
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#2D8A3E]">
            <Leaf className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[1.2px] text-text-muted">
            Farm-to-Customer Operations
          </span>
        </div>

        {/* Hero headline - 72px with 1.00 line-height */}
        <h1 className="max-w-4xl text-5xl font-normal leading-[1] text-text-primary md:text-6xl lg:text-[72px]">
          <span className="text-balance">Batch Operations.</span>
          <br />
          <span className="text-balance text-green-link">Precision Control.</span>
        </h1>

        {/* Sub-text */}
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg">
          Dark-mode-native ERP built for farm-to-customer food businesses. 
          Track sourcing, production, inventory, and sales with terminal-grade precision 
          and organic brand identity.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-text-primary bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#1a1a1a]">
            Start Managing Batches
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-border-prominent bg-primary px-8 py-3 text-sm font-medium text-text-primary opacity-80 transition-colors hover:border-border-light hover:opacity-100">
            View Documentation
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border-subtle pt-10 lg:grid-cols-4">
          <div>
            <p className="font-mono text-2xl font-normal text-gold-link lg:text-[32px]">KES 2.4M</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.04em] text-text-muted">Monthly Revenue</p>
          </div>
          <div>
            <p className="text-2xl font-normal text-green-link lg:text-[32px]">94.2%</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.04em] text-text-muted">Batch Health</p>
          </div>
          <div>
            <p className="text-2xl font-normal text-text-primary lg:text-[32px]">847</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.04em] text-text-muted">Active Punnets</p>
          </div>
          <div>
            <p className="text-2xl font-normal text-green-link lg:text-[32px]">3.2%</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.04em] text-text-muted">Avg Wastage</p>
          </div>
        </div>
      </div>
    </section>
  )
}
