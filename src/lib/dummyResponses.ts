export interface ResponseAnswer {
  question: string;
  answer: string;
}

export interface SurveyResponseItem {
  id: string;
  respondentName: string;
  sublinkSlug: "orangtua" | "siswa";
  sublinkTitle: string;
  targetAudience: string;
  submittedAt: string;
  rating: number; // 1 to 5
  sentiment: "Sangat Puas" | "Puas" | "Cukup" | "Kurang";
  device: "Smartphone (Android)" | "iPhone (iOS)" | "Laptop (Windows)" | "MacBook (macOS)" | "Tablet (iPad)";
  answers: ResponseAnswer[];
}

// Data respon dikosongkan sesuai permintaan pengguna (belum ada respon masuk)
export const dummyResponsesList: SurveyResponseItem[] = [];

export function exportResponsesAsCSV(data: SurveyResponseItem[]) {
  const headers = ["ID Respon", "Nama Responden", "Kuisioner", "Target Audiens", "Waktu Pengisian", "Skor Rating", "Kepuasan", "Perangkat"];
  const rows = data.map((item) => [
    `"${item.id}"`,
    `"${item.respondentName.replace(/"/g, '""')}"`,
    `"${item.sublinkTitle.replace(/"/g, '""')}"`,
    `"${item.targetAudience.replace(/"/g, '""')}"`,
    `"${item.submittedAt}"`,
    item.rating,
    `"${item.sentiment}"`,
    `"${item.device}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `galaxy_respon_intervensi_keluarga_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportResponsesAsJSON(data: SurveyResponseItem[]) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `galaxy_respon_intervensi_keluarga_${Date.now()}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportResponsesAsExcel(data: SurveyResponseItem[]) {
  const headers = ["ID Respon", "Nama Responden", "Kuisioner", "Target Audiens", "Waktu Pengisian", "Skor Rating", "Kepuasan", "Perangkat"];
  const rows = data.map((item) => [
    `"${item.id}"`,
    `"${item.respondentName.replace(/"/g, '""')}"`,
    `"${item.sublinkTitle.replace(/"/g, '""')}"`,
    `"${item.targetAudience.replace(/"/g, '""')}"`,
    `"${item.submittedAt}"`,
    item.rating,
    `"${item.sentiment}"`,
    `"${item.device}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\r\n");
  const blob = new Blob([csvContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `galaxy_rekap_intervensi_keluarga_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
