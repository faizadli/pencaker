"use client";

export default function StatCard({ title, value, change, color, icon }: { title: string; value: number | string; change: string; color: string; icon: string }) {
  const displayValue = typeof value === "number" ? new Intl.NumberFormat("id-ID").format(value) : value;
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm text-gray-500">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-primary mt-1">{displayValue}</p>
          <p className="text-xs text-gray-400 mt-1">{change}</p>
        </div>
        <div className="p-2 sm:p-3 w-10 h-10 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
          <i className={`${icon} text-lg sm:text-xl`}></i>
        </div>
      </div>
    </div>
  );
}
