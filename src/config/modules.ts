import type { Route } from "next";

export type ModuleDefinition = {
  key: string;
  name: string;
  href: Route;
  description: string;
  enabled?: boolean;
};

const moduleRegistry: ModuleDefinition[] = [
  {
    key: "notaVersao",
    name: "Notas de Versao",
    href: "/nota-versao" as Route,
    description: "CRUD de notas de versao integrando com o backend.",
  },
];

export const modules = moduleRegistry;
export const enabledModules = moduleRegistry.filter((item) => item.enabled !== false);
