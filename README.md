# galaksi-kuisioner

Platform Kuisioner & Evaluasi Program GALAXY (*Beda Generasi, Satu Hati, Saling Memahami*).

Program intervensi dan kolaborasi yang dirancang untuk mempertemukan kembali anak dan orang tua secara emosional melalui komunikasi dua arah, rasa saling memiliki, dan kehadiran emosional di rumah sebagai *safe space*.

## Fitur Utama

- **Portal Pemilihan Kuisioner Publik (`/`):** Jalur pemilihan langsung untuk Orang Tua/Wali dan Anak/Remaja.
- **Formulir Interaktif Responden (`/[slug]`):**
  - Jalur Orang Tua & Wali Murid (`/orangtua`)
  - Jalur Anak & Remaja (`/anak`)
  - Stepper interaktif, single-choice, multiple-choice, rating NPS skala 1–10, dan refleksi teks terbuka.
  - Deteksi otomatis perangkat responden (Laptop, Smartphone, Tablet).
  - Validasi wajib isi untuk nama responden dan butir pertanyaan.
  - Animasi konfirmasi centang (`centang.lottie`) looping 2x sebelum transisi otomatis.
- **Admin Dashboard & Analytics (`/admin`):**
  - Autentikasi terproteksi dengan sesi kredensial administrator.
  - Visualisasi tren perkembangan responden harian, indeks kepuasan, breakdown perangkat, dan proporsi audiens.
  - Manajemen Sublink: Buat sublink baru, edit judul/deskripsi/slug, serta kontrol toggle status **Aktif / Nonaktif** secara real-time.
  - Kelola Soal (*Question Builder*): Tambah, edit pertanyaan, tipe jawaban, dan status wajib.
  - Rekapitulasi Data Respon: Filter audiens, tingkat kepuasan, pencarian nama, ekspor data CSV & JSON, serta modal detail jawaban.
- **Penyimpanan Database Neon PostgreSQL:**
  - Terintegrasi langsung dengan tabel PostgreSQL untuk penyimpanan respon, sublink, dan data akun.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada peramban.
