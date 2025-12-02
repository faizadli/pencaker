export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-[#e5e7eb] overflow-hidden">
        <div className="bg-[#355485] text-white py-6 px-8 text-center">
          <h1 className="text-2xl font-bold">Masuk</h1>
          <p className="text-sm opacity-90">Silakan pilih jenis akun untuk masuk</p>
        </div>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/login/candidate" className="group border border-[#e5e7eb] rounded-xl p-6 hover:border-[#355485] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] text-[#355485] flex items-center justify-center">
                <i className="ri-user-line"></i>
              </div>
              <div>
                <div className="font-semibold text-[#1f2937]">Pencaker</div>
                <div className="text-sm text-[#6b7280]">Login untuk pencari kerja</div>
              </div>
            </div>
          </a>
          <a href="/login/company" className="group border border-[#e5e7eb] rounded-xl p-6 hover:border-[#355485] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] text-[#355485] flex items-center justify-center">
                <i className="ri-building-2-line"></i>
              </div>
              <div>
                <div className="font-semibold text-[#1f2937]">Perusahaan</div>
                <div className="text-sm text-[#6b7280]">Login untuk perusahaan</div>
              </div>
            </div>
          </a>
          <a href="/login/admin" className="group border border-[#e5e7eb] rounded-xl p-6 hover:border-[#355485] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] text-[#355485] flex items-center justify-center">
                <i className="ri-shield-user-line"></i>
              </div>
              <div>
                <div className="font-semibold text-[#1f2937]">Admin Disnaker</div>
                <div className="text-sm text-[#6b7280]">Login untuk admin</div>
              </div>
            </div>
          </a>
        </div>
        <div className="bg-[#f9fafb] px-8 py-4 text-center border-t border-[#e5e7eb]">
          <p className="text-xs text-[#9ca3af]">© 2025 Dinas Tenaga Kerja. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </div>
  );
}
