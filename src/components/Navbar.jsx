import { School, Home, Settings, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <School className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight tracking-tight text-slate-900">
              E-School Grading
            </h1>
            <p className="text-xs text-slate-500">Penilaian sekolah modern</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <button className="flex items-center gap-2 transition-colors hover:text-slate-900">
            <Home className="h-4 w-4" /> Beranda
          </button>
          <button className="flex items-center gap-2 transition-colors hover:text-slate-900">
            <User className="h-4 w-4" /> Siswa
          </button>
          <button className="flex items-center gap-2 transition-colors hover:text-slate-900">
            <Settings className="h-4 w-4" /> Pengaturan
          </button>
        </nav>
      </div>
    </header>
  );
}
