"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  ShoppingCart,
  Factory,
  Package,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: ShoppingCart,
      title: "Sourcing Management",
      description:
        "Manage Product Orders from suppliers with full tracking, payment status, and cost management.",
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: Factory,
      title: "Production Tracking",
      description:
        "Monitor batch progression through intake, grading, processing, and packaging stages in real-time.",
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-500/30",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description:
        "Track punnet-level inventory with freshness indicators, shrinkage recording, and stock alerts.",
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/30",
    },
    {
      icon: RefreshCwIcon,
      title: "Zoho Integration",
      description:
        "Seamless synchronization with Zoho CRM and Books for complete end-to-end traceability.",
      color: "from-violet-500/20 to-violet-500/5",
      borderColor: "border-violet-500/30",
    },
    {
      icon: TrendingUpIcon,
      title: "Cost Analytics",
      description:
        "Detailed cost breakdowns by sourcing, production, and calculate accurate COGS and margins.",
      color: "from-orange-500/20 to-orange-500/5",
      borderColor: "border-orange-500/30",
    },
    {
      icon: BarChart3,
      title: "Advanced Reporting",
      description:
        "Comprehensive dashboards with KPIs, batch comparisons, product trends, and financial analysis.",
      color: "from-rose-500/20 to-rose-500/5",
      borderColor: "border-rose-500/30",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sourcing",
      description:
        "Create and manage Product Orders (POs) from suppliers with line items, costs, and payment tracking",
      icon: ShoppingCart,
    },
    {
      step: "2",
      title: "Production",
      description:
        "Track batch progression through intake, grading, processing, packaging with quality control",
      icon: Factory,
    },
    {
      step: "3",
      title: "Inventory",
      description:
        "Monitor punnet-level stock, freshness indicators, and record wastage/shrinkage in real-time",
      icon: BarChart3,
    },
    {
      step: "4",
      title: "Sales",
      description:
        "Sync completed batches to Zoho, manage SKUs, track sales orders, and maintain full traceability",
      icon: Package,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/nyumbani-logo.avif"
                alt="Nyumbani Greens"
                width={32}
                height={32}
                className="h-8 w-auto"
                style={{ width: "auto" }}
              />
              <span className="text-xl font-medium">Nyumbani Greens</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-6 py-2 text-sm font-medium text-text-primary hover:text-nyumbani-green transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="px-6 py-2 text-sm font-medium bg-nyumbani-green text-white rounded-full hover:bg-nyumbani-green/90 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-nyumbani-green/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-harvest-gold/10 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-nyumbani-green/10 border border-nyumbani-green/30 rounded-full">
            <span className="text-sm font-medium text-nyumbani-green">
              Farm-to-Customer Operations Platform
            </span>
          </div>

          <h1 className="text-[4.5rem] sm:text-[5.5rem] leading-[1] font-normal mb-6 text-balance">
            Complete Visibility for
            <span className="bg-gradient-to-r from-nyumbani-green via-harvest-gold to-nyumbani-green bg-clip-text text-transparent">
              {" "}
              Food Operations
            </span>
          </h1>

          <p className="text-xl text-text-muted mb-12 text-balance max-w-2xl mx-auto leading-6">
            Track every Product Order from sourcing through production,
            inventory management, and Zoho sales integration. Nyumbani Greens
            ERP provides complete traceability, accurate cost allocation, and
            real-time operational visibility.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-neutral-900/50 border border-border rounded-lg p-6">
              <div className="text-2xl sm:text-3xl font-normal text-nyumbani-green mb-1">
                100%
              </div>
              <p className="text-xs sm:text-sm text-text-muted">
                Batch Traceability
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-border rounded-lg p-6">
              <div className="text-2xl sm:text-3xl font-normal text-harvest-gold mb-1">
                6+
              </div>
              <p className="text-xs sm:text-sm text-text-muted">Core Modules</p>
            </div>
            <div className="bg-neutral-900/50 border border-border rounded-lg p-6">
              <div className="text-2xl sm:text-3xl font-normal text-nyumbani-green mb-1">
                Real-Time
              </div>
              <p className="text-xs sm:text-sm text-text-muted">Live Updates</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nyumbani-green text-white font-medium rounded-full hover:bg-nyumbani-green/90 transition-all duration-200 hover:scale-105"
            >
              Start Demo
              <ArrowRight size={20} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-full font-medium hover:bg-neutral-900 transition-colors"
            >
              Explore System
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal mb-4">
              End-to-End Batch Tracking
            </h2>
            <p className="text-xl text-text-muted">
              From farm to customer, every step is tracked and measured
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {howItWorks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative">
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/3 -right-3 transform translate-x-1/2 text-text-muted">
                      <ArrowRight size={24} />
                    </div>
                  )}
                  <div className="bg-neutral-900/50 border border-border rounded-lg p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-nyumbani-green">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex h-6 items-center justify-center rounded-full bg-nyumbani-green text-white font-medium text-sm px-2">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-text-muted flex-grow">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950/50 border-y border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal mb-4">Designed for Scale</h2>
            <p className="text-xl text-text-muted">
              Built to handle high-volume farm-to-customer operations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: "∞",
                label: "Batches",
                desc: "Unlimited batch tracking and historical data",
              },
              {
                metric: "N:M",
                label: "Line Items",
                desc: "Multiple items per PO with individual costs",
              },
              {
                metric: "4",
                label: "Production Stages",
                desc: "Full pipeline from intake to packaging",
              },
              {
                metric: "100%",
                label: "Traceability",
                desc: "Complete audit trail for every transaction",
              },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-normal text-nyumbani-green mb-2">
                  {stat.metric}
                </div>
                <div className="text-lg font-medium mb-1">{stat.label}</div>
                <p className="text-sm text-text-muted">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal mb-4">Six Powerful Modules</h2>
            <p className="text-xl text-text-muted mb-6">
              Access these features after logging in with your demo account
            </p>
            <div className="inline-block px-4 py-2 bg-nyumbani-green/10 border border-nyumbani-green/30 rounded-full">
                <span className="text-sm text-nyumbani-green font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-nyumbani-green" />
                  All modules require authentication
                </span>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`group p-8 rounded-lg border transition-all duration-300 cursor-pointer relative ${
                    hoveredFeature === index
                      ? `${feature.borderColor} bg-gradient-to-br ${feature.color} border-opacity-100 transform scale-105`
                      : `${feature.borderColor} bg-neutral-900/50 border-opacity-50`
                  }`}
                >
                  <div className="mb-4 inline-flex p-3 bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-nyumbani-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-text-muted text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-nyumbani-green font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Login to explore
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-neutral-950/50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-normal mb-4">Try the Full ERP System</h2>
          <p className="text-xl text-text-muted mb-8">
            No signup required. All modules are fully functional in the demo.
            Create orders, track batches, manage inventory, and see real-time
            operations in action.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nyumbani-green text-white font-medium rounded-full hover:bg-nyumbani-green/90 transition-all duration-200 hover:scale-105"
          >
            Start Exploring
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-neutral-950/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image
                src="/nyumbani-logo.avif"
                alt="Nyumbani Greens"
                width={32}
                height={32}
                className="h-8 w-auto mb-4"
                style={{ width: "auto" }}
              />
              <p className="text-sm text-text-muted">
                Farm-to-customer ERP system
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a
                    href="#features"
                    className="hover:text-nyumbani-green transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-nyumbani-green transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a
                    href="#"
                    className="hover:text-nyumbani-green transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-nyumbani-green transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a
                    href="#"
                    className="hover:text-nyumbani-green transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-nyumbani-green transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-text-muted">
            <p>&copy; 2024 Nyumbani Greens. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper icon components
function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-9 0a1 1 0 11-2 0 1 1 0 012 0m8 0a1 1 0 11-2 0 1 1 0 012 0" />
    </svg>
  );
}

function RefreshCwIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36M20.49 15a9 9 0 01-14.85 3.36" />
    </svg>
  );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <path d="M13 2v7h7" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}
