import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <Image
              src="/nyumbani-logo.avif"
              alt="Nyumbani Greens"
              width={32}
              height={32}
              className="h-8 w-auto"
              style={{ width: "auto" }}
            />
            <div>
              <span className="text-sm font-medium text-text-primary">
                Nyumbani Greens
              </span>
              <p className="text-xs text-text-muted">
                Farm-to-Customer Operations
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a
              href="#sourcing"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Sourcing
            </a>
            <a
              href="#production"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Production
            </a>
            <a
              href="#inventory"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Inventory
            </a>
            <a
              href="#zoho"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Zoho
            </a>
            <a
              href="#costs"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Costs
            </a>
            <a
              href="#dashboard"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Dashboard
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-8 lg:flex-row lg:items-center">
          <p className="text-xs text-text-dim">
            © {new Date().getFullYear()} Nyumbani Greens. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="#"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
