import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Database,
  Github,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  Filter,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import diy from "@/assets/diy.png";
import bantul from "@/assets/bantul.jpeg";
import sleman from "@/assets/sleman.jpeg";
import kulonprogo from "@/assets/kulonprogo.jpeg";
import gunungkidul from "@/assets/gunungkidul.jpeg";
import jogjakota from "@/assets/jogjakota.jpeg";
import mockup from "@/assets/mockup.png";
import logo from "@/assets/logo.png";
import BI_Logo from "@/assets/BI_Logo.png";
import tutorialVideo from "@/assets/tutorial.mp4";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "SentimenDIY — Analitik Sentimen Berita Ekonomi Yogyakarta" },
      {
        name: "description",
        content:
          "Platform analisis sentimen berita ekonomi & inflasi se-DIY: scraping, klasifikasi, topik LDA, dan ringkasan otomatis dalam satu dasbor.",
      },
      { property: "og:title", content: "SentimenDIY — Analitik Sentimen Berita Ekonomi" },
      {
        property: "og:description",
        content:
          "Pantau sentimen berita ekonomi Daerah Istimewa Yogyakarta secara real-time dengan model IndoBERT dan topik LDA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const REGIONS = [
  { src: diy, alt: "Lambang Daerah Istimewa Yogyakarta", name: "DI Yogyakarta" },
  { src: jogjakota, alt: "Lambang Kota Yogyakarta", name: "Kota Yogyakarta" },
  { src: sleman, alt: "Lambang Kabupaten Sleman", name: "Sleman" },
  { src: bantul, alt: "Lambang Kabupaten Bantul", name: "Bantul" },
  { src: kulonprogo, alt: "Lambang Kabupaten Kulon Progo", name: "Kulon Progo" },
  { src: gunungkidul, alt: "Lambang Kabupaten Gunungkidul", name: "Gunungkidul" },
];

const MOCK_BARS = [42, 58, 35, 72, 50, 88, 64, 79, 46, 92, 61, 74];

