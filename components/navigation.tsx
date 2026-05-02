"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Bell, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Sourcing", href: "#sourcing" },
  { name: "Production", href: "#production" },
  { name: "Inventory", href: "#inventory" },
  { name: "Zoho Integration", href: "#zoho" },
  { name: "Costs", href: "#costs" },
  { name: "Dashboard", href: "#dashboard" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/nyumbani-logo.avif"
            alt="Nyumbani Greens"
            width={32}
            height={32}
            className="h-8 w-auto"
            style={{ width: "auto" }}
          />
          <span className="text-lg font-medium text-text-primary">
            Nyumbani Greens
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Create PO Button - Desktop */}
          <button className="hidden rounded-full border border-green-border bg-[rgba(45,138,62,0.15)] px-6 py-2 text-sm font-medium text-green-link transition-colors hover:bg-[rgba(45,138,62,0.25)] lg:block">
            Create Product Order
          </button>

          {/* Notification Bell */}
          <button className="relative rounded-md p-2 text-text-muted transition-colors hover:bg-secondary hover:text-text-primary">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#2D8A3E]" />
          </button>

          {/* User Menu */}
          <button className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-secondary hover:text-text-primary lg:flex">
            <div className="h-7 w-7 rounded-full bg-secondary" />
            <span>Admin</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Mobile menu button */}
          <button
            className="rounded-md p-2 text-text-muted lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-muted hover:bg-secondary hover:text-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="mt-4 w-full rounded-full border border-green-border bg-[rgba(45,138,62,0.15)] px-6 py-3 text-sm font-medium text-green-link">
              Create Product Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
