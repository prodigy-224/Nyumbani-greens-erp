import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { KPICards } from "@/components/kpi-cards"
import { BatchTable } from "@/components/batch-table"
import { Pipeline } from "@/components/pipeline"
import { InventoryGrid } from "@/components/inventory-grid"
import { ZohoSync } from "@/components/zoho-sync"
import { CostBreakdown } from "@/components/cost-breakdown"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <KPICards />
        <BatchTable />
        <Pipeline />
        <InventoryGrid />
        <ZohoSync />
        <CostBreakdown />
      </main>
      <Footer />
    </div>
  )
}
