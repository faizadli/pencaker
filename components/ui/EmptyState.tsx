"use client";

export default function EmptyState({ icon, title, description, onReset, resetLabel }: { icon: string; title: string; description: string; onReset?: () => void; resetLabel?: string }) {
  return (
    <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
      <i className={`${icon} text-4xl text-gray-300 mb-3`}></i>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {onReset && (
        <button onClick={onReset} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">
          {resetLabel || "Reset"}
        </button>
      )}
    </div>
  );
}
