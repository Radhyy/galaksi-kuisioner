import ExcelJS from "exceljs";

export interface ResponseAnswer {
  question: string;
  answer: string;
}

export interface SurveyResponseItem {
  id: string;
  respondentName: string;
  sublinkSlug: "orangtua" | "siswa" | "anak" | string;
  sublinkTitle: string;
  targetAudience: string;
  submittedAt: string;
  rawSubmittedAt?: string;
  rating: number; // 1 to 5
  sentiment: "Sangat Puas" | "Puas" | "Cukup" | "Kurang" | string;
  device: "Smartphone (Android)" | "iPhone (iOS)" | "Laptop (Windows)" | "MacBook (macOS)" | "Tablet (iPad)" | string;
  answers: ResponseAnswer[];
}

// Data respon awal
export const dummyResponsesList: SurveyResponseItem[] = [];

// Helper untuk memfilter data berdasarkan audiens
export function filterResponsesByScope(
  data: SurveyResponseItem[],
  scope: "all" | "orangtua" | "anak"
): SurveyResponseItem[] {
  if (scope === "orangtua") {
    return data.filter(
      (item) =>
        item.sublinkSlug === "orangtua" ||
        item.targetAudience.toLowerCase().includes("orang tua") ||
        item.sublinkTitle.toLowerCase().includes("orang tua")
    );
  }
  if (scope === "anak") {
    return data.filter(
      (item) =>
        item.sublinkSlug === "anak" ||
        item.sublinkSlug === "siswa" ||
        item.targetAudience.toLowerCase().includes("siswa") ||
        item.targetAudience.toLowerCase().includes("anak") ||
        item.targetAudience.toLowerCase().includes("remaja") ||
        item.sublinkTitle.toLowerCase().includes("siswa") ||
        item.sublinkTitle.toLowerCase().includes("anak")
    );
  }
  return data;
}

