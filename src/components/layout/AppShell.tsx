import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

import { enabledModules } from "@/config/modules";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            PGE Digital
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium text-slate-700">
            {enabledModules.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={classNames(
                  "rounded-lg px-3 py-2 transition hover:bg-slate-100",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
