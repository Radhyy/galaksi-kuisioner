"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sun,
  Moon,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Theme state: light (white) by default, syncs with local storage
  const [isDark, setIsDark] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load saved theme if any
  useEffect(() => {
    const saved = localStorage.getItem("adminTheme");
    if (saved === "dark") {
      setIsDark(true);
    } else if (saved === "light") {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("adminTheme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("redirect")) {
        setErrorMessage("Silakan login terlebih dahulu untuk mengakses panel admin.");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Silakan masukkan alamat email atau username Anda.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Silakan masukkan kata sandi Anda.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setErrorMessage(data.error || "Email/username atau kata sandi tidak valid.");
        return;
      }

      setSuccessMessage("Autentikasi berhasil! Mengalihkan ke dashboard...");

      const params = new URLSearchParams(window.location.search);
      const redirectTarget = params.get("redirect") || "/admin";

      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 600);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Gagal menghubungi server database. Silakan coba lagi.");
    }
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between transition-colors duration-300 font-sans selection:bg-purple-500 selection:text-white ${
        isDark ? "bg-[#09090E] text-[#F1F1F5]" : "bg-[#F8FAFC] text-[#0F172A]"
      }`}
    >
      {/* Top Bar: Back Link & Theme Toggle */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
            isDark
              ? "border-[#232034] bg-[#12111A]/80 text-neutral-300 hover:text-white hover:border-purple-500/40"
              : "border-neutral-200 bg-white/80 text-neutral-600 hover:text-neutral-900 hover:border-purple-300 shadow-2xs"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Beranda Kuisioner</span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
          className={`p-2 rounded-xl border transition-all ${
            isDark
              ? "border-[#232034] bg-[#12111A]/80 text-neutral-300 hover:text-white hover:border-purple-500/40"
              : "border-neutral-200 bg-white/80 text-neutral-600 hover:text-neutral-900 hover:border-purple-300 shadow-2xs"
          }`}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-600" />}
        </button>
      </header>

      {/* Main Login Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[420px] space-y-6">
          {/* Card Wrapper */}
          <div
            className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all shadow-xl ${
              isDark
                ? "bg-[#111019]/90 border-[#232034] shadow-black/40"
                : "bg-white/95 border-neutral-200 shadow-neutral-200/50"
            }`}
          >
            {/* Logo & Heading */}
            <div className="text-center space-y-3 mb-7">
              <div
                className={`inline-flex items-center justify-center p-3 rounded-2xl border transition-colors ${
                  isDark
                    ? "bg-purple-500/10 border-purple-500/20"
                    : "bg-neutral-100 border-neutral-200"
                }`}
              >
                <Image
                  src="/LogoGalaksi.png"
                  alt="Galaksi Logo"
                  width={40}
                  height={40}
                  className={`w-10 h-10 object-contain transition-all ${
                    isDark ? "" : "brightness-0"
                  }`}
                  priority
                />
              </div>

              <div>
                <h1
                  className={`text-2xl font-black tracking-tight ${
                    isDark ? "text-white" : "text-neutral-950"
                  }`}
                >
                  Masuk ke Panel Admin
                </h1>
                <p
                  className={`text-xs mt-1 font-medium ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  Kelola kuisioner, pantau tanggapan, dan analisis data
                </p>
              </div>
            </div>

            {/* Error / Success Feedback Alert */}
            {errorMessage && (
              <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Email / Username */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className={`block text-xs font-bold tracking-wide ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  Email atau Username
                </label>
                <div className="relative">
                  <Mail
                    className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  />
                  <input
                    id="email"
                    type="text"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@galaksi.id"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border outline-hidden transition-all ${
                      isDark
                        ? "bg-[#181624] border-[#2A2740] text-white placeholder-neutral-500 focus:border-purple-500 focus:bg-[#1C1A2B] focus:ring-4 focus:ring-purple-500/15"
                        : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                    }`}
                  />
                </div>
              </div>

              {/* Field 2: Password with Check Password Button */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className={`block text-xs font-bold tracking-wide ${
                      isDark ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() =>
                      alert("Silakan hubungi administrator sistem untuk mereset kata sandi.")
                    }
                    className="text-[11px] font-semibold text-purple-600 hover:text-purple-500 hover:underline transition-colors"
                  >
                    Lupa sandi?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-11 py-2.5 rounded-xl text-xs font-medium border outline-hidden transition-all ${
                      isDark
                        ? "bg-[#181624] border-[#2A2740] text-white placeholder-neutral-500 focus:border-purple-500 focus:bg-[#1C1A2B] focus:ring-4 focus:ring-purple-500/15"
                        : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                    }`}
                  />

                  {/* Button Cek Password (Toggle Show / Hide Password) */}
                  <button
                    type="button"
                    id="btn-cek-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? "Sembunyikan kata sandi" : "Cek / Lihat kata sandi"}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                      showPassword
                        ? "text-purple-500 bg-purple-500/15"
                        : isDark
                        ? "text-neutral-400 hover:text-white hover:bg-white/5"
                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                  />
                  <span
                    className={`text-xs font-semibold ${
                      isDark ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    Ingat sesi saya
                  </span>
                </label>
              </div>

              {/* Submit Button - Tactile 3D Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-[0_4px_0_0_#4c1d95] active:shadow-none active:translate-y-1 transition-all duration-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 select-none"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Minimalist Security Badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Koneksi aman terenkripsi 256-bit • Galaksi Kuisioner</span>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-neutral-500">
        &copy; 2026 Galaksi Kuisioner Digital. Hak cipta dilindungi.
      </footer>
    </div>
  );
}
