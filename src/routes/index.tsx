import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  FileSpreadsheet,
  Filter,
  Newspaper,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import diy from "@/assets/diy.png";
import bantul from "@/assets/bantul.jpeg";
import sleman from "@/assets/sleman.jpeg";
import kulonprogo from "@/assets/kulonprogo.jpeg";
import gunungkidul from "@/assets/gunungkidul.jpeg";
import jogjakota from "@/assets/jogjakota.jpeg";
import logo from "@/assets/logo.png";
import BI_Logo from "@/assets/BI_Logo.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "SentimenDIY — Analitik Sentimen Berita Ekonomi Yogyakarta" },
      {
        name: "description",
        content:
          "Platform analisis sentimen berita ekonomi & inflasi se-DIY: scraping, klasifikasi IndoBERT, topik LDA, dan ringkasan otomatis dalam satu dasbor.",
      },
      { property: "og:title", content: "SentimenDIY — Analitik Sentimen Berita Ekonomi" },
      {
        property: "og:description",
        content: "Pantau sentimen berita ekonomi Daerah Istimewa Yogyakarta secara real-time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "icon", href: BI_Logo }],
  }),
});

/* ================= Data ================= */

// Catatan fix overlap tablet: semua badge sekarang diposisikan DEKAT TEPI
// (offset kecil dari left/right, 3-11%), bukan dekat tengah - jadi aman dari
// kolom teks yang di-center berapa pun lebar layarnya. Munculnya bareng dari
// breakpoint sm (640px) ke atas; kolom teks di bawah juga dibikin lebih
// sempit khusus di ukuran tablet (lihat className di komponen Hero) supaya
// marginnya selalu cukup buat badge.
const FLOATERS = [
  {
    src: bantul,
    alt: "Lambang Kabupaten Bantul",
    cls: "left-[3%] top-[18%] h-16 w-16 sm:h-20 sm:w-20",
    delay: "0s",
  },
  {
    src: kulonprogo,
    alt: "Lambang Kabupaten Kulon Progo",
    cls: "left-[8%] bottom-[14%] h-14 w-14 sm:h-18 sm:w-18",
    delay: "1.1s",
  },
  {
    src: sleman,
    alt: "Lambang Kabupaten Sleman",
    cls: "left-[6%] top-[46%] h-14 w-14 sm:h-16 sm:w-16",
    delay: "2s",
  },
  {
    src: gunungkidul,
    alt: "Lambang Kabupaten Gunungkidul",
    cls: "right-[4%] top-[16%] h-16 w-16 sm:h-20 sm:w-20",
    delay: "0.6s",
  },
  {
    src: jogjakota,
    alt: "Lambang Kota Yogyakarta",
    cls: "right-[9%] bottom-[13%] h-14 w-14 sm:h-18 sm:w-18",
    delay: "1.6s",
  },
  {
    src: diy,
    alt: "Lambang Daerah Istimewa Yogyakarta",
    cls: "right-[7%] top-[48%] h-14 w-14 sm:h-16 sm:w-16",
    delay: "2.4s",
  },
];

