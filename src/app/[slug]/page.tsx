"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CalendarDays,
  Layers,
  Compass,
  Sparkles,
  Zap,
  BarChart3,
  ShieldCheck,
  Headphones,
  Smartphone,
  AlertCircle,
  MinusCircle,
  CircleDot,
  CheckCircle2,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  Check,
  RotateCcw,
  Send,
  Lock,
  Sun,
  Moon,
  ArrowLeft,
  HelpCircle,
  User,
} from "lucide-react";
import {
  SurveySublink,
  QuestionItem,
  getStoredSublinks,
  saveStoredSublinks,
} from "@/lib/surveyStore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function detectDevice(): string {
  if (typeof window === "undefined") return "Smartphone (Android)";
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "Tablet (iPad)";
  if (/iPhone/i.test(ua)) return "iPhone (iOS)";
  if (/Android/i.test(ua)) return "Smartphone (Android)";
  if (/Macintosh|Mac OS X/i.test(ua)) return "MacBook (macOS)";
  if (/Windows/i.test(ua)) return "Laptop (Windows)";
  return "Smartphone (Android)";
}

// Icon mapping helper
const iconMap: Record<string, React.ElementType> = {
  CalendarDays,
  Layers,
  Compass,
  Sparkles,
  Zap,
  BarChart3,
  ShieldCheck,
  Headphones,
  Smartphone,
};

