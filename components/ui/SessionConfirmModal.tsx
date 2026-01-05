"use client";

type SessionConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

/**
 * Modal shown when an admin tries to login while already logged in elsewhere.
 * Asks user to confirm if they want to force logout the old session.
 */
export default function SessionConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  loading = false,
}: SessionConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <i className="ri-error-warning-line text-amber-600 text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Sesi Aktif Terdeteksi
          </h3>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Akun ini sedang login di perangkat lain. Jika Anda lanjutkan, sesi di
          perangkat lain akan otomatis logout.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses...
              </>
            ) : (
              "Lanjutkan Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
