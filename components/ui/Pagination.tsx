"use client";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
};

export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange, pageSizeOptions = [10, 20, 50] }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  const goPrev = () => { if (page > 1) onPageChange(page - 1); };
  const goNext = () => { if (page < totalPages) onPageChange(page + 1); };

  const pages: number[] = [];
  const maxButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  for (let p = startPage; p <= endPage; p++) pages.push(p);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3">
      <div className="text-sm text-[#6b7280]">Menampilkan <span className="font-semibold text-[#2a436c]">{start}</span>–<span className="font-semibold text-[#2a436c]">{end}</span> dari <span className="font-semibold text-[#2a436c]">{total}</span></div>
      <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
        {onPageSizeChange && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-sm text-[#6b7280]">Tampil</span>
            <select value={pageSize} onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))} className="border border-[#e5e7eb] rounded-lg px-2 py-2 text-sm text-[#2a436c] bg-white w-[5.5rem]">
              {pageSizeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
        )}
        <div className="flex-1 sm:flex-none">
          <div className="flex items-center justify-start gap-2">
            <div className="sm:hidden flex items-center gap-2">
              {onPageSizeChange && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6b7280]">Tampil</span>
                  <select value={pageSize} onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))} className="border border-[#e5e7eb] rounded-lg px-2 py-1 text-sm text-[#2a436c] bg-white w-16">
                    {pageSizeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>
              )}
              <button aria-label="Sebelumnya" onClick={goPrev} disabled={page <= 1} className="w-8 h-8 inline-flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#2a436c] bg-white disabled:opacity-50 hover:bg-[#f3f4f6]"><i className="ri-arrow-left-s-line"></i></button>
              {startPage > 2 && (<span className="px-2 text-[#6b7280]">…</span>)}
              {pages.map((p) => (
                <button
                  key={p}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => onPageChange(p)}
                  className={`min-w-8 h-8 px-2 inline-flex items-center justify-center text-sm border transition-colors ${p === page ? "bg-[#355485] border-[#355485] text-white font-semibold shadow-sm" : "border-[#e5e7eb] text-[#355485] bg-white hover:border-[#355485]"} rounded-full`}
                >
                  {p}
                </button>
              ))}
              {endPage < totalPages - 1 && (<span className="px-2 text-[#6b7280]">…</span>)}
              <button aria-label="Berikutnya" onClick={goNext} disabled={page >= totalPages} className="w-8 h-8 inline-flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#2a436c] bg-white disabled:opacity-50 hover:bg-[#f3f4f6]"><i className="ri-arrow-right-s-line"></i></button>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <button onClick={() => onPageChange(1)} disabled={page <= 1} className="w-9 h-9 inline-flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#2a436c] bg-white disabled:opacity-50 hover:bg-[#f3f4f6]"><i className="ri-skip-left-line"></i></button>
              <button onClick={goPrev} disabled={page <= 1} className="w-9 h-9 inline-flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#2a436c] bg-white disabled:opacity-50 hover:bg-[#f3f4f6]"><i className="ri-arrow-left-s-line"></i></button>
              {startPage > 2 && (<span className="px-2 text-[#6b7280]">…</span>)}
              {pages.map((p) => (
                <button
                  key={p}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => onPageChange(p)}
                  className={`min-w-8 h-9 px-3 inline-flex items-center justify-center text-sm border transition-colors ${p === page ? "bg-[#355485] border-[#355485] text-white font-semibold shadow-sm" : "border-[#e5e7eb] text-[#355485] bg-white hover:border-[#355485]"} rounded-full`}
                >
                  {p}
                </button>
              ))}
              {endPage < totalPages - 1 && (<span className="px-2 text-[#6b7280]">…</span>)}
              <button onClick={goNext} disabled={page >= totalPages} className="w-9 h-9 inline-flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#2a436c] bg-white disabled:opacity-50 hover:bg-[#f3f4f6]"><i className="ri-arrow-right-s-line"></i></button>
              <button onClick={() => onPageChange(totalPages)} disabled={page >= totalPages} className="w-9 h-9 inline-flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#2a436c] bg-white disabled:opacity-50 hover:bg-[#f3f4f6]"><i className="ri-skip-right-line"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
