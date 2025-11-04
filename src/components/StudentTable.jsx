import { BookOpen, Trash2 } from "lucide-react";

export default function StudentTable({ records = [], onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
        <div className="flex items-center gap-2 text-slate-700">
          <BookOpen className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Daftar Penilaian</h3>
        </div>
        <p className="text-xs text-slate-500">{records.length} entri</p>
      </div>
      <div className="max-h-[360px] overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Mata Pelajaran</th>
              <th className="px-4 py-2">Nilai</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  Belum ada data. Tambahkan penilaian baru.
                </td>
              </tr>
            )}
            {records.map((r) => (
              <tr key={r.id} className="border-t border-slate-100/70">
                <td className="px-4 py-2 font-medium text-slate-800">{r.name}</td>
                <td className="px-4 py-2 text-slate-700">{r.subject}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${
                      r.score >= 85
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                        : r.score >= 70
                        ? "bg-amber-50 text-amber-700 ring-amber-600/20"
                        : "bg-rose-50 text-rose-700 ring-rose-600/20"
                    }`}
                  >
                    {r.score}
                  </span>
                </td>
                <td className="px-4 py-2 text-slate-600">
                  {new Date(r.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => onDelete?.(r.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200/70 px-2 py-1 text-xs text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
