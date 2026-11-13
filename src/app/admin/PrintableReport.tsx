"use client";

import React from "react";
import Image from "next/image";
import { SurveyResponseItem, filterResponsesByScope } from "@/lib/dummyResponses";

interface PrintableReportProps {
  responses: SurveyResponseItem[];
  scope: "all" | "orangtua" | "anak";
  adminName?: string;
}

export default function PrintableReport({
  responses,
  scope,
  adminName = "Administrator Program",
}: PrintableReportProps) {
  const filteredData = filterResponsesByScope(responses, scope);
  const total = filteredData.length;
  const ortuCount = filterResponsesByScope(responses, "orangtua").length;
  const anakCount = filterResponsesByScope(responses, "anak").length;

  const avgRating = total > 0
    ? (filteredData.reduce((acc, it) => acc + (Number(it.rating) || 0), 0) / total).toFixed(2)
    : "0.0";

  const puasCount = filteredData.filter(
    (it) => it.sentiment === "Sangat Puas" || it.sentiment === "Puas"
  ).length;
  const puasPercent = total > 0 ? Math.round((puasCount / total) * 100) : 0;

  const printDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const printTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const scopeTitle =
    scope === "orangtua"
      ? "Jalur Khusus Orang Tua / Wali Murid (/orangtua)"
      : scope === "anak"
      ? "Jalur Khusus Siswa / Remaja (/anak)"
      : "Seluruh Jalur Kuisioner (Keduanya — Orang Tua & Siswa/Anak)";

  return (
    <div className="hidden print:block w-full bg-white text-black p-2 font-sans">
      {/* ============================================================== */}
      {/* KOP RESMI LAPORAN GALAXY                                       */}
      {/* ============================================================== */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
        <div className="flex items-center gap-3.5">
          <Image
            src="/LogoGalaksi.png"
            alt="Logo Galaksi"
            width={44}
            height={44}
            className="h-10 w-auto object-contain brightness-0"
            priority
          />
          <div>
            <div className="text-sm font-black tracking-wider uppercase text-black leading-tight">
              Program Intervensi Hubungan Keluarga GALAXY
            </div>
            <div className="text-xs italic text-neutral-700 leading-tight">
              &quot;Beda Generasi, Satu Hati, Saling Memahami&quot;
            </div>
            <div className="text-[10px] text-neutral-600 mt-0.5">
              Portal Kuisioner & Evaluasi Kehadiran Emosional Keluarga
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] text-neutral-700 space-y-0.5">
          <div className="font-bold text-neutral-900 text-xs">DOKUMEN RESMI EVALUASI</div>
          <div>Tanggal: {printDate}</div>
          <div>Pukul: {printTime} WIB</div>
          <div className="font-mono text-[9px] text-neutral-500">
            REF: GLX-RPT-2026
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* JUDUL DAN DESKRIPSI LAPORAN                                   */}
      {/* ============================================================== */}
      <div className="text-center my-3">
        <h1 className="text-base font-black tracking-tight uppercase text-neutral-950">
          Laporan Rekapitulasi Hasil Evaluasi & Kuisioner
        </h1>
        <div className="inline-block mt-1 px-3 py-0.5 rounded-full border border-neutral-400 text-xs font-semibold text-neutral-800">
          {scopeTitle}
        </div>
      </div>

      {/* ============================================================== */}
      {/* RINGKASAN EKSEKUTIF / STATISTIK                                */}
      {/* ============================================================== */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="border border-neutral-300 rounded p-2 text-center bg-neutral-50/50">
          <div className="text-[10px] font-semibold text-neutral-600 uppercase">
            Total Respon
          </div>
          <div className="text-lg font-black text-neutral-900 mt-0.5">
            {total}
          </div>
          <div className="text-[9px] text-neutral-500">Responden Masuk</div>
        </div>

        <div className="border border-neutral-300 rounded p-2 text-center bg-neutral-50/50">
          <div className="text-[10px] font-semibold text-neutral-600 uppercase">
            Rata-rata Rating
          </div>
          <div className="text-lg font-black text-neutral-900 mt-0.5">
            {avgRating} <span className="text-xs font-normal text-neutral-500">/ 5.0</span>
          </div>
          <div className="text-[9px] text-neutral-500">{puasPercent}% Kepuasan Positif</div>
        </div>

        <div className="border border-neutral-300 rounded p-2 text-center bg-neutral-50/50">
          <div className="text-[10px] font-semibold text-neutral-600 uppercase">
            Jalur Orang Tua
          </div>
          <div className="text-lg font-black text-neutral-900 mt-0.5">
            {ortuCount}
          </div>
          <div className="text-[9px] text-neutral-500">Partisipan Orang Tua</div>
        </div>

        <div className="border border-neutral-300 rounded p-2 text-center bg-neutral-50/50">
          <div className="text-[10px] font-semibold text-neutral-600 uppercase">
            Jalur Siswa / Anak
          </div>
          <div className="text-lg font-black text-neutral-900 mt-0.5">
            {anakCount}
          </div>
          <div className="text-[9px] text-neutral-500">Partisipan Remaja</div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TABEL DATA REKAPITULASI                                        */}
      {/* ============================================================== */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-neutral-300 text-[8.5pt]">
          <thead>
            <tr className="bg-neutral-100 border-b border-neutral-300 text-neutral-900 font-bold">
              <th className="border border-neutral-300 p-1.5 text-center w-8">No</th>
              <th className="border border-neutral-300 p-1.5 text-left w-24">ID Respon</th>
              <th className="border border-neutral-300 p-1.5 text-left w-28">Waktu</th>
              <th className="border border-neutral-300 p-1.5 text-left w-36">Nama Responden</th>
              <th className="border border-neutral-300 p-1.5 text-left w-32">Kuisioner / Jalur</th>
              <th className="border border-neutral-300 p-1.5 text-left w-28">Perangkat</th>
              <th className="border border-neutral-300 p-1.5 text-center w-20">Skor Rating</th>
              <th className="border border-neutral-300 p-1.5 text-left">Ringkasan Refleksi &amp; Jawaban</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="border border-neutral-300 p-6 text-center text-neutral-500 italic"
                >
                  Belum ada data responden yang masuk untuk kategori ini.
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b border-neutral-200 even:bg-neutral-50/30"
                  style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
                >
                  <td className="border border-neutral-300 p-1.5 text-center font-bold text-neutral-700">
                    {idx + 1}
                  </td>
                  <td className="border border-neutral-300 p-1.5 font-mono font-semibold text-neutral-800 text-[8pt]">
                    {item.id}
                  </td>
                  <td className="border border-neutral-300 p-1.5 text-neutral-700">
                    {item.submittedAt}
                  </td>
                  <td className="border border-neutral-300 p-1.5 font-bold text-neutral-950">
                    {item.respondentName}
                  </td>
                  <td className="border border-neutral-300 p-1.5 text-neutral-800">
                    <div>{item.sublinkTitle}</div>
                    <div className="text-[7.5pt] text-neutral-500">{item.targetAudience}</div>
                  </td>
                  <td className="border border-neutral-300 p-1.5 text-neutral-700 text-[8pt]">
                    {item.device}
                  </td>
                  <td className="border border-neutral-300 p-1.5 text-center font-bold text-neutral-900">
                    <div>{Number(item.rating).toFixed(1)} / 5.0</div>
                    <div className="text-[7.5pt] font-normal text-neutral-600">
                      {item.sentiment}
                    </div>
                  </td>
                  <td className="border border-neutral-300 p-1.5 text-neutral-800 text-[8pt]">
                    {item.answers && item.answers.length > 0 ? (
                      <div className="space-y-1">
                        {item.answers.slice(0, 3).map((ans, aIdx) => (
                          <div key={aIdx} className="leading-tight">
                            <span className="font-semibold text-neutral-700">
                              P{aIdx + 1}:
                            </span>{" "}
                            <span>{ans.answer}</span>
                          </div>
                        ))}
                        {item.answers.length > 3 && (
                          <div className="text-[7.5pt] italic text-neutral-500">
                            (+{item.answers.length - 3} butir jawaban lainnya)
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-neutral-400 italic">Tanpa butir jawaban tambahan</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ============================================================== */}
      {/* PENGESAHAN DOKUMEN & FOOTER                                    */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-neutral-300 flex items-start justify-between text-[8.5pt] text-neutral-700" style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
        <div className="max-w-md">
          <div className="font-bold text-neutral-900">Catatan Sistem:</div>
          <p className="mt-0.5 text-neutral-600 leading-relaxed text-[8pt]">
            Dokumen ini dihasilkan secara otomatis melalui Panel Administrator Sistem Kuisioner Program GALAXY.
            Data partisipan bersifat rahasia dan dipergunakan secara sah untuk evaluasi intervensi hubungan keluarga.
          </p>
        </div>

        <div className="text-center min-w-44">
          <div>Diverifikasi oleh,</div>
          <div className="font-bold text-neutral-900 mt-0.5">Penanggung Jawab Program</div>
          <div className="h-10" />
          <div className="font-bold underline text-neutral-950">{adminName}</div>
          <div className="text-[7.5pt] text-neutral-500">Administrator Sistem GALAXY</div>
        </div>
      </div>
    </div>
  );
}
