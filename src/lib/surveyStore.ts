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
  slug: string; // e.g. "orangtua", "anak"
  title: string;
  targetAudience: string;
  description: string;
  isActive: boolean;
  estimatedMinutes: number;
  totalResponses: number;
  lastUpdated: string;
  questions: QuestionItem[];
}

// ==============================================================
// SOAL RESMI LINK ORANG TUA (13 Pertanyaan)
// ==============================================================
export const orangTuaQuestions: QuestionItem[] = [
  {
    id: "q-ot-1",
    title: "Ketika anak terlihat murung, lebih pendiam, atau menunjukkan perubahan perilaku, apa yang biasanya Anda lakukan?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-1-a",
        title: "A. Menghampiri dan menanyakan apa yang sedang dirasakan anak dengan penuh perhatian.",
      },
      {
        id: "ot-1-b",
        title: "B. Menunggu sampai anak bersedia menceritakan masalahnya sendiri.",
      },
      {
        id: "ot-1-c",
        title: "C. Menganggap perubahan tersebut sebagai hal biasa dalam masa remaja.",
      },
      {
        id: "ot-1-d",
        title: "D. Menegur anak karena dianggap terlalu banyak berpikir atau bersikap berlebihan.",
      },
    ],
  },
  {
    id: "q-ot-2",
    title: "Seberapa jauh Anda mengetahui hal-hal yang sedang menjadi perhatian utama anak saat ini, seperti pertemanan, pendidikan, cita-cita, dan permasalahan pribadinya?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-2-a",
        title: "A. Mengetahui hampir seluruh perkembangan dan permasalahan yang dialami anak.",
      },
      {
        id: "ot-2-b",
        title: "B. Mengetahui sebagian besar aktivitas dan permasalahan anak.",
      },
      {
        id: "ot-2-c",
        title: "C. Hanya mengetahui hal-hal umum mengenai kehidupan anak.",
      },
      {
        id: "ot-2-d",
        title: "D. Jarang mengetahui apa yang sedang terjadi dalam kehidupan anak.",
      },
    ],
  },
  {
    id: "q-ot-3",
    title: "Ketika anak menceritakan sebuah masalah, bagaimana respons pertama yang biasanya Anda berikan?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-3-a",
        title: "A. Mendengarkan sampai selesai, memahami perasaannya, kemudian memberikan tanggapan.",
      },
      {
        id: "ot-3-b",
        title: "B. Mendengarkan sambil memberikan nasihat agar anak segera menemukan solusi.",
      },
      {
        id: "ot-3-c",
        title: "C. Langsung memberikan solusi tanpa menggali perasaan dan penyebab masalahnya.",
      },
      {
        id: "ot-3-d",
        title: "D. Memarahi atau menyalahkan anak karena dianggap tidak mampu menyelesaikan masalah sendiri.",
      },
    ],
  },
  {
    id: "q-ot-4",
    title: "Dalam kehidupan sehari-hari, bagaimana Anda membangun komunikasi dengan anak di tengah kesibukan pekerjaan dan tanggung jawab lainnya?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-4-a",
        title: "A. Menyediakan waktu khusus setiap hari untuk berbicara dan mendengarkan cerita anak.",
      },
      {
        id: "ot-4-b",
        title: "B. Berkomunikasi ketika memiliki waktu luang atau saat berkumpul bersama keluarga.",
      },
      {
        id: "ot-4-c",
        title: "C. Lebih sering berkomunikasi mengenai kebutuhan sekolah, pekerjaan rumah, dan tanggung jawab anak.",
      },
      {
        id: "ot-4-d",
        title: "D. Jarang melakukan komunikasi mendalam karena kesibukan masing-masing.",
      },
    ],
  },
  {
    id: "q-ot-5",
    title: "Ketika anak melakukan kesalahan atau mendapatkan hasil yang tidak sesuai harapan, bagaimana Anda menyikapinya?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-5-a",
        title: "A. Mengajak anak mengevaluasi kesalahan dan mencari solusi bersama tanpa merendahkan dirinya.",
      },
      {
        id: "ot-5-b",
        title: "B. Memberikan nasihat dan mengingatkan anak agar tidak mengulangi kesalahan.",
      },
      {
        id: "ot-5-c",
        title: "C. Menunjukkan kekecewaan agar anak menyadari kesalahannya.",
      },
      {
        id: "ot-5-d",
        title: "D. Membandingkan anak dengan orang lain agar termotivasi menjadi lebih baik.",
      },
    ],
  },
  {
    id: "q-ot-6",
    title: "Sejauh mana Anda memahami bentuk kasih sayang dan perhatian yang paling dibutuhkan anak?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-6-a",
        title: "A. Mengetahui dan berusaha memenuhi kebutuhan emosional anak melalui perhatian, waktu, dukungan, dan komunikasi.",
      },
      {
        id: "ot-6-b",
        title: "B. Berusaha menunjukkan kasih sayang melalui perhatian dan pemenuhan kebutuhan sehari-hari.",
      },
      {
        id: "ot-6-c",
        title: "C. Menganggap pemenuhan kebutuhan materi dan pendidikan sudah cukup menunjukkan kasih sayang.",
      },
      {
        id: "ot-6-d",
        title: "D. Jarang memikirkan bagaimana anak ingin diperhatikan dan disayangi.",
      },
    ],
  },
  {
    id: "q-ot-7",
    title: "Ketika anak memiliki pendapat yang berbeda dengan Anda, bagaimana sikap yang biasanya ditunjukkan?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-7-a",
        title: "A. Memberikan kesempatan anak menjelaskan pendapatnya dan mempertimbangkannya secara terbuka.",
      },
      {
        id: "ot-7-b",
        title: "B. Mendengarkan pendapat anak, tetapi keputusan akhir tetap ditentukan oleh orang tua.",
      },
      {
        id: "ot-7-c",
        title: "C. Meminta anak mengikuti keputusan orang tua karena dianggap lebih berpengalaman.",
      },
      {
        id: "ot-7-d",
        title: "D. Menganggap perbedaan pendapat sebagai bentuk pembangkangan anak.",
      },
    ],
  },
  {
    id: "q-ot-8",
    title: "Seberapa jauh Anda memberikan kepercayaan kepada anak untuk menentukan pilihan dan mengembangkan potensi dirinya?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-8-a",
        title: "A. Memberikan kebebasan yang bertanggung jawab serta mendampingi anak dalam mengambil keputusan.",
      },
      {
        id: "ot-8-b",
        title: "B. Memberikan kebebasan selama pilihan anak masih sesuai dengan harapan orang tua.",
      },
      {
        id: "ot-8-c",
        title: "C. Membatasi sebagian besar keputusan anak karena khawatir anak melakukan kesalahan.",
      },
      {
        id: "ot-8-d",
        title: "D. Lebih sering menentukan pilihan anak tanpa melibatkan pendapatnya.",
      },
    ],
  },
  {
    id: "q-ot-9",
    title: "Ketika anak menghadapi permasalahan dalam pertemanan atau lingkungan sosialnya, bagaimana Anda memberikan dukungan?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-9-a",
        title: "A. Mengajak anak bercerita, memahami situasi, dan membantu mencari jalan keluar bersama.",
      },
      {
        id: "ot-9-b",
        title: "B. Memberikan nasihat berdasarkan pengalaman pribadi.",
      },
      {
        id: "ot-9-c",
        title: "C. Meminta anak menyelesaikan masalahnya sendiri agar lebih mandiri.",
      },
      {
        id: "ot-9-d",
        title: "D. Menganggap masalah pertemanan bukan sesuatu yang perlu terlalu diperhatikan.",
      },
    ],
  },
  {
    id: "q-ot-10",
    title: "Pernahkah Anda menyadari bahwa perkataan atau tindakan Anda mungkin membuat anak merasa takut, kurang dihargai, atau enggan bercerita? Bagaimana Anda menyikapinya?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-10-a",
        title: "A. Melakukan introspeksi, meminta maaf jika diperlukan, dan memperbaiki cara berkomunikasi.",
      },
      {
        id: "ot-10-b",
        title: "B. Menyadari kemungkinan tersebut, tetapi masih kesulitan mengubah kebiasaan.",
      },
      {
        id: "ot-10-c",
        title: "C. Menganggap anak perlu memahami bahwa orang tua terkadang bersikap tegas.",
      },
      {
        id: "ot-10-d",
        title: "D. Menganggap perasaan tersebut sebagai akibat anak yang terlalu sensitif.",
      },
    ],
  },
  {
    id: "q-ot-11",
    title: "Ketika membayangkan masa depan anak, bagaimana Anda menyeimbangkan harapan pribadi dengan keinginan dan potensi yang dimiliki anak?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-11-a",
        title: "A. Mendukung cita-cita anak dan membimbingnya sesuai kemampuan serta minatnya.",
      },
      {
        id: "ot-11-b",
        title: "B. Memberikan kebebasan selama pilihan anak masih mempertimbangkan masa depannya.",
      },
      {
        id: "ot-11-c",
        title: "C. Mengarahkan anak mengikuti cita-cita yang menurut orang tua paling menjamin keberhasilan.",
      },
      {
        id: "ot-11-d",
        title: "D. Mengharapkan anak mengikuti seluruh rencana dan keinginan orang tua.",
      },
    ],
  },
  {
    id: "q-ot-12",
    title: "Jika diberikan kesempatan untuk memperbaiki satu hal dalam hubungan dengan anak, tindakan apa yang paling ingin Anda lakukan?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ot-12-a",
        title: "A. Membangun komunikasi yang lebih terbuka, menyediakan waktu, dan lebih memahami perasaan anak.",
      },
      {
        id: "ot-12-b",
        title: "B. Lebih sering memberikan perhatian dan menghabiskan waktu bersama anak.",
      },
      {
        id: "ot-12-c",
        title: "C. Memperbaiki kedisiplinan dan kepatuhan anak terhadap orang tua.",
      },
      {
        id: "ot-12-d",
        title: "D. Mempertahankan pola pengasuhan yang selama ini sudah diterapkan.",
      },
    ],
  },
  {
    id: "q-ot-13",
    title: "Pesan dari Hati Orang Tua",
    subtitle: "Jika Anda diberikan kesempatan untuk berbicara dari hati ke hati kepada anak tanpa batasan, tuntutan, maupun interupsi, apa yang ingin Anda sampaikan? Apa bentuk kasih sayang, permintaan maaf, nasihat, atau harapan yang selama ini mungkin belum sempat Anda ungkapkan?",
    type: "text",
    required: true,
    placeholder: "Tuliskan isi hati, permintaan maaf, kasih sayang, dan harapan tulus Anda untuk anak di sini...",
  },
];

