import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  NotaVersaoCreateInput,
  NotaVersaoResponse,
  NotaVersaoUpdateInput,
} from "@/domain/models/notaVersao";
import { notaVersaoService } from "@/infrastructure/services/notaVersaoHttpService";

const queryKeys = {
  all: ["nota-versao"] as const,
  detail: (id: number) => ["nota-versao", id] as const,
};

export function useNotaVersaoList() {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: () => notaVersaoService.list(),
  });
}

export function useNotaVersaoDetail(id?: number) {
  return useQuery({
    queryKey: queryKeys.detail(id ?? 0),
    queryFn: () => notaVersaoService.get(id as number),
    enabled: Boolean(id),
  });
}

type Mutations = {
  create: UseMutationResult<NotaVersaoResponse, Error, NotaVersaoCreateInput>;
  update: UseMutationResult<
    NotaVersaoResponse,
    Error,
    { id: number; data: NotaVersaoUpdateInput }
  >;
  remove: UseMutationResult<void, Error, number>;
};

export function useNotaVersaoMutations(): Mutations {
  const queryClient = useQueryClient();

  const invalidateList = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.all });

  const create = useMutation({
    mutationFn: (payload: NotaVersaoCreateInput) =>
      notaVersaoService.create(payload),
    onSuccess: invalidateList,
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: NotaVersaoUpdateInput }) =>
      notaVersaoService.update(id, data),
    onSuccess: invalidateList,
  });

  const remove = useMutation({
    mutationFn: (id: number) => notaVersaoService.remove(id),
    onSuccess: invalidateList,
  });

  return { create, update, remove };
}
