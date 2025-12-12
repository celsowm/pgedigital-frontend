import Link from "next/link";

import { enabledModules } from "@/config/modules";

export default function Home() {
  const hasModules = enabledModules.length > 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-brand-primary">Backoffice</p>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">PGE Digital</h1>
            <p className="text-sm text-slate-600">
              Central de modulos administrativos. Escolha um modulo para acessar o CRUD
              correspondente.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Next.js App Router
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              React Query
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Tailwind CSS
            </span>
          </div>
        </div>
      </header>

      {hasModules ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enabledModules.map((module) => (
            <Link key={module.key} href={module.href} className="group">
              <div className="card h-full space-y-3 p-5 transition group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {module.name}
                  </h2>
                  <span className="text-xs font-medium text-brand-primary">
                    Abrir
                  </span>
                </div>
                <p className="text-sm text-slate-600">{module.description}</p>
                <div className="text-xs font-mono text-slate-500">{module.href}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card p-6 text-sm text-slate-600">
          Nenhum modulo registrado ainda. Adicione novas entradas em
          <span className="mx-1 font-semibold">src/config/modules.ts</span> para
          habilitar rotas no frontend.
        </div>
      )}
    </div>
  );
}
