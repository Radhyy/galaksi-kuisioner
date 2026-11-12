export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "nps"
  | "likert"
  | "text";

export interface QuestionOption {
  id: string;
  title: string;
  desc?: string;
  iconName?: string;
}

export interface QuestionItem {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  required: boolean;
  options?: QuestionOption[];
  minLabel?: string;
  maxLabel?: string;
  placeholder?: string;
  suggestions?: string[];
}

export interface SurveySublink {
  id: string;
  slug: string; // e.g. "orangtua", "siswa"
  title: string;
  targetAudience: string;
  description: string;
  isActive: boolean;
  estimatedMinutes: number;
  totalResponses: number;
  lastUpdated: string;
  questions: QuestionItem[];
}

export const defaultSublinks: SurveySublink[] = [
  {
    id: "sublink-orangtua",
    slug: "orangtua",
    title: "Kuisioner Program GALAXY — Orang Tua & Wali Murid",
    targetAudience: "Orang Tua / Wali",
    description:
      "Evaluasi kehadiran emosional, komunikasi dua arah, dan peran orang tua dalam mewujudkan rumah sebagai tempat aman (safe space) bagi anak. Tema: 'Beda Generasi, Satu Hati, Saling Memahami'.",
    isActive: true,
    estimatedMinutes: 3,
    totalResponses: 0,
    lastUpdated: "Hari ini",
    questions: [
      {
        id: "q-ot-nama",
        title: "Nama Lengkap Responden (Orang Tua / Wali)",
        subtitle: "Cantumkan nama lengkap atau nama panggilan Anda (status: dapat diatur Wajib atau Opsional oleh Admin).",
        type: "text",
        required: true,
        placeholder: "Contoh: Ibu Siti Rahmawati / Bapak Budi Santoso",
      },
      {
        id: "q-ot-1",
        title: "[CERIA] Seberapa sering Anda meluangkan waktu khusus untuk mengobrol santai dari hati ke hati dengan anak tanpa membahas tugas atau nilai sekolah?",
        subtitle: "Menilai intensitas komunikasi dua arah dan kehadiran emosional di rumah.",
        type: "single-choice",
        required: true,
        options: [
          {
            id: "opt-1",
            title: "Hampir setiap hari secara rutin",
            desc: "Mendengarkan cerita keseharian dan perasaan anak dengan penuh perhatian.",
            iconName: "CalendarDays",
          },
          {
            id: "opt-2",
            title: "2-3 kali seminggu saat waktu senggang",
            desc: "Menyisihkan waktu saat suasana rumah santai atau akhir pekan.",
            iconName: "Layers",
          },
          {
            id: "opt-3",
            title: "Jarang, hanya bila ada masalah mendesak",
            desc: "Komunikasi lebih banyak seputar kebutuhan materi, jadwal, atau aturan.",
            iconName: "Compass",
          },
          {
            id: "opt-4",
            title: "Hampir tidak pernah karena kesibukan",
            desc: "Merasa kesulitan menemukan waktu berkualitas berdua bersama anak.",
            iconName: "Sparkles",
          },
        ],
      },
      {
        id: "q-ot-2",
        title: "[LENSA] Ketika anak melakukan kesalahan atau berbeda pendapat, bagaimana respon pertama yang biasanya Anda berikan?",
        subtitle: "Menilai kemampuan memahami sudut pandang anak tanpa langsung menghakimi.",
        type: "single-choice",
        required: true,
        options: [
          {
            id: "lensa-1",
            title: "Mendengarkan alasannya terlebih dahulu dengan tenang",
            desc: "Mencoba memahami dari kacamata anak sebelum memberi masukan.",
            iconName: "Headphones",
          },
          {
            id: "lensa-2",
            title: "Langsung menasihati agar anak tidak mengulanginya",
            desc: "Fokus pada solusi cepat menurut standar dan pengalaman orang tua.",
            iconName: "Zap",
          },
          {
            id: "lensa-3",
            title: "Menegur dengan tegas dan memberi sanksi",
            desc: "Mengutamakan kedisiplinan dan kepatuhan aturan keluarga.",
            iconName: "ShieldCheck",
          },
          {
            id: "lensa-4",
            title: "Mendiamkan anak untuk beberapa saat",
            desc: "Menghindari perdebatan terbuka hingga suasana emosi mereda.",
            iconName: "Compass",
          },
        ],
      },
      {
        id: "q-ot-3",
        title: "[KOMPAK] Tantangan apa yang paling sering Anda hadapi saat berusaha membangun kedekatan emosional dengan anak di era digital?",
        subtitle: "Anda dapat memilih lebih dari satu jawaban.",
        type: "multiple-choice",
        required: true,
        options: [
          {
            id: "feat-1",
            title: "Perbedaan Cara Pandang Antargenerasi (Beda Generasi)",
            desc: "Sulit memahami tren, bahasa gaul, dan minat remaja masa kini.",
            iconName: "Layers",
          },
          {
            id: "feat-2",
            title: "Keterikatan Anak pada Gadget & Media Sosial",
            desc: "Anak lebih asyik di dunia online dibanding mengobrol bersama keluarga.",
            iconName: "Smartphone",
          },
          {
            id: "feat-3",
            title: "Kelelahan Kerja & Keterbatasan Waktu",
            desc: "Energi terkuras untuk bekerja dan memenuhi kebutuhan materi keluarga.",
            iconName: "BarChart3",
          },
          {
            id: "feat-4",
            title: "Anak Cenderung Tertutup & Enggan Terbuka",
            desc: "Anak merasa canggung atau takut dihakimi ketika mulai bercerita.",
            iconName: "ShieldCheck",
          },
        ],
      },
      {
        id: "q-ot-4",
        title: "[HATI] Sejauh mana rumah saat ini sudah menjadi tempat yang aman (safe space) bagi anak untuk mencurahkan isi hatinya?",
        subtitle: "Skala penilaian dari 1 (Belum Aman / Anak Sangat Tertutup) hingga 10 (Sangat Aman & Penuh Keterbukaan Kasih Sayang).",
        type: "nps",
        required: true,
        minLabel: "1 — Belum Aman / Tertutup",
        maxLabel: "10 — Safe Space Utama Keluarga",
      },
      {
        id: "q-ot-5",
        title: "Langkah atau komitmen apa yang ingin Anda mulai lakukan demi mempererat hubungan emosional dengan putra/putri Anda?",
        subtitle: "Tuliskan refleksi Anda secara terbuka dan tulus untuk kehangatan keluarga.",
        type: "text",
        required: false,
        placeholder: "Tuliskan komitmen atau harapan Anda untuk anak tercinta...",
        suggestions: [
          "Belajar lebih banyak mendengar tanpa langsung menghakimi",
          "Meluangkan waktu 15 menit setiap malam untuk berbincang santai",
          "Menghargai privasi dan sudut pandang generasi anak",
          "Memeluk dan menyampaikan rasa bangga secara langsung",
        ],
      },
    ],
  },
  {
    id: "sublink-siswa",
    slug: "siswa",
    title: "Kuisioner Program GALAXY — Ruang Cerita & Emosional Anak",
    targetAudience: "Siswa / Remaja",
    description:
      "Ruang berekspresi bagi anak untuk menyampaikan perasaan, rasa didengar di rumah, serta harapan terhadap kehadiran emosional orang tua. Tema: 'Beda Generasi, Satu Hati, Saling Memahami'.",
    isActive: true,
    estimatedMinutes: 2,
    totalResponses: 0,
    lastUpdated: "Hari ini",
    questions: [
      {
        id: "q-sw-nama",
        title: "Nama Lengkap Responden (Siswa / Remaja)",
        subtitle: "Cantumkan nama lengkap atau nama panggilanmu (status: dapat diatur Wajib atau Opsional oleh Admin).",
        type: "text",
        required: true,
        placeholder: "Contoh: Dimas Aditya / Salsa",
      },
      {
        id: "q-sw-1",
        title: "[CERIA] Apakah kamu merasa orang tua benar-benar mengenal hal-hal yang sedang kamu rasakan, sukai, atau khawatirkan saat ini?",
        subtitle: "Pilih kondisi yang paling menggambarkan hubunganmu dengan orang tua di rumah.",
        type: "single-choice",
        required: true,
        options: [
          {
            id: "sw-opt-1",
            title: "Sangat mengenal, aku terbiasa cerita apa adanya",
            desc: "Orang tua tahu teman-temanku, hobiku, dan hal yang membuatku cemas.",
            iconName: "CalendarDays",
          },
          {
            id: "sw-opt-2",
            title: "Cukup tahu, tapi hanya hal-hal umum saja",
            desc: "Tahu kegiatanku, tapi jarang membahas perasaan atau mimpi mendalam.",
            iconName: "Layers",
          },
          {
            id: "sw-opt-3",
            title: "Kurang tahu, aku lebih nyaman memendam sendiri",
            desc: "Merasa orang tua terlalu sibuk bekerja atau tidak akan mengerti.",
            iconName: "Compass",
          },
          {
            id: "sw-opt-4",
            title: "Sama sekali tidak tahu, aku merasa asing di rumah",
            desc: "Jarang diajak bicara santai selain urusan nilai sekolah dan aturan.",
            iconName: "Sparkles",
          },
        ],
      },
      {
        id: "q-sw-2",
        title: "[LENSA] Ketika kamu menghadapi masalah berat atau masa sulit, ke mana tempat pertama yang kamu tuju untuk mencari dukungan?",
        subtitle: "Pilih tempat bersandar yang paling sering kamu cari.",
        type: "single-choice",
        required: true,
        options: [
          {
            id: "sw-lensa-1",
            title: "Bercerita langsung ke orang tua di rumah",
            desc: "Rumah adalah tempat paling aman dan nyaman untuk curhat bagiku.",
            iconName: "ShieldCheck",
          },
          {
            id: "sw-lensa-2",
            title: "Teman sebaya atau komunitas di luar rumah",
            desc: "Merasa teman lebih bisa mengerti dan tidak menghakimi rasaku.",
            iconName: "Compass",
          },
          {
            id: "sw-lensa-3",
            title: "Melampiaskan di media sosial / game online",
            desc: "Mencari distraksi dan pelarian agar tidak merasa sendirian.",
            iconName: "Smartphone",
          },
          {
            id: "sw-lensa-4",
            title: "Menangis sendiri di kamar tanpa memberitahu siapa pun",
            desc: "Takut jika cerita malah dimarahi, dibanding-bandingkan, atau disepelekan.",
            iconName: "Headphones",
          },
        ],
      },
      {
        id: "q-sw-3",
        title: "[KOMPAK] Bentuk kehadiran orang tua seperti apa yang paling kamu butuhkan saat ini selain pemenuhan uang / kebutuhan materi?",
        subtitle: "Kamu dapat memilih lebih dari satu jawaban yang paling kamu harapkan.",
        type: "multiple-choice",
        required: true,
        options: [
          {
            id: "sw-feat-1",
            title: "Didengarkan Ceritanya Tanpa Langsung Dinasihati",
            desc: "Hanya butuh didengar dan divalidasi perasaannya tanpa dihakimi.",
            iconName: "Headphones",
          },
          {
            id: "sw-feat-2",
            title: "Waktu Berkualitas Bersama untuk Jalan Santai / Ngobrol",
            desc: "Momen seru dan bebas stres tanpa tuntutan target nilai.",
            iconName: "Zap",
          },
          {
            id: "sw-feat-3",
            title: "Apresiasi & Ucapan Rasa Bangga atas Usahaku",
            desc: "Bukan hanya dinilai saat berhasil, tapi dihargai setiap proses perjuanganku.",
            iconName: "BarChart3",
          },
          {
            id: "sw-feat-4",
            title: "Diberikan Kepercayaan untuk Mengambil Keputusan",
            desc: "Didukung mandiri dengan bimbingan yang ramah dan penuh kasih.",
            iconName: "ShieldCheck",
          },
        ],
      },
      {
        id: "q-sw-4",
        title: "[HATI] Seberapa dekat dan nyamannya kamu secara emosional dengan orang tuamu saat berada di rumah?",
        subtitle: "Skala 1 (Sangat Jauh / Terisolasi) hingga 10 (Sangat Dekat, Hangat, & Satu Hati).",
        type: "nps",
        required: true,
        minLabel: "1 — Terasa Sangat Jauh & Asing",
        maxLabel: "10 — Sangat Dekat, Hangat, & Satu Hati",
      },
      {
        id: "q-sw-5",
        title: "Jika ada satu hal yang ingin kamu sampaikan secara tulus dari lubuk hatimu kepada orang tua, apa yang ingin kamu katakan?",
        subtitle: "Tuliskan perasaan, rasa terima kasih, atau harapanmu dengan bebas dan aman.",
        type: "text",
        required: false,
        placeholder: "Tuliskan pesan hatimu untuk ayah / ibu di sini...",
        suggestions: [
          "Tolong luangkan waktu mengobrol denganku sebentar saja",
          "Aku ingin ayah dan ibu bangga padaku apa adanya",
          "Terima kasih sudah bekerja keras, aku sayang ayah dan ibu",
          "Tolong jangan bandingkan aku dengan anak lain",
        ],
      },
    ],
  },
];

const STORAGE_KEY = "galaksi_survey_sublinks_v4";

export function getStoredSublinks(): SurveySublink[] {
  if (typeof window === "undefined") return defaultSublinks;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSublinks));
      return defaultSublinks;
    }
    return JSON.parse(raw);
  } catch {
    return defaultSublinks;
  }
}

export function saveStoredSublinks(sublinks: SurveySublink[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sublinks));
  } catch (err) {
    console.error("Failed to save sublinks to storage", err);
  }
}

export function getSublinkBySlug(slug: string): SurveySublink | undefined {
  const all = getStoredSublinks();
  return all.find((item) => item.slug.toLowerCase() === slug.toLowerCase());
}
