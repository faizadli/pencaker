"use client";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
};

const navBtnClass =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-primary transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

const pageBtnClass = (active: boolean) =>
  `inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border px-2.5 text-sm tabular-nums transition-colors ${
    active
      ? "border-primary bg-primary font-semibold text-white shadow-sm"
      : "border-slate-200 bg-white text-primary hover:border-primary"
  }`;

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  className = "",
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  const goPrev = () => {
    if (page > 1) onPageChange(page - 1);
  };
  const goNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const buildPageRange = (maxButtons: number) => {
    const pages: number[] = [];
    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    for (let p = startPage; p <= endPage; p++) pages.push(p);
    return { pages, startPage, endPage };
  };

  const desktop = buildPageRange(5);
  const compact = buildPageRange(3);

  const pageSizeSelect = onPageSizeChange ? (
    <label className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
      <span className="shrink-0">Tampil</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
        className="min-w-0 max-w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-primary"
        aria-label="Jumlah baris per halaman"
      >
        {pageSizeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  ) : null;

  const renderPageButtons = (
    range: number[],
    rangeStart: number,
    rangeEnd: number,
  ) => (
    <>
      {rangeStart > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className={pageBtnClass(page === 1)}
            aria-label="Halaman 1"
          >
            1
          </button>
          {rangeStart > 2 && (
            <span className="shrink-0 px-0.5 text-slate-400" aria-hidden>
              …
            </span>
          )}
        </>
      )}
      {range.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={pageBtnClass(p === page)}
        >
          {p}
        </button>
      ))}
      {rangeEnd < totalPages && (
        <>
          {rangeEnd < totalPages - 1 && (
            <span className="shrink-0 px-0.5 text-slate-400" aria-hidden>
              …
            </span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className={pageBtnClass(page === totalPages)}
            aria-label={`Halaman ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}
    </>
  );

  return (
    <div className={`w-full min-w-0 space-y-3 p-2 sm:p-3 ${className}`.trim()}>
      <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
        Menampilkan <span className="font-semibold text-primary">{start}</span>–
        <span className="font-semibold text-primary">{end}</span> dari{" "}
        <span className="font-semibold text-primary">{total}</span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {pageSizeSelect && (
          <div className="flex justify-center sm:justify-start">
            {pageSizeSelect}
          </div>
        )}

        {/* Mobile: prev/next + ringkasan halaman */}
        <nav
          className="flex w-full min-w-0 items-center justify-between gap-2 sm:hidden"
          aria-label="Navigasi halaman"
        >
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            onClick={goPrev}
            disabled={page <= 1}
            className={navBtnClass}
          >
            <i className="ri-arrow-left-s-line text-lg" aria-hidden />
          </button>
          <span className="min-w-0 truncate px-1 text-center text-sm font-medium text-slate-700 tabular-nums">
            Halaman {page} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            onClick={goNext}
            disabled={page >= totalPages}
            className={navBtnClass}
          >
            <i className="ri-arrow-right-s-line text-lg" aria-hidden />
          </button>
        </nav>

        {/* Mobile: nomor halaman — scroll horizontal jika perlu */}
        {totalPages > 1 && (
          <nav
            className="flex w-full min-w-0 overflow-x-auto sm:hidden [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Nomor halaman"
          >
            <div className="mx-auto flex min-w-min items-center justify-center gap-1 px-1 pb-0.5">
              {renderPageButtons(
                compact.pages,
                compact.startPage,
                compact.endPage,
              )}
            </div>
          </nav>
        )}

        {/* Desktop */}
        <nav
          className="hidden min-w-0 flex-wrap items-center justify-center gap-1 sm:flex sm:justify-end"
          aria-label="Navigasi halaman"
        >
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
            className={navBtnClass}
            aria-label="Halaman pertama"
          >
            <i className="ri-skip-left-line" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goPrev}
            disabled={page <= 1}
            className={navBtnClass}
            aria-label="Halaman sebelumnya"
          >
            <i className="ri-arrow-left-s-line" aria-hidden />
          </button>
          {renderPageButtons(desktop.pages, desktop.startPage, desktop.endPage)}
          <button
            type="button"
            onClick={goNext}
            disabled={page >= totalPages}
            className={navBtnClass}
            aria-label="Halaman berikutnya"
          >
            <i className="ri-arrow-right-s-line" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
            className={navBtnClass}
            aria-label="Halaman terakhir"
          >
            <i className="ri-skip-right-line" aria-hidden />
          </button>
        </nav>
      </div>
    </div>
  );
}