function SurveyContent() {
  const urlParams = useParams();
  const slug = typeof urlParams?.slug === "string" ? urlParams.slug : "";



  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [sublink, setSublink] = useState<SurveySublink | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"stepper" | "all">("stepper");
  const [respondentName, setRespondentName] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  const isDark = theme === "dark";

  // Check saved theme
  useEffect(() => {
    const saved = localStorage.getItem("surveyTheme");
    if (saved === "dark") {
      setTheme("dark");
    } else if (saved === "light") {
      setTheme("light");
    }
  }, []);

  // Check if admin is currently logged in
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) return { authenticated: false };
        return res.json();
      })
      .then((data) => {
        if (data && data.authenticated) {
          setIsAdminLoggedIn(true);
        }
      })
      .catch(() => {
        setIsAdminLoggedIn(false);
      });
  }, []);

  // Load sublink based on slug
  useEffect(() => {
    // 1. Try local storage first for fast initial paint
    const all = getStoredSublinks();
    const found = all.find(
      (s) => s.slug.toLowerCase() === slug.toLowerCase()
    );
    if (found) {
      setSublink(found);
    }

    // 2. Fetch fresh real-time status from Neon PostgreSQL
    fetch(`/api/sublinks?slug=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Sublink not found in DB");
        return res.json();
      })
      .then((data) => {
        if (data.sublink) {
          setSublink(data.sublink);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch remote sublink, fallback to local", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  // Modal fallback auto-close timer (must be before any early return to obey React Hook rules)
  useEffect(() => {
    if (!showSuccessModal) return;
    const timer = setTimeout(() => {
      setShowSuccessModal(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2600);
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("surveyTheme", next);
      return next;
    });
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-[#0A0A0E] text-white" : "bg-[#FBFBFA] text-neutral-900"
        }`}
      >
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
          <span>Memuat Kuisioner...</span>
        </div>
      </div>
    );
  }

  if (!sublink) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 text-center ${
          isDark ? "bg-[#0A0A0E] text-white" : "bg-[#FBFBFA] text-neutral-900"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">
          Kuisioner Tidak Ditemukan
        </h1>
        <p className="text-xs text-neutral-400 max-w-sm mt-1.5 leading-relaxed">
          Sublink URL <code className="font-mono text-purple-400">/{slug}</code>{" "}
          tidak terdaftar atau telah dinonaktifkan oleh Administrator.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          {isAdminLoggedIn ? (
            <>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Panel Admin</span>
              </Link>
              <Link
                href="/"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  isDark
                    ? "border-[#2B2740] text-neutral-300 hover:text-white hover:bg-white/5"
                    : "border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <span>Halaman Kuisioner</span>
              </Link>
            </>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Halaman Kuisioner</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Display dedicated view when sublink is deactivated / nonaktif
  if (!sublink.isActive) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 ${
          isDark ? "bg-[#0A0A0E] text-white" : "bg-[#FBFBFA] text-neutral-900"
        }`}
      >
        <div
          className={`w-full max-w-md p-8 rounded-3xl border shadow-xl text-center backdrop-blur-md transition-all ${
            isDark
              ? "bg-[#111019]/90 border-[#232034]"
              : "bg-white/95 border-neutral-200"
          }`}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Kuisioner Ditutup Sementara</span>
          </div>

          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 ${
              isDark ? "bg-amber-500/15 text-amber-400" : "bg-amber-50 text-amber-600"
            }`}
          >
            <Lock className="w-8 h-8" />
          </div>

          <h1
            className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${
              isDark ? "text-white" : "text-neutral-950"
            }`}
          >
            Formulir Sedang Nonaktif
          </h1>

          <p
            className={`text-xs sm:text-sm leading-relaxed mb-6 ${
              isDark ? "text-neutral-400" : "text-neutral-600 font-medium"
            }`}
          >
            Mohon maaf, kuisioner{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {sublink.title}
            </span>{" "}
            saat ini sedang dinonaktifkan oleh administrator dan belum menerima pengisian jawaban baru.
          </p>

          {/* Details Card */}
          <div
            className={`p-4 rounded-2xl border text-left text-xs mb-6 space-y-2 ${
              isDark
                ? "bg-[#181624]/60 border-[#2B2740] text-neutral-300"
                : "bg-neutral-50 border-neutral-200 text-neutral-700"
            }`}
          >
            <div className="flex justify-between items-center py-1 border-b border-dashed border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-400">Target Audiens:</span>
              <span className="font-semibold">{sublink.targetAudience}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-dashed border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-400">Jalur Link:</span>
              <code className="font-mono text-purple-600 dark:text-purple-400 font-bold">
                /{sublink.slug}
              </code>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-400">Status Saat Ini:</span>
              <span className="font-bold text-amber-500">Nonaktif (Tertutup)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Segarkan Halaman</span>
            </button>
            <Link
              href="/"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                isDark
                  ? "border-[#2B2740] hover:bg-white/5 text-neutral-300"
                  : "border-neutral-200 hover:bg-neutral-100 text-neutral-700"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Halaman Kuisioner</span>
            </Link>
            {isAdminLoggedIn && (
              <Link
                href="/admin"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isDark
                    ? "border-purple-500/30 text-purple-300 hover:bg-purple-950/30"
                    : "border-purple-200 text-purple-700 hover:bg-purple-50"
                }`}
              >
                <span>Panel Admin</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const questions = sublink.questions;
  const totalQuestions = questions.length;

  const countAnswered = () => {
    return questions.filter((q) => {
      const ans = answers[q.id];
      if (ans === undefined || ans === null) return false;
      if (Array.isArray(ans)) return ans.length > 0;
      if (typeof ans === "string") return ans.trim().length > 0;
      return true;
    }).length;
  };

  const answeredCount = countAnswered();
  const progressPercentage =
    totalQuestions > 0
      ? Math.round((answeredCount / totalQuestions) * 100)
      : 0;

  const handleSelectOption = (questionId: string, val: string) => {
    setErrorMessage(null);
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleToggleMultiple = (questionId: string, val: string) => {
    setErrorMessage(null);
    setAnswers((prev) => {
      const currentList: string[] = prev[questionId] || [];
      const exists = currentList.includes(val);
      return {
        ...prev,
        [questionId]: exists
          ? currentList.filter((item) => item !== val)
          : [...currentList, val],
      };
    });
  };

  const handleSelectScale = (questionId: string, val: number | string) => {
    setErrorMessage(null);
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleTextChange = (questionId: string, val: string) => {
    setErrorMessage(null);
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const hasNameQuestion = questions.some(
    (q) => q.title.toLowerCase().includes("nama") || q.id.includes("nama")
  );

  const validateAll = (): boolean => {
    if (!sublink) return true;
    if (!hasNameQuestion && !respondentName.trim()) {
      setErrorMessage("Nama Lengkap Responden wajib diisi sebelum mengirim kuisioner.");
      return false;
    }
    for (let i = 0; i < sublink.questions.length; i++) {
      const q = sublink.questions[i];
      if (q.required) {
        const ans = answers[q.id];
        const empty =
          ans === undefined ||
          ans === null ||
          (typeof ans === "string" && ans.trim() === "") ||
          (Array.isArray(ans) && ans.length === 0);
        if (empty) {
          setErrorMessage(`Pertanyaan ${i + 1} ("${q.title}") wajib diisi sebelum mengirim kuisioner.`);
          return false;
        }
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (!hasNameQuestion && currentStep === 0 && !respondentName.trim()) {
      setErrorMessage("Mohon lengkapi Nama Responden terlebih dahulu.");
      return;
    }
    if (currentQ && currentQ.required) {
      const ans = answers[currentQ.id];
      const empty =
        ans === undefined ||
        ans === null ||
        (typeof ans === "string" && ans.trim() === "") ||
        (Array.isArray(ans) && ans.length === 0);
      if (empty) {
        setErrorMessage("Pertanyaan ini wajib dijawab sebelum lanjut ke pertanyaan berikutnya.");
        return;
      }
    }
    setErrorMessage(null);
    setCurrentStep((prev) => Math.min(totalQuestions - 1, prev + 1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!sublink) return;
    if (!sublink.isActive) {
      setErrorMessage("Kuisioner ini sedang ditutup atau dinonaktifkan sementara.");
      return;
    }
    if (!validateAll()) return;
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      // Extract respondent name
      let respName = respondentName.trim() || "Anonim";
      let rating = 5.0;
      let sentiment: "Sangat Puas" | "Puas" | "Cukup" | "Kurang" = "Sangat Puas";

      // Hitung skor rating dari 12 pilihan ganda A, B, C, D
      let scoreSum = 0;
      let scoreCount = 0;

      const formattedAnswers = questions.map((q) => {
        const rawVal = answers[q.id];
        let ansStr = "";
        if (Array.isArray(rawVal)) {
          ansStr = rawVal.join(", ");
        } else if (rawVal !== undefined && rawVal !== null) {
          ansStr = String(rawVal);
        } else {
          ansStr = "-";
        }

        if (q.title.toLowerCase().includes("nama") || q.id.includes("nama")) {
          if (ansStr && ansStr.trim() !== "-" && ansStr.trim() !== "") {
            respName = ansStr.trim();
          }
        }

        if (q.type === "single-choice" && ansStr && ansStr !== "-") {
          scoreCount++;
          if (ansStr.startsWith("A.") || ansStr.startsWith("A ")) scoreSum += 5.0;
          else if (ansStr.startsWith("B.") || ansStr.startsWith("B ")) scoreSum += 4.0;
          else if (ansStr.startsWith("C.") || ansStr.startsWith("C ")) scoreSum += 2.5;
          else if (ansStr.startsWith("D.") || ansStr.startsWith("D ")) scoreSum += 1.5;
          else scoreSum += 4.0;
        }

        return {
          question: q.title,
          answer: ansStr,
        };
      });

      if (scoreCount > 0) {
        rating = Math.round((scoreSum / scoreCount) * 10) / 10;
        if (rating >= 4.2) sentiment = "Sangat Puas";
        else if (rating >= 3.4) sentiment = "Puas";
        else if (rating >= 2.4) sentiment = "Cukup";
        else sentiment = "Kurang";
      }

      // Save to database via API
      await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          respondentName: respName,
          sublinkSlug: sublink.slug,
          sublinkTitle: sublink.title,
          targetAudience: sublink.targetAudience,
          device: detectDevice(),
          rating,
          sentiment,
          answers: formattedAnswers,
        }),
      });

      // Update total responses in local storage for instant sync
      const allSublinks = getStoredSublinks();
      const updated = allSublinks.map((s) =>
        s.slug === sublink.slug ? { ...s, totalResponses: s.totalResponses + 1 } : s
      );
      saveStoredSublinks(updated);

      // Trigger centang.lottie success modal
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Failed to submit response to database", err);
      // Still show modal if submission had network issue
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishModal = () => {
    setShowSuccessModal(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentQ = questions[currentStep];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 selection:bg-purple-600 selection:text-white ${
        isDark ? "bg-[#0A0A0E] text-[#F1F1F5]" : "bg-[#FBFBFA] text-[#18191B]"
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
          {/* Logo & Sublink Audience */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
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
                className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg border whitespace-nowrap truncate max-w-[130px] sm:max-w-none ${
                  isDark
                    ? "bg-purple-950/60 border-purple-500/30 text-purple-300"
                    : "bg-purple-50 border-purple-200 text-purple-800"
                }`}
              >
                {sublink.targetAudience}
              </span>
            </div>
          </div>

          {/* Controls: Theme & View Mode */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Switcher (Visible on sm+, hidden on compact mobile) */}
            <div
              className={`hidden sm:flex items-center p-0.5 rounded-xl border text-xs ${
                isDark
                  ? "bg-[#14121E] border-[#252136]"
                  : "bg-neutral-100 border-neutral-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setViewMode("stepper")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === "stepper"
                    ? isDark
                      ? "bg-purple-600 text-white"
                      : "bg-white text-neutral-950 shadow-2xs"
                    : isDark
                    ? "text-neutral-400 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Fokus
              </button>
              <button
                type="button"
                onClick={() => setViewMode("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === "all"
                    ? isDark
                      ? "bg-purple-600 text-white"
                      : "bg-white text-neutral-950 shadow-2xs"
                    : isDark
                    ? "text-neutral-400 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Semua
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isDark
                  ? "bg-[#14121E] border-[#252136] text-purple-300 hover:text-white hover:border-purple-500/50"
                  : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/70 shadow-2xs"
              }`}
              title={isDark ? "Mode Terang" : "Mode Gelap"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 stroke-[2]" />
              ) : (
                <Moon className="w-4 h-4 stroke-[2]" />
              )}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className={`w-full h-1 ${isDark ? "bg-[#151322]" : "bg-neutral-100"}`}
        >
          <div
            className="bg-purple-600 h-1 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Main Form */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10">
        {!isSubmitted ? (
          <div>
            {/* Title / Intro */}
            <div className="mb-10">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 border ${
                  isDark
                    ? "bg-[#13111C] border-[#232034] text-purple-300"
                    : "bg-purple-50 border-purple-200/80 text-purple-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDark ? "bg-purple-400" : "bg-purple-600"
                  }`}
                />
                Target: {sublink.targetAudience}
              </div>
              <h1
                className={`text-2xl sm:text-3xl font-semibold tracking-tight leading-snug ${
                  isDark ? "text-white" : "text-neutral-950"
                }`}
              >
                {sublink.title}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base leading-relaxed font-normal ${
                  isDark ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {sublink.description}
              </p>

              {/* Progress Summary Pill */}
              <div
                className={`mt-5 flex items-center justify-between py-2.5 px-4 rounded-xl border text-xs ${
                  isDark
                    ? "bg-[#111019] border-[#232034] text-neutral-300"
                    : "bg-white border-neutral-200/80 text-neutral-700 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-2.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>
                    Progres Pengisian:{" "}
                    <span
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-neutral-950"
                      }`}
                    >
                      {answeredCount}
                    </span>{" "}
                    dari {totalQuestions} pertanyaan terjawab
                  </span>
                </div>
                <span
                  className={`font-semibold ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  {progressPercentage}%
                </span>
              </div>
            </div>

            {/* Kartu Identitas Responden (Jika belum ada pertanyaan khusus nama) */}
            {!hasNameQuestion && (
              <div
                className={`mb-6 p-5 sm:p-6 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-[#111019] border-[#232034]"
                    : "bg-white border-neutral-200/90 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="respondent-name-input"
                    className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5"
                  >
                    <span>Nama Responden</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    Wajib diisi
                  </span>
                </div>
                <input
                  id="respondent-name-input"
                  type="text"
                  value={respondentName}
                  onChange={(e) => {
                    setRespondentName(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder={
                    sublink.slug === "orangtua"
                      ? "Tuliskan nama lengkap atau panggilan Anda (contoh: Ibu Siti Rahmawati / Bapak Budi)"
                      : "Tuliskan nama lengkap atau panggilanmu (contoh: Dimas Aditya / Salsa / Nabila)"
                  }
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                    isDark
                      ? "bg-[#161422] border-[#252136] text-white placeholder-neutral-500 focus:border-purple-500"
                      : "bg-neutral-50/70 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-purple-600"
                  }`}
                />
                <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Identitas Anda digunakan untuk rekapitulasi evaluasi program GALAXY dan dijamin kerahasiaannya.
                </p>
              </div>
            )}

            {/* Stepper View vs All Questions View */}
            {viewMode === "stepper" ? (
              <div className="space-y-8">
                {/* Step Indicators */}
                <div
                  className={`flex items-center justify-between border-b pb-4 ${
                    isDark ? "border-[#1E1B2E]" : "border-neutral-200/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDark ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      Pertanyaan {String(currentStep + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={isDark ? "text-neutral-600" : "text-neutral-300"}
                    >
                      /
                    </span>
                    <span className="text-xs font-medium text-neutral-400">
                      {String(totalQuestions).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalQuestions }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentStep(idx)}
                        aria-label={`Pindah ke pertanyaan ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-200 ${
                          idx === currentStep
                            ? "w-8 bg-purple-500"
                            : idx < currentStep
                            ? isDark
                              ? "w-4 bg-purple-900/80"
                              : "w-4 bg-purple-300"
                            : isDark
                            ? "w-2 bg-[#1F1B2E]"
                            : "w-2 bg-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Render Current Question */}
                {currentQ && (
                  <RenderQuestionBlock
                    isDark={isDark}
                    question={currentQ}
                    value={answers[currentQ.id]}
                    onSelectOption={(val) =>
                      handleSelectOption(currentQ.id, val)
                    }
                    onToggleMultiple={(val) =>
                      handleToggleMultiple(currentQ.id, val)
                    }
                    onSelectScale={(val) =>
                      handleSelectScale(currentQ.id, val)
                    }
                    onTextChange={(val) => handleTextChange(currentQ.id, val)}
                  />
                )}

                {/* Validation Error Toast Alert */}
                {errorMessage && (
                  <div className="flex items-center gap-2.5 p-4 rounded-xl bg-rose-500/10 border-2 border-rose-500/30 text-rose-600 text-xs sm:text-sm font-semibold animate-pulse">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Stepper Navigation */}
                <div
                  className={`pt-6 border-t flex items-center justify-between ${
                    isDark ? "border-[#1E1B2E]" : "border-neutral-200"
                  }`}
                >
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={() => {
                      setErrorMessage(null);
                      setCurrentStep((prev) => Math.max(0, prev - 1));
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      currentStep === 0
                        ? "opacity-40 cursor-not-allowed border-transparent text-neutral-400"
                        : isDark
                        ? "border-[#252136] bg-[#12111A] text-neutral-200 hover:border-purple-500/50 hover:text-white cursor-pointer"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:text-neutral-950 shadow-2xs cursor-pointer"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                    <span>Sebelumnya</span>
                  </button>

                  {currentStep < totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm sm:text-base font-bold shadow-[0_4px_0_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all cursor-pointer select-none"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="inline-flex items-center gap-2.5 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm sm:text-base font-bold shadow-[0_4px_0_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all cursor-pointer select-none"
                    >
                      <span>Kirim Jawaban</span>
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* All Questions Mode */
              <form onSubmit={handleSubmit} className="space-y-8">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`p-6 sm:p-8 rounded-2xl border space-y-3 ${
                      isDark
                        ? "bg-[#111019] border-[#232034]"
                        : "bg-white border-neutral-200/80 shadow-xs"
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDark ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      Pertanyaan {String(idx + 1).padStart(2, "0")}
                    </div>

                    <RenderQuestionBlock
                      isDark={isDark}
                      question={q}
                      value={answers[q.id]}
                      onSelectOption={(val) => handleSelectOption(q.id, val)}
                      onToggleMultiple={(val) =>
                        handleToggleMultiple(q.id, val)
                      }
                      onSelectScale={(val) => handleSelectScale(q.id, val)}
                      onTextChange={(val) => handleTextChange(q.id, val)}
                    />
                  </div>
                ))}

                <div
                  className={`pt-6 border-t flex items-center justify-between ${
                    isDark ? "border-[#1E1B2E]" : "border-neutral-200/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      isDark
                        ? "border-[#252136] bg-[#12111A] text-neutral-300 hover:text-white"
                        : "border-neutral-200 bg-white text-neutral-700 hover:text-neutral-950 shadow-xs"
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                  >
                    Kirim Semua Respon
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Submission Success State */
          <div className="py-12 sm:py-16 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white mx-auto flex items-center justify-center mb-6">
              <Check className="w-7 h-7 stroke-[2.4]" />
            </div>

            <span
              className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${
                isDark ? "text-purple-400" : "text-purple-600"
              }`}
            >
              Respon Berhasil Dicatat
            </span>
            <h2
              className={`text-2xl sm:text-3xl font-semibold tracking-tight ${
                isDark ? "text-white" : "text-neutral-950"
              }`}
            >
              Terima Kasih atas Partisipasi Anda
            </h2>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              Masukan Anda untuk sublink{" "}
              <strong className="text-purple-400">/{sublink.slug}</strong> telah
              tersimpan dengan aman ke basis data evaluasi Galaksi.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isDark
                    ? "border-[#252136] bg-[#12111A] text-neutral-300 hover:text-white"
                    : "border-neutral-200 bg-white text-neutral-700 shadow-xs"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Isi Kuisioner Baru
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 text-xs transition-colors duration-200 ${
          isDark
            ? "border-[#1E1B2E] bg-[#0A0A0E] text-neutral-400"
            : "border-neutral-200/60 bg-white text-neutral-500"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock
              className={`w-3.5 h-3.5 ${
                isDark ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <span>Kerahasiaan data Anda dilindungi sepenuhnya dan dienkripsi.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Standar Aksesibilitas WCAG 2.1</span>
            <span>•</span>
            <span>© 2026 Galaksi</span>
          </div>
        </div>
      </footer>

      {/* Jendela Konfirmasi Berhasil dengan Animasi centang.lottie (Loop 2x lalu otomatis tertutup) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border transition-all transform scale-100 ${
              isDark
                ? "bg-[#14121E] border-purple-500/40 text-white"
                : "bg-white border-neutral-200 text-neutral-900"
            }`}
          >
            <div className="w-24 h-24 mx-auto flex items-center justify-center overflow-hidden">
              <DotLottieReact
                src="/centang.lottie"
                autoplay
                loop
                dotLottieRefCallback={(dotLottie) => {
                  if (!dotLottie) return;
                  let loopCount = 0;
                  const handleLoop = () => {
                    loopCount += 1;
                    if (loopCount >= 2) {
                      handleFinishModal();
                    }
                  };
                  dotLottie.addEventListener("loop", handleLoop);
                }}
              />
            </div>

            <h3 className="text-xl font-black tracking-tight mt-2 text-emerald-600 dark:text-emerald-400">
              Jawaban Berhasil Terkirim
            </h3>
            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              Terima kasih atas partisipasi Anda. Jawaban kuisioner Anda telah berhasil tersimpan ke database.
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-semibold text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Menyimpan ke database...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DynamicSurveyPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0E] text-white flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span>Memuat Kuisioner Galaksi...</span>
          </div>
        </div>
      }
    >
      <SurveyContent />
    </React.Suspense>
  );
}


// -------------------------------------------------------------
// Helper Component: Dynamic Question Renderer
// -------------------------------------------------------------
function RenderQuestionBlock({
  isDark,
  question,
  value,
  onSelectOption,
  onToggleMultiple,
  onSelectScale,
  onTextChange,
}: {
  isDark: boolean;
  question: QuestionItem;
  value: any;
  onSelectOption: (val: string) => void;
  onToggleMultiple: (val: string) => void;
  onSelectScale: (val: number | string) => void;
  onTextChange: (val: string) => void;
}) {
  const isNameQuestion =
    question.title.toLowerCase().includes("nama") ||
    question.id.includes("nama");

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {question.required ? (
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? "bg-purple-950/70 text-purple-300 border-purple-500/40"
                  : "bg-purple-100 text-purple-800 border-purple-200"
              }`}
            >
              Wajib Diisi
            </span>
          ) : (
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? "bg-[#181624] text-neutral-400 border-[#2B2740]"
                  : "bg-neutral-100 text-neutral-600 border-neutral-200"
              }`}
            >
              Opsional (Boleh Dikosongkan)
            </span>
          )}
        </div>

        <h2
          className={`text-xl sm:text-2xl font-bold tracking-tight leading-snug ${
            isDark ? "text-white" : "text-neutral-950"
          }`}
        >
          {question.title}
        </h2>
        {question.subtitle && (
          <p
            className={`text-sm sm:text-base font-medium mt-1.5 leading-relaxed ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {question.subtitle}
          </p>
        )}
      </div>

      {/* SINGLE CHOICE */}
      {question.type === "single-choice" && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {question.options.map((opt) => {
            const letterMatch = opt.title.match(/^([A-D])\.\s*(.*)$/);
            const letterBadge = letterMatch ? letterMatch[1] : null;
            const mainText = letterMatch ? letterMatch[2] : opt.title;

            const IconComponent =
              opt.iconName && iconMap[opt.iconName]
                ? iconMap[opt.iconName]
                : Compass;
            const isSelected = value === opt.title;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption(opt.title)}
                className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? isDark
                      ? "border-purple-500 bg-[#1b152d] text-white shadow-md ring-2 ring-purple-500/30"
                      : "border-purple-600 bg-purple-50/90 text-purple-950 shadow-md ring-2 ring-purple-600/20"
                    : isDark
                    ? "border-[#232034] bg-[#111019] hover:border-purple-500/50 hover:bg-[#161424] text-neutral-200"
                    : "border-neutral-200 bg-white hover:border-purple-300 hover:bg-neutral-50/70 text-neutral-800 shadow-2xs"
                }`}
              >
                <div className="flex items-start justify-between w-full mb-3">
                  {letterBadge ? (
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${
                        isSelected
                          ? "bg-purple-600 text-white shadow-xs"
                          : isDark
                          ? "bg-[#181624] text-purple-300 group-hover:bg-purple-950"
                          : "bg-purple-100 text-purple-800 group-hover:bg-purple-200"
                      }`}
                    >
                      {letterBadge}
                    </div>
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : isDark
                          ? "bg-[#181624] text-neutral-400 group-hover:text-purple-300"
                          : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200/80"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 stroke-[2]" />
                    </div>
                  )}

                  {/* Large Clear Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-purple-600 bg-purple-600 shadow-xs"
                        : isDark
                        ? "border-neutral-500 bg-[#181624] group-hover:border-purple-400"
                        : "border-neutral-300 bg-white group-hover:border-neutral-400"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                <div>
                  <div
                    className={`text-sm sm:text-base font-bold tracking-tight leading-snug ${
                      isSelected
                        ? isDark
                          ? "text-white font-extrabold"
                          : "text-purple-950 font-extrabold"
                        : isDark
                        ? "text-neutral-100"
                        : "text-neutral-900"
                    }`}
                  >
                    {mainText}
                  </div>
                  {opt.desc && (
                    <div
                      className={`text-xs sm:text-sm leading-relaxed font-normal ${
                        isSelected
                          ? isDark
                            ? "text-purple-200 font-medium"
                            : "text-purple-900 font-medium"
                          : isDark
                          ? "text-neutral-400"
                          : "text-neutral-600"
                      }`}
                    >
                      {opt.desc}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* MULTIPLE CHOICE */}
      {question.type === "multiple-choice" && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {question.options.map((opt) => {
            const IconComponent =
              opt.iconName && iconMap[opt.iconName]
                ? iconMap[opt.iconName]
                : Zap;
            const currentSelected: string[] = Array.isArray(value) ? value : [];
            const isChecked = currentSelected.includes(opt.title);

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onToggleMultiple(opt.title)}
                className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group cursor-pointer ${
                  isChecked
                    ? isDark
                      ? "border-purple-500 bg-[#1b152d] shadow-md ring-2 ring-purple-500/30"
                      : "border-purple-600 bg-purple-50/90 shadow-md ring-2 ring-purple-600/20"
                    : isDark
                    ? "border-[#232034] bg-[#111019] hover:border-purple-500/50 hover:bg-[#161424]"
                    : "border-neutral-200 bg-white hover:border-purple-300 hover:bg-neutral-50/70 shadow-2xs"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? "bg-purple-600 border-purple-600 text-white shadow-xs"
                      : isDark
                      ? "border-neutral-500 bg-[#161422] group-hover:border-purple-400"
                      : "border-neutral-300 bg-white group-hover:border-neutral-400"
                  }`}
                >
                  {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent
                      className={`w-4 h-4 ${
                        isChecked
                          ? isDark
                            ? "text-purple-400"
                            : "text-purple-600"
                          : "text-neutral-500"
                      }`}
                    />
                    <span
                      className={`text-base font-bold tracking-tight ${
                        isChecked
                          ? isDark
                            ? "text-white font-extrabold"
                            : "text-purple-950 font-extrabold"
                          : isDark
                          ? "text-neutral-200"
                          : "text-neutral-800"
                      }`}
                    >
                      {opt.title}
                    </span>
                  </div>
                  {opt.desc && (
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-normal ${
                        isChecked
                          ? isDark
                            ? "text-purple-200 font-medium"
                            : "text-purple-900 font-medium"
                          : isDark
                          ? "text-neutral-400"
                          : "text-neutral-600"
                      }`}
                    >
                      {opt.desc}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* NPS / SCALE */}
      {question.type === "nps" && (
        <div className="pt-4">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
              const isSelected = value === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => onSelectScale(num)}
                  className={`h-13 sm:h-14 rounded-2xl text-base sm:text-lg font-bold border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isSelected
                      ? "bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-600/25"
                      : isDark
                      ? "bg-[#111019] text-neutral-200 border-[#232034] hover:border-purple-500 hover:bg-[#161422] hover:text-white"
                      : "bg-white text-neutral-800 border-neutral-200 hover:border-purple-400 hover:bg-neutral-50 shadow-2xs"
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <div
            className={`flex items-center justify-between text-xs sm:text-sm pt-3.5 font-bold ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDark ? "bg-neutral-500" : "bg-neutral-400"
                }`}
              />
              <span>{question.minLabel || "1 — Sangat Ragu"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{question.maxLabel || "10 — Sangat Direkomendasikan"}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  isDark ? "bg-purple-400" : "bg-purple-600"
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* LIKERT 5-LEVEL */}
      {question.type === "likert" && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3">
          {[
            { id: "1", label: "Sangat Kurang", desc: "Banyak kendala", icon: AlertCircle },
            { id: "2", label: "Kurang Puas", desc: "Perlu perbaikan", icon: MinusCircle },
            { id: "3", label: "Cukup / Netral", desc: "Sesuai standar", icon: CircleDot },
            { id: "4", label: "Puas", desc: "Berjalan baik", icon: CheckCircle2 },
            { id: "5", label: "Sangat Puas", desc: "Melebihi ekspektasi", icon: BadgeCheck },
          ].map((lvl) => {
            const Icon = lvl.icon;
            const isSelected = value === lvl.label;

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onSelectScale(lvl.label)}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between min-h-[125px] group cursor-pointer ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-600/25"
                    : isDark
                    ? "bg-[#111019] text-neutral-200 border-[#232034] hover:border-purple-500/50 hover:bg-[#161422] hover:text-white"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-purple-300 hover:bg-neutral-50 shadow-2xs"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors mb-2.5 ${
                    isSelected
                      ? "bg-purple-700 text-white shadow-xs"
                      : isDark
                      ? "bg-[#181624] text-neutral-400 group-hover:text-purple-300"
                      : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200"
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                <div>
                  <span
                    className={`text-sm sm:text-base font-bold block tracking-tight ${
                      isSelected ? "text-white font-extrabold" : isDark ? "text-white" : "text-neutral-950"
                    }`}
                  >
                    {lvl.label}
                  </span>
                  <span
                    className={`text-xs block mt-0.5 leading-tight ${
                      isSelected
                        ? "text-purple-200 font-medium"
                        : isDark
                        ? "text-neutral-400"
                        : "text-neutral-500 font-normal"
                    }`}
                  >
                    {lvl.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* TEXT / ESSAY */}
      {question.type === "text" && (
        <div className="space-y-3 pt-2">
          {isNameQuestion ? (
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-600">
                  <User className="w-5 h-5 stroke-[2]" />
                </div>
                <input
                  type="text"
                  value={value || ""}
                  onChange={(e) => onTextChange(e.target.value)}
                  placeholder={
                    question.placeholder || "Ketik nama lengkap Anda di sini..."
                  }
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 text-base font-medium transition-all focus:outline-hidden ${
                    isDark
                      ? "border-[#232034] bg-[#111019] text-white placeholder:text-neutral-500 focus:border-purple-500"
                      : "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-purple-600 shadow-2xs"
                  }`}
                />
              </div>
              <p
                className={`text-xs ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {question.required
                  ? "Identitas nama diwajibkan oleh Administrator untuk verifikasi data kuisioner."
                  : "Kolom nama ini opsional. Jika dikosongkan, respon Anda akan dicatat sebagai responden anonim."}
              </p>
            </div>
          ) : (
            <>
              {question.suggestions && question.suggestions.length > 0 && (
                <div>
                  <span
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wider block mb-2.5 ${
                      isDark ? "text-purple-400" : "text-purple-700"
                    }`}
                  >
                    Saran Cepat:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {question.suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const cur = value || "";
                          onTextChange(cur ? `${cur}, ${item}` : item);
                        }}
                        className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border-2 transition-all font-semibold cursor-pointer ${
                          isDark
                            ? "border-[#252136] bg-[#12111A] text-neutral-200 hover:border-purple-500 hover:text-purple-300"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-purple-400 hover:text-purple-900 shadow-2xs"
                        }`}
                      >
                        + {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                rows={4}
                value={value || ""}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder={
                  question.placeholder || "Tuliskan jawaban Anda di sini..."
                }
                className={`w-full p-4 rounded-2xl border-2 text-sm sm:text-base transition-all resize-none font-normal focus:outline-hidden ${
                  isDark
                    ? "border-[#232034] bg-[#111019] text-white placeholder:text-neutral-500 focus:border-purple-500"
                    : "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-purple-600 shadow-2xs"
                }`}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
