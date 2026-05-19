"use client";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import RemoteImage from "../../../components/RemoteImage";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getHomeContent } from "../../../services/site";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import { formatDate, stripHtml } from "../../../utils/format";
import { resolveImageSrc, rewriteContentHtml } from "../../../services/storage";

type NewsItem = {
  id: string;
  data: {
    judul?: string;
    tanggal?: string;
    kategori?: string;
    isi?: string;
    gambar?: string;
  };
};

const getKategoriColor = (k: string) => {
  const colors: Record<string, string> = {
    Informasi: "text-sky-700",
    Pelatihan: "text-amber-800",
    Transmigrasi: "text-emerald-700",
    Penempatan: "text-violet-700",
    "Hubungan Industri": "text-orange-700",
  };
  return colors[k] || "text-primary";
};

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950">
      {children}
    </div>
  );
}

function RelatedSection({ cat, items }: { cat: string; items: NewsItem[] }) {
  return (
    <section className="border-t border-slate-200 bg-slate-50/80 py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
          Berita terkait
        </h2>
        <p className="mt-1 text-sm text-slate-500">Kategori {cat}</p>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => {
            const relTitle = String(n.data?.judul || "");
            const relDate = formatDate(n.data?.tanggal);
            const relThumb = resolveImageSrc(n.data?.gambar, "");
            const relExcerpt = stripHtml(n.data?.isi || "").slice(0, 120);
            return (
              <li key={n.id}>
                <Link
                  href={`/informasi/${encodeURIComponent(n.id)}`}
                  className="landing-focus group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200/80 transition hover:shadow-md"
                >
                  {relThumb ? (
                    <RelatedThumb src={relThumb} alt={relTitle} />
                  ) : (
                    <RelatedPlaceholder />
                  )}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs text-slate-500">{relDate}</p>
                    <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-slate-900 group-hover:text-primary">
                      {relTitle}
                    </h3>
                    {relExcerpt ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {relExcerpt}
                        {relExcerpt.length >= 120 ? "..." : ""}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 text-center">
          <Link
            href="/informasi"
            className="landing-focus text-sm font-semibold text-primary hover:underline"
          >
            Lihat semua berita →
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
      <RemoteImage
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
    </div>
  );
}

function RelatedPlaceholder() {
  return (
    <div className="flex aspect-[16/10] items-center justify-center bg-slate-100 text-slate-300">
      <i className="ri-image-line text-3xl" aria-hidden />
    </div>
  );
}

export default function NewsDetailPage() {
  const { id } = useParams() as { id: string };
  const [item, setItem] = useState<NewsItem | null>(null);
  const [allItems, setAllItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getHomeContent();
        const rows = Array.isArray(resp?.news) ? resp.news : [];
        setAllItems(rows);
        const found = rows.find((n: NewsItem) => String(n.id) === String(id));
        setItem(found || null);
      } catch {
        setItem(null);
        setAllItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const relatedItems = useMemo(() => {
    if (!item) return [];
    const cat = String(item.data?.kategori || "Informasi");
    return allItems
      .filter(
        (n) =>
          String(n.id) !== String(id) &&
          String(n.data?.kategori || "Informasi") === cat,
      )
      .slice(0, 3);
  }, [allItems, item, id]);

  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </PageShell>
    );
  }

  if (!item) {
    return (
      <PageShell>
        <NotFoundPanel />
      </PageShell>
    );
  }

  const title = String(item.data?.judul || "");
  const date = formatDate(item.data?.tanggal);
  const cat = String(item.data?.kategori || "Informasi");
  const thumbSrc = resolveImageSrc(item.data?.gambar, "");
  const html = rewriteContentHtml(String(item.data?.isi || ""));

  return (
    <PageShell>
      <article>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
            <Link
              href="/informasi"
              className="landing-focus inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-primary"
            >
              <i className="ri-arrow-left-line text-base" aria-hidden />
              Berita & Informasi
            </Link>

            <ArticleMeta cat={cat} date={date} tanggal={item.data?.tanggal} />

            <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.2] tracking-tight text-slate-900 text-balance sm:text-4xl sm:leading-[1.15] lg:text-[2.75rem]">
              {title}
            </h1>
          </div>
        </header>

        {thumbSrc ? (
          <figure className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
            <RemoteImage
              src={thumbSrc}
              alt={title}
              width={1200}
              height={630}
              className="h-auto w-full rounded-lg border border-slate-200/80 bg-slate-50 object-contain shadow-sm"
            />
          </figure>
        ) : null}

        <div className="overflow-visible bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-3xl overflow-visible px-4 sm:px-6">
            <div
              className="article-body content-rich prose prose-lg max-w-none overflow-visible prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-p:whitespace-normal prose-p:text-[1.0625rem] prose-p:leading-[1.8] prose-p:text-slate-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:my-6 prose-img:h-auto prose-img:max-h-none prose-img:max-w-full prose-img:rounded-lg prose-img:object-contain prose-img:shadow-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <footer className="mt-10 border-t border-slate-200 pt-8">
              <Link
                href="/informasi"
                className="landing-focus inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Lihat semua berita
              </Link>
            </footer>
          </div>
        </div>
      </article>

      {relatedItems.length > 0 ? (
        <RelatedSection cat={cat} items={relatedItems} />
      ) : null}
    </PageShell>
  );
}

function NotFoundPanel() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <i className="ri-newspaper-line text-5xl text-slate-300" aria-hidden />
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Artikel tidak ditemukan
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Halaman yang Anda cari tidak tersedia atau sudah dihapus.
      </p>
      <Link
        href="/informasi"
        className="landing-focus mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <i className="ri-arrow-left-line" aria-hidden />
        Kembali ke berita
      </Link>
    </div>
  );
}

function ArticleMeta({
  cat,
  date,
  tanggal,
}: {
  cat: string;
  date: string;
  tanggal?: string;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <span
        className={`font-semibold uppercase tracking-wide ${getKategoriColor(cat)}`}
      >
        {cat}
      </span>
      <span className="text-slate-300" aria-hidden>
        |
      </span>
      <time className="text-slate-500" dateTime={tanggal}>
        {date}
      </time>
    </div>
  );
}
