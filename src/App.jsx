import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import GradeSummary from "./components/GradeSummary";
import StudentTable from "./components/StudentTable";
import AddGradeForm from "./components/AddGradeForm";

export default function App() {
  const [records, setRecords] = useState(() => [
    { id: crypto.randomUUID(), name: "Ayu Lestari", subject: "Matematika", score: 92, date: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "Budi Santoso", subject: "Bahasa Indonesia", score: 81, date: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: crypto.randomUUID(), name: "Citra Anjani", subject: "IPA", score: 74, date: new Date(Date.now() - 86400000 * 5).toISOString() },
    { id: crypto.randomUUID(), name: "Dedi Pratama", subject: "IPS", score: 65, date: new Date(Date.now() - 86400000 * 7).toISOString() },
    { id: crypto.randomUUID(), name: "Eka Putri", subject: "Bahasa Inggris", score: 88, date: new Date(Date.now() - 86400000 * 9).toISOString() },
  ]);

  const addRecord = ({ name, subject, score }) => {
    setRecords((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, subject, score, date: new Date().toISOString() },
    ]);
  };

  const deleteRecord = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const sorted = useMemo(
    () => [...records].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [records]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Dashboard Penilaian
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Kelola nilai siswa, lihat ringkasan performa, dan tambahkan penilaian baru.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <GradeSummary records={sorted} />
            <StudentTable records={sorted} onDelete={deleteRecord} />
          </div>
          <div className="lg:col-span-1">
            <AddGradeForm onAdd={addRecord} />
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200/60 bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
          © {new Date().getFullYear()} E-School Grading • Dibuat untuk demo UI
        </div>
      </footer>
    </div>
  );
}
