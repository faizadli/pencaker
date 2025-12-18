"use client";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import FullPageLoading from "../../components/ui/FullPageLoading";
import { getHomeContent } from "../../services/site";
import Link from "next/link";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../components/ui/Table";

type BkkItem = { id: string; data: { nama?: string; alamat?: string; website?: string } };

export default function BkkLandingPage() {
  const [bkkList, setBkkList] = useState<Array<{ id: string; nama: string; alamat: string; website: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getHomeContent() as { bkk?: BkkItem[] };
        const rows = Array.isArray(resp?.bkk) ? resp.bkk : [];
        setBkkList(rows.map((r) => ({
          id: String(r.id),
          nama: String(r.data?.nama || ""),
          alamat: String(r.data?.alamat || ""),
          website: String(r.data?.website || ""),
        })));
      } catch {
        setBkkList([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <FullPageLoading />;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Bursa Kerja Khusus (BKK)</h1>
          <p className="text-sm sm:text-base opacity-95">Daftar BKK Wilayah Kabupaten Paser</p>
        </div>
      </section>
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Card header={<h2 className="text-lg font-semibold text-primary">Daftar BKK Wilayah Kabupaten Paser</h2>}>
            {bkkList.length === 0 ? (
              <EmptyState icon="ri-school-line" title="Belum ada data BKK" description="Silakan kembali lagi nanti." />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TH className="w-12">No</TH>
                    <TH>Nama BKK</TH>
                    <TH>Alamat</TH>
                    <TH>Website</TH>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bkkList.map((b, idx) => (
                    <TableRow key={b.id}>
                      <TD className="text-gray-700">{idx + 1}</TD>
                      <TD className="font-medium text-primary">{b.nama || "-"}</TD>
                      <TD className="text-gray-700">{b.alamat || "-"}</TD>
                      <TD>
                        {b.website && /^https?:\/\//i.test(b.website) ? (
                          <Link href={b.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
                            {b.website}
                          </Link>
                        ) : (
                          <span className="text-gray-700 break-words">{b.website || "-"}</span>
                        )}
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}
