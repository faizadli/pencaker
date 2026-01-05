"use client";

type SessionInvalidatedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Modal shown when the admin's session has been invalidated
 * because they logged in from another device.
 */
export default function SessionInvalidatedModal({
  isOpen,
  onClose,
}: SessionInvalidatedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <i className="ri-logout-box-r-line text-red-600 text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Sesi Berakhir</h3>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Sesi Anda telah berakhir karena login dari perangkat lain. Silakan
          login kembali untuk melanjutkan.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            Login Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
