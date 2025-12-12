"use client";

import classNames from "classnames";

import { NotaVersaoResponse } from "@/domain/models/notaVersao";

type NotaVersaoListProps = {
  data: NotaVersaoResponse[];
  onEdit: (nota: NotaVersaoResponse) => void;
  onDelete: (nota: NotaVersaoResponse) => void;
};

export function NotaVersaoList({ data, onEdit, onDelete }: NotaVersaoListProps) {
  if (!data.length) {
    return (
      <div className="card p-6 text-sm text-slate-600">
        Nenhuma nota encontrada. Crie a primeira usando o formulario ao lado.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Sprint</th>
              <th className="px-4 py-3">Ativo</th>
              <th className="px-4 py-3">Mensagem</th>
              <th className="px-4 py-3 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((nota) => (
              <tr key={nota.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-mono text-xs text-slate-600">
                  {nota.id}
                </td>
                <td className="px-4 py-3">{nota.data}</td>
                <td className="px-4 py-3">{nota.sprint}</td>
                <td className="px-4 py-3">
                  <span
                    className={classNames(
                      "rounded-full px-2 py-1 text-xs font-semibold",
                      nota.ativo
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-700",
                    )}
                  >
                    {nota.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  <span className="block max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
                    {nota.mensagem}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="btn-ghost text-xs"
                      onClick={() => onEdit(nota)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-ghost text-xs text-red-600 hover:text-red-700"
                      onClick={() => onDelete(nota)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