const FEATURES = [
  {
    icon: Newspaper,
    title: "Scraping Berita Otomatis",
    desc: "Mengambil hingga 1.000 artikel per periode sesuai kata kunci, lengkap dengan isi berita.",
  },
  {
    icon: Brain,
    title: "Klasifikasi Support Vector Machine (SVM)",
    desc: "Mengklasifikasikan sentimen berita menjadi positif, negatif, dan netral. Performa dievaluasi menggunakan akurasi, presisi, recall, dan F1-score.",
  },
  {
    icon: BarChart3,
    title: "Topik LDA & Wordcloud",
    desc: "Temukan tema dominan seperti pangan, energi, dan daya beli beserta kata kunci pembentuknya.",
  },
  {
    icon: TrendingUp,
    title: "Tren Harian",
    desc: "Memantau pergerakan sentimen harian dan komoditas paling banyak diberitakan sepanjang bulan.",
  },
  {
    icon: Filter,
    title: "Deteksi Duplikat",
    desc: "Menghapus berita yang memiliki konten serupa dari berbagai sumber, sehingga hasil analisis lebih akurat.",
  },
  {
    icon: FileSpreadsheet,
    title: "Export Laporan",
    desc: "Mengekspor hasil analisis lengkap ke dalam format Excel sehingga memudahkan dokumentasi.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <style>{`
        @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-2deg);} 50% { transform: translateY(-14px) rotate(2deg);} }
        .floaty { animation: floaty 6s ease-in-out infinite; }
      html { scroll-snap-type: y proximity; }
      `}</style>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <img
              src={BI_Logo}
              alt="Logo SentimenDIY"
              className="h-8 w-8 shrink-0 rounded-lg object-cover"
            />
            <img
              src={logo}
              alt="Logo SentimenDIY"
              className="h-9 w-auto shrink-0 object-contain sm:h-10.5"
            />
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#fitur" className="transition-colors hover:text-primary">
              Fitur
            </a>
            <a href="#tutorial" className="transition-colors hover:text-primary">
              Tutorial
            </a>
            <a href="#faq" className="transition-colors hover:text-primary">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-28 pt-16 sm:pt-24">
        {/* Pita transisi: gradasi biru muda cuma di seam bawah Hero, blend ke putih di section berikutnya */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--brand-400) 16%, white) 55%, #ffffff 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
            maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
              Monitoring Berita dan Analisis Opini.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base lg:mx-0">
              Website ini dikembangkan oleh Bank Indonesia KPw DIY sebagai platform analisis
              sentimen berita berbasis machine learning. Hasil analisis yang disajikan bertujuan
              untuk menambah wawasan, mempermudah pemantauan isu, dan mendukung pengambilan
              keputusan berbasis data.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                Mulai Analisis <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#fitur"
                className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-border transition-transform hover:scale-[1.03]"
              >
                Pelajari Fitur
              </a>
            </div>
          </div>

          {/* Mockup aplikasi */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="floaty">
              <img
                src={mockup}
                alt="Mockup Dashboard SentimenDIY"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cakupan wilayah — logo sejajar */}
      <section id="wilayah" className="relative border-y border-border bg-card/80">
        <div className="mx-auto max-w-6xl px-5 py-9">
          <div className="mt-6 flex flex-wrap items-end justify-center gap-3 sm:gap-5">
            {REGIONS.map((r) => (
              <div
                key={r.name}
                className="group flex w-[92px] flex-col items-center gap-2 rounded-2xl bg-card px-2.5 py-3 ring-1 ring-border transition-all hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-25px_rgba(54,116,181,0.7)] sm:w-[120px]"
              >
                <img
                  src={r.src}
                  alt={r.alt}
                  className="h-12 w-12 object-contain transition-transform group-hover:scale-110 sm:h-16 sm:w-16"
                  loading="lazy"
                />
                <span className="text-center text-[10px] font-semibold leading-tight text-muted-foreground sm:text-[11px]">
                  {r.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Fitur</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-card p-6 ring-1 ring-border transition-shadow hover:shadow-[0_20px_45px_-25px_rgba(54,116,181,0.6)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tutorial */}
      <section id="tutorial" className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cara Pakai</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Tonton panduan singkat atau ikuti langkah-langkah di bawah untuk mulai menganalisis
            sentimen berita ekonomi DIY.
          </p>
        </div>

        {/* Video player */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-card p-3 ring-1 ring-border shadow-[0_40px_80px_-45px_rgba(54,116,181,0.7)] sm:p-5">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-background ring-1 ring-border">
            <video
              src={tutorialVideo}
              controls
              poster={logo}
              className="h-full w-full object-cover"
            >
              Browser kamu tidak mendukung tag video.
            </video>
          </div>
          <div className="px-2 pt-4 sm:px-4">
            <h3 className="text-sm font-bold">Panduan lengkap penggunaan dasbor SentimenDIY</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Dari menentukan kata kunci hingga mengekspor laporan analisis.
            </p>
          </div>
        </div>

        {/* Step cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Tentukan Periode & Kata Kunci",
              d: "Pilih bulan, tahun, jumlah berita, dan kata kunci seperti inflasi atau pangan.",
            },
            {
              n: "02",
              t: "Jalankan Analisis",
              d: "Sistem melakukan scraping, normalisasi, deduplikasi, klasifikasi sentimen, dan ekstraksi topik.",
            },
            {
              n: "03",
              t: "Baca & Ekspor",
              d: "Pantau hasil analisis melalui dashboard interaktif dan ekspor laporan ke format Excel dengan mudah.",
            },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <span className="text-sm font-extrabold text-accent">{s.n}</span>
              <h3 className="mt-2 text-base font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-14 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 rounded-3xl p-8 text-primary-foreground sm:flex sm:justify-between sm:p-10"
          style={{ background: "linear-gradient(120deg, var(--brand-700), var(--brand-400))" }}
        >
          <div className="min-w-0">
            <h3 className="text-xl font-extrabold sm:text-2xl">Siap melihat sentimen bulan ini?</h3>
            <p className="mt-2 text-sm opacity-90">
              Temukan insight dari ribuan berita ekonomi dalam satu platform.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-card px-5 py-3 text-sm font-semibold text-primary"
          >
            Buka Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Pertanyaan yang sering diajukan
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          {[
            {
              q: "Dari mana data berita diperoleh?",
              a: "Data berita diperoleh dari Google News yang memuat berbagai portal berita nasional. Pencarian dilakukan berdasarkan kata kunci dan rentang waktu yang dipilih, kemudian artikel yang terduplikasi akan disaring sebelum dianalisis.",
            },
            {
              q: "Seberapa akurat hasil klasifikasi sentimennya?",
              a: "Berdasarkan pengujian pada data uji, model mencapai akurasi sekitar 78% dengan performa yang relatif seimbang pada setiap kelas sentimen. Detail metrik evaluasi dan confusion matrix tersedia pada tab Validasi Model untuk membantu melihat performa model secara lebih menyeluruh.",
            },
            {
              q: "Apakah hasil analisis dapat diekspor?",
              a: "Bisa. Hasil analisis dapat diunduh sebagai CSV/Excel mencakup informasi berita seperti judul, tanggal, sumber, label sentimen, dan topik, serta dapat digunakan untuk dokumentasi maupun kebutuhan analisis dan pelaporan.",
            },
          ].map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className="text-center text-xs text-muted-foreground py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-5 py-8 text-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} · Daerah Istimewa Yogyakarta</span>
          <span>Developed by Fiki Vania Arun Fadila &amp; Ananda Auliya Rahma</span>
        </div>
      </footer>
    </div>
  );
}
