"use client";

import React, { useState } from "react";
import {
  X,
  FileSpreadsheet,
  Printer,
  FileCode,
  Users,
  HeartHandshake,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { SurveyResponseItem, filterResponsesByScope } from "@/lib/dummyResponses";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  responsesList: SurveyResponseItem[];
  onExportExcel: (scope: "all" | "orangtua" | "anak") => void;
  onExportCSV: (scope: "all" | "orangtua" | "anak") => void;
  onExportJSON: (scope: "all" | "orangtua" | "anak") => void;
  onPrint: (scope: "all" | "orangtua" | "anak") => void;
  isDark: boolean;
}

export default function ExportModal({
  isOpen,
  onClose,
  responsesList,
  onExportExcel,
  onExportCSV,
  onExportJSON,
  onPrint,
  isDark,
}: ExportModalProps) {
  const [selectedScope, setSelectedScope] = useState<"all" | "orangtua" | "anak">("all");
  const [selectedFormat, setSelectedFormat] = useState<"excel" | "print" | "csv" | "json">("excel");

  if (!isOpen) return null;

  const totalCount = responsesList.length;
  const ortuCount = filterResponsesByScope(responsesList, "orangtua").length;
  const anakCount = filterResponsesByScope(responsesList, "anak").length;

  const activeCount =
    selectedScope === "orangtua"
      ? ortuCount
      : selectedScope === "anak"
      ? anakCount
      : totalCount;

  const handleExecute = () => {
    if (selectedFormat === "excel") {
      onExportExcel(selectedScope);
      onClose();
    } else if (selectedFormat === "print") {
      onPrint(selectedScope);
      onClose();
    } else if (selectedFormat === "csv") {
      onExportCSV(selectedScope);
      onClose();
    } else if (selectedFormat === "json") {
      onExportJSON(selectedScope);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className={`max-w-xl w-full rounded-3xl border shadow-2xl p-6 sm:p-7 space-y-6 transition-all ${
          isDark
            ? "bg-[#111019] border-[#2A263D] text-white"
            : "bg-white border-neutral-200 text-neutral-900"
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-200 dark:border-[#232034]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Ekspor &amp; Cetak Laporan</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-neutral-950 dark:text-white">
              Unduh Rekapitulasi Respon
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Pilih cakupan responden dan format berkas yang Anda butuhkan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#1A1826] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* LANGKAH 1: PILIH SUMBER KUISIONER                              */}
        {/* ============================================================== */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              1. Pilih Sumber Kuisioner
            </span>
            <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
              {activeCount} data dipilih
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Opsi 1: Semua Kuisioner */}
            <button
              type="button"
              onClick={() => setSelectedScope("all")}
              className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                selectedScope === "all"
                  ? isDark
                    ? "border-purple-500 bg-purple-950/30 text-white shadow-xs"
                    : "border-purple-600 bg-purple-50/80 text-purple-950 shadow-2xs font-bold"
                  : isDark
                  ? "border-[#252136] bg-[#161422] text-neutral-300 hover:border-neutral-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Users className={`w-4 h-4 ${selectedScope === "all" ? "text-purple-600" : "text-neutral-400"}`} />
                {selectedScope === "all" && (
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <div className="font-bold text-xs">Semua (Keduanya)</div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Orang Tua &amp; Anak
              </div>
              <div className="mt-2 inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-200/60 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                {totalCount} Respon
              </div>
            </button>

            {/* Opsi 2: Orang Tua Saja */}
            <button
              type="button"
              onClick={() => setSelectedScope("orangtua")}
              className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                selectedScope === "orangtua"
                  ? isDark
                    ? "border-purple-500 bg-purple-950/30 text-white shadow-xs"
                    : "border-purple-600 bg-purple-50/80 text-purple-950 shadow-2xs font-bold"
                  : isDark
                  ? "border-[#252136] bg-[#161422] text-neutral-300 hover:border-neutral-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <HeartHandshake className={`w-4 h-4 ${selectedScope === "orangtua" ? "text-purple-600" : "text-neutral-400"}`} />
                {selectedScope === "orangtua" && (
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <div className="font-bold text-xs">Orang Tua Saja</div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Jalur /orangtua
              </div>
              <div className="mt-2 inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                {ortuCount} Respon
              </div>
            </button>

            {/* Opsi 3: Anak Saja */}
            <button
              type="button"
              onClick={() => setSelectedScope("anak")}
              className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                selectedScope === "anak"
                  ? isDark
                    ? "border-purple-500 bg-purple-950/30 text-white shadow-xs"
                    : "border-purple-600 bg-purple-50/80 text-purple-950 shadow-2xs font-bold"
                  : isDark
                  ? "border-[#252136] bg-[#161422] text-neutral-300 hover:border-neutral-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <GraduationCap className={`w-4 h-4 ${selectedScope === "anak" ? "text-purple-600" : "text-neutral-400"}`} />
                {selectedScope === "anak" && (
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <div className="font-bold text-xs">Anak / Remaja</div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Jalur /anak
              </div>
              <div className="mt-2 inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                {anakCount} Respon
              </div>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LANGKAH 2: PILIH FORMAT BERKAS                                 */}
        {/* ============================================================== */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            2. Pilih Format Berkas
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Format Excel (.xlsx) */}
            <button
              type="button"
              onClick={() => setSelectedFormat("excel")}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                selectedFormat === "excel"
                  ? isDark
                    ? "border-emerald-500 bg-emerald-950/20 text-white shadow-xs"
                    : "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-2xs font-bold"
                  : isDark
                  ? "border-[#252136] bg-[#161422] text-neutral-300 hover:border-neutral-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 shrink-0 mt-0.5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-1.5">
                  <div className="font-bold text-xs">Microsoft Excel (.xlsx)</div>
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                    Resmi
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                  Langsung dibuka di Excel tanpa error delimiter. Mendukung multi-sheet &amp; kolom pertanyaan rapi.
                </p>
              </div>
            </button>

            {/* Cetak / Print Laporan Resmi */}
            <button
              type="button"
              onClick={() => setSelectedFormat("print")}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                selectedFormat === "print"
                  ? isDark
                    ? "border-purple-500 bg-purple-950/20 text-white shadow-xs"
                    : "border-purple-600 bg-purple-50/70 text-purple-950 shadow-2xs font-bold"
                  : isDark
                  ? "border-[#252136] bg-[#161422] text-neutral-300 hover:border-neutral-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 shrink-0 mt-0.5">
                <Printer className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="font-bold text-xs">Cetak Dokumen Resmi (Print / PDF)</div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                  Format kop surat resmi Program GALAXY. Bebas dari tombol web, siap cetak atau simpan PDF rapi.
                </p>
              </div>
            </button>

            {/* Universal CSV */}
            <button
              type="button"
              onClick={() => setSelectedFormat("csv")}
              className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                selectedFormat === "csv"
                  ? isDark
                    ? "border-blue-500 bg-blue-950/20 text-white shadow-xs"
                    : "border-blue-600 bg-blue-50/70 text-blue-950 shadow-2xs font-bold"
                  : isDark
                  ? "border-[#252136] bg-[#161422] text-neutral-300 hover:border-neutral-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <div className="p-1.5 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 shrink-0 mt-0.5">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="font-bold text-xs">Universal CSV (.csv)</div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                  Teks pemisah koma standar universal untuk import/export spreadsheet umum.
                </p>
              </div>
            </button>

            {/* Struktur Raw JSON */}
            <button
              type="button"
              onClick={() => setSelectedFormat("json")}
              className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                selectedFormat === "json"
                  ? isDark
                    ? "border-amber-500 bg-amber-950/20 text-white shadow-xs"
                    : "border-amber-600 bg-amber-50/70 text-amber-950 shadow-2xs font-bold"
                  : isDark
                  ? "border-[#252136] bg-[#161422] text-neutral-300 hover:border-neutral-700"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <div className="p-1.5 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 shrink-0 mt-0.5">
                <FileCode className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="font-bold text-xs">Format Data JSON (.json)</div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                  Struktur objek JSON mentah untuk arsip teknis database atau integrasi API.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-neutral-200 dark:border-[#232034] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
            <span>Akan memproses </span>
            <strong className="text-neutral-900 dark:text-white font-bold">
              {activeCount} respon
            </strong>
            <span> ke format </span>
            <strong className="text-purple-600 dark:text-purple-400 font-bold uppercase">
              {selectedFormat === "excel"
                ? "Excel (.xlsx)"
                : selectedFormat === "print"
                ? "Cetak Dokumen"
                : selectedFormat === "csv"
                ? "CSV"
                : "JSON"}
            </strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                isDark
                  ? "border-[#2A263D] text-neutral-300 hover:text-white hover:bg-[#1A1826]"
                  : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleExecute}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"
            >
              {selectedFormat === "print" ? "Buka Dialog Cetak" : "Unduh Berkas Sekarang"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