// Fungsi pembantu untuk membuat sheet data dengan styling rapi, warna header, dan border lengkap
function populateDataWorksheet(
  ws: ExcelJS.Worksheet,
  items: SurveyResponseItem[],
  sheetTitle: string,
  scopeLabel: string
) {
  // Aktifkan garis kisi agar selalu tampil di Excel
  ws.views = [{ showGridLines: true }];

  // Kumpulkan semua butir pertanyaan unik secara berurutan
  const questionList: string[] = [];
  items.forEach((item) => {
    (item.answers || []).forEach((a) => {
      if (a.question && !questionList.includes(a.question)) {
        questionList.push(a.question);
      }
    });
  });

  const baseHeaders = [
    "No.",
    "ID Respon",
    "Waktu Pengisian",
    "Nama Responden",
    "Jalur Kuisioner",
    "Target Audiens",
    "Skor Rating (1-5)",
    "Tingkat Kepuasan",
    "Perangkat Responden",
  ];
  const questionHeaders = questionList.map((q, idx) => `P${idx + 1}: ${q}`);
  const allHeaders = [...baseHeaders, ...questionHeaders];
  const totalCols = allHeaders.length;

  // Tanggal ekspor diformat rapi
  const exportDateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const exportTimeStr = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // 1. BANNER UTAMA (Row 1)
  ws.mergeCells(1, 1, 1, totalCols);
  const titleCell1 = ws.getCell(1, 1);
  titleCell1.value = "PROGRAM INTERVENSI HUBUNGAN KELUARGA GALAXY";
  titleCell1.font = { name: "Calibri", size: 14, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell1.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF3730A3" } }; // Indigo 800
  titleCell1.alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(1).height = 30;

  // 2. SUB BANNER (Row 2)
  ws.mergeCells(2, 1, 2, totalCols);
  const titleCell2 = ws.getCell(2, 1);
  titleCell2.value = `LAPORAN REKAPITULASI EVALUASI & HASIL KUISIONER — ${scopeLabel.toUpperCase()}`;
  titleCell2.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell2.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4F46E5" } }; // Indigo 600
  titleCell2.alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(2).height = 24;

  // 3. INFO METADATA (Row 3)
  ws.mergeCells(3, 1, 3, totalCols);
  const titleCell3 = ws.getCell(3, 1);
  titleCell3.value = `"Beda Generasi, Satu Hati, Saling Memahami"  |  Diekspor pada: ${exportDateStr}, ${exportTimeStr} WIB  |  Total Data: ${items.length} Responden Terverifikasi`;
  titleCell3.font = { name: "Calibri", size: 9.5, italic: true, color: { argb: "FF334155" } };
  titleCell3.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF1F5F9" } }; // Slate 100
  titleCell3.alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(3).height = 20;

  // 4. SPACER ROW (Row 4)
  ws.getRow(4).height = 10;

  // 5. TABLE HEADER ROW (Row 5)
  const headerRow = ws.getRow(5);
  headerRow.values = allHeaders;
  headerRow.height = 28;

  headerRow.eachCell((cell) => {
    cell.font = { name: "Calibri", size: 10.5, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E1B4B" } }; // Deep Navy Indigo
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "medium", color: { argb: "FF0F172A" } },
      left: { style: "thin", color: { argb: "FF334155" } },
      bottom: { style: "medium", color: { argb: "FF0F172A" } },
      right: { style: "thin", color: { argb: "FF334155" } },
    };
  });

  // Track max length per column for auto-width
  const colMaxLens = allHeaders.map((h) => h.length);

  // 6. DATA ROWS (Row 6+)
  if (items.length === 0) {
    const emptyRow = ws.getRow(6);
    ws.mergeCells(6, 1, 6, totalCols);
    const emptyCell = emptyRow.getCell(1);
    emptyCell.value = "Belum ada respon responden yang masuk untuk kategori ini.";
    emptyCell.font = { name: "Calibri", size: 10, italic: true, color: { argb: "FF64748B" } };
    emptyCell.alignment = { vertical: "middle", horizontal: "center" };
    emptyRow.height = 28;
  } else {
    items.forEach((item, idx) => {
      const rowIndex = 6 + idx;
      const row = ws.getRow(rowIndex);
      row.height = 24;

      const isEven = idx % 2 === 0;
      const bgArgb = isEven ? "FFFFFFFF" : "FFF8FAFC"; // Soft clean zebra striping

      const ansMap = new Map<string, string>();
      (item.answers || []).forEach((a) => {
        if (a.question) ansMap.set(a.question, a.answer);
      });

      const rowValues: (string | number)[] = [
        idx + 1,
        item.id,
        item.submittedAt,
        item.respondentName,
        item.sublinkTitle,
        item.targetAudience,
        Number(item.rating) || 5.0,
        item.sentiment,
        item.device,
        ...questionList.map((q) => ansMap.get(q) || "-"),
      ];

      row.values = rowValues;

      // Update max length for each column
      rowValues.forEach((val, cIdx) => {
        const strVal = String(val ?? "");
        if (strVal.length > (colMaxLens[cIdx] || 0)) {
          colMaxLens[cIdx] = Math.min(60, strVal.length);
        }
      });

      row.eachCell((cell, colNumber) => {
        cell.font = { name: "Calibri", size: 10, color: { argb: "FF0F172A" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bgArgb } };
        cell.border = {
          top: { style: "thin", color: { argb: "FFE2E8F0" } },
          left: { style: "thin", color: { argb: "FFE2E8F0" } },
          bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
          right: { style: "thin", color: { argb: "FFE2E8F0" } },
        };

        // Alignments
        if (colNumber === 1) {
          // No.
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF475569" } };
        } else if (colNumber === 2) {
          // ID Respon
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.font = { name: "Consolas", size: 9.5, bold: true, color: { argb: "FF4338CA" } };
        } else if (colNumber === 3) {
          // Waktu
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else if (colNumber === 4) {
          // Nama Responden
          cell.alignment = { vertical: "middle", horizontal: "left" };
          cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF0F172A" } };
        } else if (colNumber === 5) {
          // Jalur Kuisioner
          cell.alignment = { vertical: "middle", horizontal: "left" };
        } else if (colNumber === 6) {
          // Target Audiens
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else if (colNumber === 7) {
          // Skor Rating (1-5)
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.font = { name: "Calibri", size: 10.5, bold: true, color: { argb: "FF059669" } }; // Emerald 600
          cell.numFmt = "0.0";
        } else if (colNumber === 8) {
          // Tingkat Kepuasan
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else if (colNumber === 9) {
          // Perangkat
          cell.alignment = { vertical: "middle", horizontal: "left" };
        } else {
          // Pertanyaan & Jawaban
          cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
        }
      });
    });
  }

  // 7. KONFIGURASI LEBAR KOLOM (Auto-width dengan minimum yang proporsional)
  const defaultMinWidths = [
    8,  // No.
    18, // ID Respon
    22, // Waktu Pengisian
    28, // Nama Responden
    34, // Jalur Kuisioner (Cukup lebar agar tidak terpotong)
    22, // Target Audiens
    18, // Skor Rating
    20, // Tingkat Kepuasan
    26, // Perangkat Responden
  ];

  allHeaders.forEach((_, cIdx) => {
    const minW = defaultMinWidths[cIdx] || 38;
    const computedW = Math.max(minW, (colMaxLens[cIdx] || 0) + 4);
    ws.getColumn(cIdx + 1).width = computedW;
  });
}

// Fungsi pembantu untuk membuat sheet Ringkasan Statistik
function populateSummaryWorksheet(ws: ExcelJS.Worksheet, items: SurveyResponseItem[]) {
  ws.views = [{ showGridLines: true }];

  const total = items.length;
  const ortuCount = filterResponsesByScope(items, "orangtua").length;
  const anakCount = filterResponsesByScope(items, "anak").length;
  const avgRating = total > 0
    ? (items.reduce((acc, it) => acc + (Number(it.rating) || 0), 0) / total).toFixed(2)
    : "0.0";
  const puasCount = items.filter(
    (it) => it.sentiment === "Sangat Puas" || it.sentiment === "Puas"
  ).length;
  const puasPercent = total > 0 ? Math.round((puasCount / total) * 100) : 0;

  // Header Banner
  ws.mergeCells("A1:C1");
  const t1 = ws.getCell("A1");
  t1.value = "PROGRAM GALAXY — RINGKASAN & STATISTIK HASIL EVALUASI";
  t1.font = { name: "Calibri", size: 13, bold: true, color: { argb: "FFFFFFFF" } };
  t1.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF3730A3" } };
  t1.alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(1).height = 28;

  ws.getRow(2).height = 8;

  // Header Tabel Statistik
  const headerRow = ws.getRow(3);
  headerRow.values = ["No.", "Indikator Evaluasi", "Keterangan / Hasil"];
  headerRow.height = 26;
  headerRow.eachCell((cell) => {
    cell.font = { name: "Calibri", size: 10.5, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E1B4B" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "medium", color: { argb: "FF0F172A" } },
      left: { style: "thin", color: { argb: "FF334155" } },
      bottom: { style: "medium", color: { argb: "FF0F172A" } },
      right: { style: "thin", color: { argb: "FF334155" } },
    };
  });

  const summaryData = [
    ["1", "Program Intervensi", "GALAXY (Beda Generasi, Satu Hati, Saling Memahami)"],
    ["2", "Fokus Program", "Evaluasi Kualitas Komunikasi & Kehadiran Emosional Keluarga"],
    ["3", "Tanggal & Waktu Unduh", new Date().toLocaleString("id-ID")],
    ["4", "Total Responden Terdata", `${total} Responden`],
    ["5", "Partisipasi Jalur Orang Tua / Wali", `${ortuCount} Responden (${total > 0 ? Math.round((ortuCount / total) * 100) : 0}%)`],
    ["6", "Partisipasi Jalur Siswa / Remaja", `${anakCount} Responden (${total > 0 ? Math.round((anakCount / total) * 100) : 0}%)`],
    ["7", "Rata-rata Indeks Kepuasan (Skala 1 - 5)", `${avgRating} / 5.0`],
    ["8", "Persentase Kepuasan Positif (Puas / Sangat Puas)", `${puasPercent}%`],
    ["9", "Status Integritas Data", "Terverifikasi Resmi Database Neon PostgreSQL"],
  ];

  summaryData.forEach((rowVal, idx) => {
    const row = ws.getRow(4 + idx);
    row.values = rowVal;
    row.height = 23;

    const bgArgb = idx % 2 === 0 ? "FFFFFFFF" : "FFF8FAFC";
    row.eachCell((cell, cNumber) => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bgArgb } };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE2E8F0" } },
        left: { style: "thin", color: { argb: "FFE2E8F0" } },
        bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        right: { style: "thin", color: { argb: "FFE2E8F0" } },
      };

      if (cNumber === 1) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF64748B" } };
      } else if (cNumber === 2) {
        cell.alignment = { vertical: "middle", horizontal: "left" };
        cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF1E293B" } };
      } else {
        cell.alignment = { vertical: "middle", horizontal: "left" };
        cell.font = { name: "Calibri", size: 10, color: { argb: "FF334155" } };
      }
    });
  });

  ws.getColumn(1).width = 8;
  ws.getColumn(2).width = 44;
  ws.getColumn(3).width = 54;
}

