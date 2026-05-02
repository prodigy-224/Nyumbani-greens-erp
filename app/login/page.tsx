"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8">
        <div className="max-w-md text-center">
          <Image
            src="/nyumbani-logo.avif"
            alt="Nyumbani Greens"
            width={80}
            height={80}
            className="mx-auto mb-6"
            style={{ width: "auto" }}
          />
          <h1 className="text-4xl font-normal text-text-primary mb-4">
            Nyumbani Greens
          </h1>
          <p className="text-lg text-text-muted mb-8">
            Batch-centric ERP system for farm-to-customer operations
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-nyumbani-green mt-2 flex-shrink-0"></div>
              <p className="text-text-secondary">
                Track Product Orders from sourcing through production
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-harvest-gold mt-2 flex-shrink-0"></div>
              <p className="text-text-secondary">
                Real-time inventory management and cost tracking
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-nyumbani-green mt-2 flex-shrink-0"></div>
              <p className="text-text-secondary">
                Seamless Zoho sales integration for end-to-end traceability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Image
              src="/nyumbani-logo.avif"
              alt="Nyumbani Greens"
              width={48}
              height={48}
              className="mx-auto mb-4"
              style={{ width: "auto" }}
            />
            <h1 className="text-2xl font-normal text-text-primary">
              Nyumbani Greens
            </h1>
          </div>

          <h2 className="text-2xl font-normal text-text-primary mb-2 text-center lg:text-left">
            Welcome Back
          </h2>
          <p className="text-text-muted mb-8 text-center lg:text-left">
            Sign in to your ERP dashboard
          </p>

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-500/10 border border-red-500/20 p-4">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-900 border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-nyumbani-green transition-colors"
                placeholder="your@email.com"
                required
              />
              <p className="mt-2 text-xs text-text-muted">
                Demo: demo@nyumbani.com, manager@nyumbani.com, or
                operator@nyumbani.com
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-900 border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-nyumbani-green transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-2 text-xs text-text-muted">
                Demo passwords: demo123, manager123, or operator123
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-nyumbani-green hover:bg-nyumbani-green/90 disabled:bg-nyumbani-green/50 text-white font-medium rounded-full transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-sm text-text-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/"
                className="text-nyumbani-green hover:text-nyumbani-green/80 font-medium"
              >
                Back to Home
              </Link>
            </p>
          </div>

          {/* Demo Credentials Card */}
          <div className="mt-8 p-4 bg-neutral-900 border border-nyumbani-green/20 rounded-lg">
            <p className="text-xs font-medium text-nyumbani-green mb-3">
              DEMO ACCOUNTS
            </p>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-mono text-text-primary">demo@nyumbani.com</p>
                <p className="text-text-muted">Password: demo123 (Admin)</p>
              </div>
              <div className="border-t border-border pt-2">
                <p className="font-mono text-text-primary">
                  manager@nyumbani.com
                </p>
                <p className="text-text-muted">
                  Password: manager123 (Manager)
                </p>
              </div>
              <div className="border-t border-border pt-2">
                <p className="font-mono text-text-primary">
                  operator@nyumbani.com
                </p>
                <p className="text-text-muted">
                  Password: operator123 (Operator)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
