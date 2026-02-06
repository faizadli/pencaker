"use client";
import { useState } from "react";
import { Input } from "../../../components/ui/field";
import Card from "../../../components/ui/Card";
import { useToast } from "../../../components/ui/Toast";

export default function InformalPage() {
  const [formData, setFormData] = useState({
    namaUsaha: "",
    pemilikUsaha: "",
    lokasiUsaha: "",
  });
  const { showSuccess, showError } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.namaUsaha.trim()) {
      showError("Nama usaha harus diisi");
      return;
    }
    if (!formData.pemilikUsaha.trim()) {
      showError("Pemilik usaha harus diisi");
      return;
    }
    if (!formData.lokasiUsaha.trim()) {
      showError("Lokasi usaha harus diisi");
      return;
    }

    // Mockup: hanya tampilkan toast sukses
    console.log("Data form:", formData);
    showSuccess("Data berhasil disimpan");

    // Reset form
    setFormData({
      namaUsaha: "",
      pemilikUsaha: "",
      lokasiUsaha: "",
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">
            Data Usaha Informal
          </h1>
          <p className="text-gray-600">Kelola data usaha informal di sistem</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Nama Usaha"
                value={formData.namaUsaha}
                onChange={(e) => handleChange("namaUsaha", e.target.value)}
                placeholder="Masukkan nama usaha"
                required
              />
            </div>

            <div>
              <Input
                label="Pemilik Usaha"
                value={formData.pemilikUsaha}
                onChange={(e) => handleChange("pemilikUsaha", e.target.value)}
                placeholder="Masukkan nama pemilik usaha"
                required
              />
            </div>

            <div>
              <Input
                label="Lokasi Usaha"
                value={formData.lokasiUsaha}
                onChange={(e) => handleChange("lokasiUsaha", e.target.value)}
                placeholder="Masukkan lokasi usaha"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    namaUsaha: "",
                    pemilikUsaha: "",
                    lokasiUsaha: "",
                  })
                }
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Simpan
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
