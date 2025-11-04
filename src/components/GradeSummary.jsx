import { BarChart3, Award, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, title, value, subtitle, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 ring-blue-600/10",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    purple: "bg-violet-50 text-violet-700 ring-violet-600/10",
  };
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${colors[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function GradeSummary({ records = [] }) {
  if (!Array.isArray(records)) records = [];

  const total = records.length;
  const avg = total
    ? (records.reduce((acc, r) => acc + Number(r.score || 0), 0) / total).toFixed(1)
    : 0;
  const top = records
    .filter((r) => typeof r.score === "number")
    .sort((a, b) => b.score - a.score)[0];
  const best = top ? `${top.name} • ${top.subject}` : "-";

  // Trend: compare last 5 vs previous 5
  const last5 = records.slice(-5);
  const prev5 = records.slice(-10, -5);
  const lastAvg = last5.length
    ? last5.reduce((a, r) => a + r.score, 0) / last5.length
    : 0;
  const prevAvg = prev5.length
    ? prev5.reduce((a, r) => a + r.score, 0) / prev5.length
    : 0;
  const trend = lastAvg - prevAvg;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        icon={BarChart3}
        title="Rata-rata Nilai"
        value={avg}
        subtitle={`${total} penilaian`}
        color="blue"
      />
      <StatCard
        icon={Award}
        title="Nilai Terbaik"
        value={top ? top.score : "-"}
        subtitle={best}
        color="green"
      />
      <StatCard
        icon={TrendingUp}
        title="Performa Terbaru"
        value={`${trend >= 0 ? "+" : ""}${trend.toFixed(1)}`}
        subtitle="Rata-rata 5 terakhir vs sebelumnya"
        color="purple"
      />
    </section>
  );
}
