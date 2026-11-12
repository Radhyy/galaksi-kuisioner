"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sun,
  Moon,
  MessageCircle,
  HelpCircle,
  Layers,
  Lock,
} from "lucide-react";
import { SurveySublink, getStoredSublinks } from "@/lib/surveyStore";

export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [sublinks, setSublinks] = useState<SurveySublink[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isDark = theme === "dark";

  // Check saved theme
  useEffect(() => {
    const saved = localStorage.getItem("galaxyTheme");
    if (saved === "dark") {
      setTheme("dark");
    } else if (saved === "light") {
      setTheme("light");
    }
  }, []);

  // Load sublinks from Neon PostgreSQL API with fallback to local store
  useEffect(() => {
    const local = getStoredSublinks();
    if (local && local.length > 0) {
      setSublinks(local);
    }

    fetch("/api/sublinks")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sublinks");
        return res.json();
      })
      .then((data) => {
        if (data.sublinks && Array.isArray(data.sublinks) && data.sublinks.length > 0) {
          setSublinks(data.sublinks);
        }
      })
      .catch((err) => {
        console.warn("Using fallback local sublinks:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("galaxyTheme", next);
      return next;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 flex flex-col justify-between ${
        isDark ? "bg-[#0A0A0E] text-white" : "bg-[#F8FAFC] text-slate-900"
      }`}
    >
      {/* Top Header */}
      <header
        className={`sticky top-0 z-30 border-b transition-colors duration-200 ${
          isDark
            ? "bg-[#0A0A0E] border-[#1E1B2E]"
            : "bg-white/95 backdrop-blur-md border-neutral-200/80"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <Image
              src="/LogoGalaksi.png"
              alt="Logo Galaksi"
              width={32}
              height={32}
              className={`h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0 select-none transition-all duration-200 ${
                isDark ? "" : "brightness-0"
              }`}
              priority
            />
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`text-sm sm:text-base font-black tracking-tight leading-none ${
                  isDark ? "text-white" : "text-neutral-950"
                }`}
              >
                Galaksi
              </span>
              <span
                className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg border whitespace-nowrap ${
                  isDark
                    ? "bg-purple-950/60 border-purple-500/30 text-purple-300"
                    : "bg-purple-50 border-purple-200 text-purple-800"
                }`}
              >
                Kuisioner Layanan Digital
              </span>
            </div>
          </Link>

          {/* Controls: Theme & Portal Admin */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                isDark
                  ? "border-[#232034] bg-[#14121E] text-neutral-300 hover:text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:text-neutral-950 shadow-2xs"
              }`}
              title="Ganti Tema Tampilan"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <Link
              href="/login"
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                isDark
                  ? "border-[#252136] text-neutral-400 hover:text-white hover:bg-white/5"
                  : "border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 shadow-2xs"
              }`}
            >
              Portal Admin
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* SELECTION GRID                                                 */}
      {/* ============================================================== */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16">
          <div className="text-center mb-8 sm:mb-10">
            <h1
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Pilih Jalur Kuisioner
            </h1>
            <p
              className={`text-xs sm:text-sm mt-2 max-w-md mx-auto ${
                isDark ? "text-neutral-400" : "text-slate-600 font-medium"
              }`}
            >
              Silakan pilih kuisioner sesuai dengan peran Anda di dalam keluarga:
            </p>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping inline-block mr-2" />
              Memuat pilihan kuisioner...
            </div>
          ) : sublinks.length === 0 ? (
            <div
              className={`p-8 rounded-2xl border text-center ${
                isDark
                  ? "bg-[#111019] border-[#232034] text-neutral-400"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <HelpCircle className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
              <p className="text-sm font-semibold">Belum ada kuisioner yang terdaftar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sublinks.map((sub) => {
                const isOrangTua =
                  sub.slug.toLowerCase().includes("orangtua") ||
                  sub.targetAudience.toLowerCase().includes("orang tua");

                return (
                  <div
                    key={sub.id}
                    className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-200 flex flex-col justify-between group hover:shadow-xl ${
                      isDark
                        ? "bg-[#111019] border-[#232034] hover:border-purple-500/40"
                        : "bg-white border-slate-200 hover:border-purple-300 shadow-sm"
                    }`}
                  >
                    <div>
                      {/* Top Header Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                            isDark
                              ? isOrangTua
                                ? "bg-purple-950/60 border-purple-500/30 text-purple-300"
                                : "bg-indigo-950/60 border-indigo-500/30 text-indigo-300"
                              : isOrangTua
                              ? "bg-purple-50 border-purple-200 text-purple-700"
                              : "bg-indigo-50 border-indigo-200 text-indigo-700"
                          }`}
                        >
                          {isOrangTua ? (
                            <Users className="w-3.5 h-3.5" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5" />
                          )}
                          <span>{sub.targetAudience}</span>
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                            isDark
                              ? sub.isActive
                                ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
                                : "bg-amber-950/60 border-amber-500/30 text-amber-300"
                              : sub.isActive
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-amber-50 border-amber-200 text-amber-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              sub.isActive
                                ? "bg-emerald-500 animate-pulse"
                                : "bg-amber-500"
                            }`}
                          />
                          <span>{sub.isActive ? "Aktif" : "Ditutup"}</span>
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight mb-2 group-hover:text-purple-600 transition-colors ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {sub.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-6 font-medium ${
                          isDark ? "text-neutral-300" : "text-slate-700"
                        }`}
                      >
                        {sub.description}
                      </p>

                      {/* Metadata */}
                      <div
                        className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between mb-6 ${
                          isDark
                            ? "bg-[#161422] border-[#252136] text-neutral-300"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Estimasi {sub.estimatedMinutes || 3} Menit</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{sub.questions ? sub.questions.length : 6} Pertanyaan</span>
                        </div>
                        <code
                          className={`font-mono font-bold ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          /{sub.slug}
                        </code>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      {sub.isActive ? (
                        <Link
                          href={`/${sub.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md group-hover:shadow-purple-500/25"
                        >
                          <span>Mulai Isi Kuisioner</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <div
                          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold cursor-not-allowed ${
                            isDark
                              ? "bg-neutral-800 text-neutral-500"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <Lock className="w-4 h-4" />
                          <span>Kuisioner Ditutup Sementara</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ============================================================== */}
          {/* THREE PILLARS                                                  */}
          {/* ============================================================== */}
          <div
            className="mt-14 pt-10 border-t"
            style={{ borderColor: isDark ? "#232034" : "#E2E8F0" }}
          >
            <div className="text-center mb-8">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                Pilar Program GALAXY
              </span>
              <h3
                className={`text-base sm:text-lg font-bold tracking-tight mt-1.5 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Komitmen Kami untuk Keluarga Indonesia
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div
                className={`p-6 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-[#111019] border-[#232034]"
                    : "bg-white border-slate-200 shadow-xs"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-3.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4
                  className="text-sm sm:text-base font-bold mb-1.5"
                  style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                >
                  Kehadiran Emosional
                </h4>
                <p
                  className="text-xs sm:text-[13px] font-medium leading-relaxed"
                  style={{ color: isDark ? "#CBD5E1" : "#334155" }}
                >
                  Menekankan bahwa kehadiran emosional orang tua sama pentingnya dengan pemenuhan kebutuhan materi.
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-[#111019] border-[#232034]"
                    : "bg-white border-slate-200 shadow-xs"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-3.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h4
                  className="text-sm sm:text-base font-bold mb-1.5"
                  style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                >
                  Komunikasi Dua Arah
                </h4>
                <p
                  className="text-xs sm:text-[13px] font-medium leading-relaxed"
                  style={{ color: isDark ? "#CBD5E1" : "#334155" }}
                >
                  Menciptakan ruang dialog terbuka agar rumah menjadi *safe space* bagi anak tanpa takut dihakimi.
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-[#111019] border-[#232034]"
                    : "bg-white border-slate-200 shadow-xs"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4
                  className="text-sm sm:text-base font-bold mb-1.5"
                  style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                >
                  Saling Memahami
                </h4>
                <p
                  className="text-xs sm:text-[13px] font-medium leading-relaxed"
                  style={{ color: isDark ? "#CBD5E1" : "#334155" }}
                >
                  Menjembatani perbedaan persepsi antar generasi sehingga relasi orang tua dan anak semakin erat.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================== */}
      {/* FOOTER                                                         */}
      {/* ============================================================== */}
      <footer
        className={`border-t py-6 px-4 sm:px-6 transition-colors ${
          isDark ? "border-[#232034] bg-[#0A0A0E]" : "border-slate-200 bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Program GALAXY
            </span>
            <span>&copy; 2026</span>
            <span>&bull;</span>
            <span>Kuisioner Intervensi Hubungan Keluarga</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/orangtua"
              className="hover:text-purple-600 transition-colors"
            >
              /orangtua
            </Link>
            <Link
              href="/anak"
              className="hover:text-purple-600 transition-colors"
            >
              /anak
            </Link>
            <Link
              href="/login"
              className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
            >
              Login Administrator
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
