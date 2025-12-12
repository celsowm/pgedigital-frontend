import "./globals.css";

import type { Metadata } from "next";

import { ReactNode } from "react";

import { Providers } from "./providers";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "PGE Digital | Backoffice",
  description:
    "Frontend Next.js + Tailwind para gerenciar modulos administrativos da PGE-RJ.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