// ==============================================================
// SOAL RESMI LINK ANAK (13 Pertanyaan)
// ==============================================================
export const anakQuestions: QuestionItem[] = [
  {
    id: "q-ak-1",
    title: "Ketika kamu sedang merasa sedih, kecewa, atau menghadapi masalah, bagaimana biasanya kamu menyikapinya di hadapan orang tua?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-1-a",
        title: "A. Langsung bercerita karena merasa orang tua adalah tempat paling aman untuk mengungkapkan perasaan.",
      },
      {
        id: "ak-1-b",
        title: "B. Bercerita jika orang tua terlebih dahulu menanyakan keadaanmu.",
      },
      {
        id: "ak-1-c",
        title: "C. Memilih diam karena merasa orang tua belum tentu memahami permasalahanmu.",
      },
      {
        id: "ak-1-d",
        title: "D. Menyimpan semuanya sendiri karena takut dimarahi, disalahkan, atau dianggap berlebihan.",
      },
    ],
  },
  {
    id: "q-ak-2",
    title: "Seberapa nyaman kamu menceritakan pengalaman sehari-hari, pertemanan, cita-cita, dan permasalahan pribadi kepada orang tua?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-2-a",
        title: "A. Sangat nyaman karena orang tua selalu memberikan ruang untuk bercerita.",
      },
      {
        id: "ak-2-b",
        title: "B. Cukup nyaman, tetapi ada beberapa hal yang masih sulit untuk disampaikan.",
      },
      {
        id: "ak-2-c",
        title: "C. Kurang nyaman karena sering merasa tidak mendapatkan respons yang diharapkan.",
      },
      {
        id: "ak-2-d",
        title: "D. Tidak nyaman karena merasa tidak memiliki kebebasan untuk bercerita secara terbuka.",
      },
    ],
  },
  {
    id: "q-ak-3",
    title: "Ketika kamu menyampaikan pendapat yang berbeda dengan orang tua, bagaimana respons yang biasanya kamu terima?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-3-a",
        title: "A. Orang tua mendengarkan dan mempertimbangkan pendapatku meskipun berbeda.",
      },
      {
        id: "ak-3-b",
        title: "B. Orang tua mendengarkan, tetapi keputusan akhir biasanya tetap ditentukan mereka.",
      },
      {
        id: "ak-3-c",
        title: "C. Orang tua sering menolak pendapatku tanpa memberikan kesempatan menjelaskan.",
      },
      {
        id: "ak-3-d",
        title: "D. Aku memilih tidak menyampaikan pendapat karena takut menimbulkan konflik.",
      },
    ],
  },
  {
    id: "q-ak-4",
    title: "Ketika kamu mengalami kegagalan, mendapatkan nilai buruk, atau melakukan kesalahan, bagaimana sikap orang tua terhadapmu?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-4-a",
        title: "A. Memberikan dukungan, mendengarkan penjelasanku, dan membantuku memperbaiki kesalahan.",
      },
      {
        id: "ak-4-b",
        title: "B. Memberikan nasihat agar aku lebih berhati-hati dan bertanggung jawab.",
      },
      {
        id: "ak-4-c",
        title: "C. Menunjukkan kekecewaan sehingga membuatku merasa tertekan.",
      },
      {
        id: "ak-4-d",
        title: "D. Membandingkanku dengan orang lain atau menyalahkanku atas kegagalan tersebut.",
      },
    ],
  },
  {
    id: "q-ak-5",
    title: "Seberapa jauh kamu merasa orang tua mengenal dirimu, termasuk kepribadian, hal yang kamu sukai, ketakutan, cita-cita, dan sesuatu yang membuatmu bahagia?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-5-a",
        title: "A. Sangat mengenal karena orang tua sering memperhatikan dan memahami kehidupanku.",
      },
      {
        id: "ak-5-b",
        title: "B. Cukup mengenal, tetapi masih ada beberapa hal yang belum mereka ketahui.",
      },
      {
        id: "ak-5-c",
        title: "C. Kurang mengenal karena jarang membicarakan hal-hal pribadi denganku.",
      },
      {
        id: "ak-5-d",
        title: "D. Tidak terlalu mengenal karena hubungan kami lebih banyak membahas kewajiban dan kebutuhan sehari-hari.",
      },
    ],
  },
  {
    id: "q-ak-6",
    title: "Bagaimana kamu menggambarkan waktu kebersamaanmu dengan orang tua selama ini?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-6-a",
        title: "A. Sering menghabiskan waktu bersama dan melakukan komunikasi yang bermakna.",
      },
      {
        id: "ak-6-b",
        title: "B. Memiliki waktu bersama, tetapi biasanya hanya pada kesempatan tertentu.",
      },
      {
        id: "ak-6-c",
        title: "C. Jarang menghabiskan waktu bersama karena kesibukan masing-masing.",
      },
      {
        id: "ak-6-d",
        title: "D. Hampir tidak pernah memiliki waktu khusus untuk berbicara dari hati ke hati.",
      },
    ],
  },
  {
    id: "q-ak-7",
    title: "Ketika kamu sedang mengalami tekanan, kecemasan, atau permasalahan dalam pertemanan, apakah kamu merasa orang tua dapat menjadi tempat untuk mencari dukungan emosional?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-7-a",
        title: "A. Sangat merasa aman karena orang tua selalu berusaha memahami perasaanku.",
      },
      {
        id: "ak-7-b",
        title: "B. Cukup merasa aman, meskipun terkadang masih sulit mengungkapkan semuanya.",
      },
      {
        id: "ak-7-c",
        title: "C. Kurang merasa aman karena khawatir akan mendapatkan penilaian negatif.",
      },
      {
        id: "ak-7-d",
        title: "D. Tidak merasa aman karena lebih memilih mencari dukungan dari orang lain.",
      },
    ],
  },
  {
    id: "q-ak-8",
    title: "Sejauh mana orang tua memberikan kepercayaan dan kebebasan kepadamu dalam menentukan pilihan hidup, mengembangkan minat, serta membangun identitas diri?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-8-a",
        title: "A. Memberikan kepercayaan dan kebebasan dengan tetap memberikan arahan.",
      },
      {
        id: "ak-8-b",
        title: "B. Memberikan kebebasan selama pilihanku sesuai dengan harapan mereka.",
      },
      {
        id: "ak-8-c",
        title: "C. Sering membatasi pilihanku meskipun aku sudah mempertimbangkannya.",
      },
      {
        id: "ak-8-d",
        title: "D. Hampir seluruh keputusan penting dalam hidupku ditentukan oleh orang tua.",
      },
    ],
  },
  {
    id: "q-ak-9",
    title: "Ketika terjadi pertengkaran atau perbedaan pendapat dengan orang tua, bagaimana biasanya hubungan kalian setelahnya?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-9-a",
        title: "A. Kami berusaha saling memahami, meminta maaf, dan menyelesaikan masalah bersama.",
      },
      {
        id: "ak-9-b",
        title: "B. Biasanya kembali membaik setelah beberapa waktu meskipun tidak selalu membicarakan masalahnya.",
      },
      {
        id: "ak-9-c",
        title: "C. Masalah sering dibiarkan tanpa penyelesaian yang jelas.",
      },
      {
        id: "ak-9-d",
        title: "D. Aku cenderung menghindar dan menjaga jarak karena merasa tidak dipahami.",
      },
    ],
  },
  {
    id: "q-ak-10",
    title: "Apakah kamu merasa mendapatkan kasih sayang dan perhatian yang cukup dari orang tua, bukan hanya melalui pemenuhan kebutuhan materi, tetapi juga melalui perhatian emosional?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-10-a",
        title: "A. Sangat merasa disayangi melalui perhatian, dukungan, waktu, dan komunikasi.",
      },
      {
        id: "ak-10-b",
        title: "B. Merasa disayangi, tetapi terkadang masih membutuhkan perhatian lebih.",
      },
      {
        id: "ak-10-c",
        title: "C. Kurang merasakan perhatian emosional karena orang tua lebih fokus pada kebutuhan sehari-hari.",
      },
      {
        id: "ak-10-d",
        title: "D. Sering merasa kesepian meskipun berada di tengah keluarga.",
      },
    ],
  },
  {
    id: "q-ak-11",
    title: "Jika kamu memiliki masalah atau sesuatu yang ingin disampaikan, tetapi belum berani mengungkapkannya kepada orang tua, apa alasan terbesarmu?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-11-a",
        title: "A. Sebenarnya tidak ada hambatan karena aku merasa bebas bercerita.",
      },
      {
        id: "ak-11-b",
        title: "B. Takut membuat orang tua khawatir atau kecewa.",
      },
      {
        id: "ak-11-c",
        title: "C. Takut disalahpahami, dihakimi, atau mendapatkan respons yang tidak menyenangkan.",
      },
      {
        id: "ak-11-d",
        title: "D. Merasa orang tua tidak akan memahami apa yang sedang aku alami.",
      },
    ],
  },
  {
    id: "q-ak-12",
    title: "Jika diberikan kesempatan untuk memperbaiki satu hal dalam hubunganmu dengan orang tua, perubahan apa yang paling kamu harapkan?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "ak-12-a",
        title: "A. Membangun komunikasi yang lebih terbuka dan saling mendengarkan.",
      },
      {
        id: "ak-12-b",
        title: "B. Memiliki lebih banyak waktu berkualitas bersama keluarga.",
      },
      {
        id: "ak-12-c",
        title: "C. Mendapatkan lebih banyak kepercayaan, pengertian, dan kebebasan.",
      },
      {
        id: "ak-12-d",
        title: "D. Ingin lebih dihargai perasaannya dan tidak mudah dihakimi ketika bercerita.",
      },
    ],
  },
  {
    id: "q-ak-13",
    title: "Pesan dari Hati Anak",
    subtitle: "Bayangkan saat ini kamu memiliki kesempatan berbicara secara terbuka kepada ayah dan ibu tanpa interupsi, kemarahan, maupun penghakiman. Apa yang ingin kamu sampaikan kepada mereka mengenai perasaan, kebutuhan, harapan, dan keinginanmu untuk memiliki hubungan keluarga yang lebih dekat?",
    type: "text",
    required: true,
    placeholder: "Tuliskan isi hatimu, perasaanmu, dan harapanmu untuk ayah dan ibu di sini...",
  },
];

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
    questions: orangTuaQuestions,
  },
  {
    id: "sublink-anak",
    slug: "anak",
    title: "Kuisioner Program GALAXY — Siswa & Remaja",
    targetAudience: "Siswa / Remaja",
    description:
      "Ruang berekspresi bagi anak untuk menyampaikan perasaan, rasa didengar di rumah, serta harapan terhadap kehadiran emosional orang tua. Tema: 'Beda Generasi, Satu Hati, Saling Memahami'.",
    isActive: true,
    estimatedMinutes: 3,
    totalResponses: 0,
    lastUpdated: "Hari ini",
    questions: anakQuestions,
  },
];

// Helper functions for localStorage fallback
const STORAGE_KEY = "galaxy_survey_sublinks_v1";

export function getStoredSublinks(): SurveySublink[] {
  if (typeof window === "undefined") {
    return defaultSublinks;
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSublinks));
    return defaultSublinks;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return defaultSublinks;
  }
}

export function saveStoredSublinks(sublinks: SurveySublink[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sublinks));
}