// Unduh Excel (.xlsx) resmi dengan desain tabel elegan, kop resmi, dan multi-sheet
export async function exportResponsesAsExcelXLSX(
  data: SurveyResponseItem[],
  scope: "all" | "orangtua" | "anak" = "all"
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Sistem Kuisioner Program GALAXY";
  wb.title = "Rekapitulasi Hasil Kuisioner Program GALAXY";
  wb.created = new Date();

  const timestamp = Date.now();
  let filename = `galaxy_rekap_semua_kuisioner_${timestamp}.xlsx`;

  if (scope === "orangtua") {
    const ortuData = filterResponsesByScope(data, "orangtua");
    const wsOrtu = wb.addWorksheet("Kuisioner Orang Tua");
    populateDataWorksheet(wsOrtu, ortuData, "Kuisioner Orang Tua", "Khusus Jalur Orang Tua / Wali");

    const wsSummary = wb.addWorksheet("Ringkasan Statistik");
    populateSummaryWorksheet(wsSummary, ortuData);

    filename = `galaxy_rekap_kuisioner_orangtua_${timestamp}.xlsx`;
  } else if (scope === "anak") {
    const anakData = filterResponsesByScope(data, "anak");
    const wsAnak = wb.addWorksheet("Kuisioner Siswa Anak");
    populateDataWorksheet(wsAnak, anakData, "Kuisioner Siswa Anak", "Khusus Jalur Siswa / Remaja");

    const wsSummary = wb.addWorksheet("Ringkasan Statistik");
    populateSummaryWorksheet(wsSummary, anakData);

    filename = `galaxy_rekap_kuisioner_anak_${timestamp}.xlsx`;
  } else {
    // Semua kuisioner (Multi-sheet lengkap)
    const ortuData = filterResponsesByScope(data, "orangtua");
    const anakData = filterResponsesByScope(data, "anak");

    const wsAll = wb.addWorksheet("Semua Respon");
    populateDataWorksheet(wsAll, data, "Semua Respon", "Seluruh Jalur Kuisioner (Keduanya)");

    const wsOrtu = wb.addWorksheet("Kuisioner Orang Tua");
    populateDataWorksheet(wsOrtu, ortuData, "Kuisioner Orang Tua", "Khusus Jalur Orang Tua / Wali");

    const wsAnak = wb.addWorksheet("Kuisioner Siswa Anak");
    populateDataWorksheet(wsAnak, anakData, "Kuisioner Siswa Anak", "Khusus Jalur Siswa / Remaja");

    const wsSummary = wb.addWorksheet("Ringkasan Statistik");
    populateSummaryWorksheet(wsSummary, data);

    filename = `galaxy_rekap_semua_kuisioner_${timestamp}.xlsx`;
  }

  // Tulis buffer dan unduh langsung di browser
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Alias untuk backwards-compatibility
export const exportResponsesAsExcel = exportResponsesAsExcelXLSX;

export function exportResponsesAsCSV(
  data: SurveyResponseItem[],
  scope: "all" | "orangtua" | "anak" = "all"
) {
  const filtered = filterResponsesByScope(data, scope);

  const questionList: string[] = [];
  filtered.forEach((item) => {
    (item.answers || []).forEach((a) => {
      if (a.question && !questionList.includes(a.question)) {
        questionList.push(a.question);
      }
    });
  });

  const headers = [
    "No.",
    "ID Respon",
    "Nama Responden",
    "Kuisioner",
    "Target Audiens",
    "Waktu Pengisian",
    "Skor Rating",
    "Kepuasan",
    "Perangkat",
    ...questionList.map((q, idx) => `P${idx + 1}: ${q}`),
  ];

  const rows = filtered.map((item, idx) => {
    const ansMap = new Map<string, string>();
    (item.answers || []).forEach((a) => {
      if (a.question) ansMap.set(a.question, a.answer);
    });

    const baseCols = [
      idx + 1,
      `"${item.id}"`,
      `"${item.respondentName.replace(/"/g, '""')}"`,
      `"${item.sublinkTitle.replace(/"/g, '""')}"`,
      `"${item.targetAudience.replace(/"/g, '""')}"`,
      `"${item.submittedAt}"`,
      item.rating,
      `"${item.sentiment}"`,
      `"${item.device}"`,
    ];

    const ansCols = questionList.map((q) => {
      const val = ansMap.get(q) || "-";
      return `"${val.replace(/"/g, '""')}"`;
    });

    return [...baseCols, ...ansCols];
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);

  const suffix = scope === "orangtua" ? "orangtua" : scope === "anak" ? "anak" : "semua";
  link.setAttribute("download", `galaxy_respon_${suffix}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportResponsesAsJSON(
  data: SurveyResponseItem[],
  scope: "all" | "orangtua" | "anak" = "all"
) {
  const filtered = filterResponsesByScope(data, scope);
  const jsonContent = JSON.stringify(filtered, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);

  const suffix = scope === "orangtua" ? "orangtua" : scope === "anak" ? "anak" : "semua";
  link.setAttribute("download", `galaxy_respon_${suffix}_${Date.now()}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
