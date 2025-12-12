"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import {
  NotaVersaoCreateInput,
  NotaVersaoResponse,
} from "@/domain/models/notaVersao";
import { NotaVersaoForm } from "@/features/notaVersao/components/NotaVersaoForm";
import { NotaVersaoList } from "@/features/notaVersao/components/NotaVersaoList";
import { useNotaVersaoList, useNotaVersaoMutations } from "@/hooks/useNotaVersao";

export default function NotaVersaoPage() {
  const [selected, setSelected] = useState<NotaVersaoResponse | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const {
    data: notasResponse,
    isLoading,
    isError,
    error,
  } = useNotaVersaoList({ page, pageSize });
  const notas = notasResponse?.items ?? [];
  const pagination = notasResponse?.pagination;
  const { create, update, remove } = useNotaVersaoMutations();
  const pageOptions = [5, 10, 20, 50];

  const handleSubmit = async (payload: NotaVersaoCreateInput) => {
    if (selected) {
      await update.mutateAsync({ id: selected.id, data: payload });
      setSelected(null);
    } else {
      await create.mutateAsync(payload);
    }
  };

  const handleDelete = async (nota: NotaVersaoResponse) => {
    const wantDelete = window.confirm(
      `Tem certeza que deseja excluir a nota ${nota.id}?`,
    );
    if (!wantDelete) return;
    await remove.mutateAsync(nota.id);
    if (selected?.id === nota.id) setSelected(null);
  };

  const handlePreviousPage = () => {
    if (!pagination?.hasPreviousPage) return;
    setPage((current) => Math.max(1, current - 1));
  };

  const handleNextPage = () => {
    if (!pagination?.hasNextPage) return;
    setPage((current) => current + 1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-brand-primary">Backoffice</p>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Notas de Versao</h1>
            <p className="text-sm text-slate-600">
              CRUD completo consumindo o backend da aplicacao.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              POST /nota-versao
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              GET /nota-versao/:id
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              PUT /nota-versao/:id
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              DELETE /nota-versao/:id
            </span>
          </div>
        </div>
      </header>

      {isError && <Alert type="error">{error?.message}</Alert>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="card animate-pulse p-6">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="mt-4 space-y-3">
                <div className="h-3 rounded bg-slate-200" />
                <div className="h-3 rounded bg-slate-200" />
                <div className="h-3 rounded bg-slate-200" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col gap-3 rounded border border-slate-100 bg-white px-4 py-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="btn-ghost text-xs"
                    onClick={handlePreviousPage}
                    disabled={!pagination?.hasPreviousPage}
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    className="btn-ghost text-xs"
                    onClick={handleNextPage}
                    disabled={!pagination?.hasNextPage}
                  >
                    Proxima
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-slate-600">
                  <span className="font-semibold text-slate-900">
                    Pagina {pagination?.page ?? page}
                  </span>
                  <span>de {pagination?.totalPages ?? "-"}</span>
                  <span className="text-slate-400">
                    ({pagination?.totalItems ?? notas.length} itens)
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label htmlFor="page-size" className="text-slate-500">
                    Itens por pagina
                  </label>
                  <select
                    id="page-size"
                    className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 outline-none focus:border-brand-primary"
                    value={pageSize}
                    onChange={(event) =>
                      handlePageSizeChange(Number(event.target.value))
                    }
                  >
                    {pageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <NotaVersaoList
                data={notas}
                pagination={pagination}
                onEdit={(nota) => setSelected(nota)}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <NotaVersaoForm
            key={selected?.id ?? "new"}
            initialValue={selected}
            onSubmit={handleSubmit}
            onCancel={() => setSelected(null)}
            isSubmitting={create.isPending || update.isPending}
          />

          {(create.isSuccess || update.isSuccess || remove.isSuccess) && (
            <Alert type="success" title="Tudo certo!">
              Operacao concluida com sucesso.
            </Alert>
          )}

          {(create.isError || update.isError || remove.isError) && (
            <Alert type="error" title="Falha ao salvar">
              {create.error?.message ||
                update.error?.message ||
                remove.error?.message ||
                "Nao foi possivel processar a requisicao."}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
