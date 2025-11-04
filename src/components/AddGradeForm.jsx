import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddGradeForm({ onAdd }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const numeric = Number(score);
    if (!name.trim() || !subject.trim() || Number.isNaN(numeric)) {
      setError("Lengkapi semua bidang dengan benar.");
      return;
    }
    if (numeric < 0 || numeric > 100) {
      setError("Nilai harus antara 0-100.");
      return;
    }
    onAdd?.({ name: name.trim(), subject: subject.trim(), score: numeric });
    setName("");
    setSubject("");
    setScore("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2 text-slate-700">
        <PlusCircle className="h-4 w-4" />
        <h3 className="text-sm font-semibold">Tambah Penilaian</h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Nama Siswa
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Mis. Budi Santoso"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Mata Pelajaran
          </label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Mis. Matematika"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Nilai
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="0-100"
          />
        </div>
      </div>
      {error && (
        <p className="mt-3 text-sm text-rose-600">
          {error}
        </p>
      )}
      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          <PlusCircle className="h-4 w-4" /> Tambah
        </button>
      </div>
    </form>
  );
}
