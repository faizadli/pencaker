export default function Loading() {
  return (
    <main className="min-h-screen bg-white pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6 flex items-center justify-center h-[60vh]">
        <div className="flex items-center gap-3 text-[#355485]">
          <div className="w-5 h-5 border-2 border-[#355485] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Memuat dashboard...</span>
        </div>
      </div>
    </main>
  );
}