const FEATURES = [
  {
    icon: Newspaper,
    title: "Scraping Berita Otomatis",
    desc: "Mengambil hingga 1.000 artikel per periode sesuai kata kunci, lengkap dengan isi berita dan deduplikasi.",
  },
  {
    icon: Brain,
    title: "Klasifikasi SVM",
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

const ALUR = [
  {
    n: "01",
    t: "Tentukan Periode & Kata Kunci",
    d: "Pilih bulan, tahun, jumlah berita, dan kata kunci seperti inflasi atau pangan.",
  },
  {
    n: "02",
    t: "Scraping Berita",
    d: "Sistem mengambil artikel dari Google News sesuai kata kunci & periode, lalu menyaring duplikat.",
  },
  {
    n: "03",
    t: "Klasifikasi Topik",
    d: "Berita dianalisis menggunakan metode berbasis leksikon (lexicon-based) dan dikategorikan menggunakan SVM untuk menentukan sentimen positif, negatif, atau netral.",
  },
  {
    n: "04",
    t: "Baca & Ekspor",
    d: "Pantau hasil analisis melalui dashboard interaktif dan ekspor laporan ke format Excel dengan mudah.",
  },
];

/* ================= Page ================= */

function LandingPage() {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  const goToDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLeaving) return;
    setIsLeaving(true);
    setTimeout(() => {
      navigate({ to: "/dashboard" });
    }, 380);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style>{`
        @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-2deg);} 50% { transform: translateY(-14px) rotate(2deg);} }
        .floaty { animation: floaty 6s ease-in-out infinite; }
      `}</style>

      {/* Overlay transisi - fade-in pas mau pindah ke /dashboard */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ${
          isLeaving ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`h-9 w-9 rounded-full border-2 border-primary border-t-transparent transition-opacity duration-300 ${
            isLeaving ? "animate-spin opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div
        className={`transition-all duration-300 ease-out ${
          isLeaving ? "scale-[0.99] opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <Nav />
        <Hero onNavigate={goToDashboard} />
        <Fitur />
        <Alur onNavigate={goToDashboard} />
        <Footer />
      </div>
    </div>
  );
}

/* ================= Nav ================= */

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <img
            src={BI_Logo}
            alt="Logo SentimenDIY"
            className="h-9 w-auto shrink-0 object-contain sm:h-13"
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
          <a href="#alur" className="transition-colors hover:text-primary">
            Alur
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ================= Hero ================= */

function Hero({ onNavigate }: { onNavigate: (e: React.MouseEvent) => void }) {
  return (
    <section className="relative overflow-hidden px-5 pb-28 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {FLOATERS.map((f) => (
        <div
          key={f.alt}
          className={`floaty pointer-events-none absolute z-0 hidden rounded-2xl bg-card p-2.5 shadow-[0_18px_40px_-18px_rgba(54,116,181,0.55)] ring-1 ring-border sm:block ${f.cls}`}
          style={{ animationDelay: f.delay }}
        >
          <img src={f.src} alt={f.alt} className="h-full w-full object-contain" />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-3xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl text-center">
        <h1 className="mt-6 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Menelusuri sentimen dan tren ekonomi dari berbagai berita.
        </h1>
        <p className="mx-auto mt-5 w-full max-w-2xl px-4 text-justify text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-base">
          Website ini dikembangkan oleh Bank Indonesia KPw DIY sebagai platform analisis sentimen
          berita berbasis machine learning. Hasil analisis yang disajikan bertujuan untuk menambah
          wawasan, mempermudah pemantauan isu, dan mendukung pengambilan keputusan berbasis data.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/dashboard"
            onClick={onNavigate}
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
    </section>
  );
}

/* ================= Fitur ================= */

function Fitur() {
  return (
    <section id="fitur" className="mx-auto max-w-6xl px-5 pt-16 pb-8">
      <div className="max-w-2xl">
        <span className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Fitur</span>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <RevealCard key={f.title} delay={i * 80}>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </RevealCard>
        ))}
      </div>
    </section>
  );
}

/* ================= Alur ================= */

function Alur({ onNavigate }: { onNavigate: (e: React.MouseEvent) => void }) {
  return (
    <section id="alur" className="mx-auto max-w-6xl px-5 pt-8 pb-20">
      <span className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Alur</span>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {ALUR.map((s, i) => (
          <RevealCard key={s.n} delay={i * 90} className="flex items-start gap-5">
            <span className="shrink-0 text-sm font-extrabold text-accent">{s.n}</span>
            <div>
              <h3 className="text-base font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          </RevealCard>
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
          onClick={onNavigate}
        >
          Buka Dashboard <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ================= Footer ================= */

function Footer() {
  return (
    <footer className="text-center text-xs text-muted-foreground py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-5 py-8 text-center text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} · Daerah Istimewa Yogyakarta</span>
        <span>Developed by Fiki Vania Arun Fadila &amp; Ananda Auliya Rahma</span>
      </div>
    </footer>
  );
}

/* ================= Helpers ================= */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

function RevealCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`rounded-2xl bg-card p-6 ring-1 ring-border transition-all duration-700 ease-out motion-reduce:transition-none hover:shadow-[0_20px_45px_-25px_rgba(54,116,181,0.6)] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
