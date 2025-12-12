import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  NotaVersaoCreateInput,
  NotaVersaoListQuery,
  NotaVersaoListResponse,
  NotaVersaoResponse,
  NotaVersaoUpdateInput,
} from "@/domain/models/notaVersao";
import { notaVersaoService } from "@/infrastructure/services/notaVersaoHttpService";

const queryKeys = {
  all: (page: number, pageSize: number) =>
    ["nota-versao", "list", page, pageSize] as const,
  detail: (id: number) => ["nota-versao", id] as const,
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

export function useNotaVersaoList(options?: NotaVersaoListQuery) {
  const page = options?.page ?? DEFAULT_PAGE;
  const pageSize = options?.pageSize ?? DEFAULT_PAGE_SIZE;

  return useQuery<NotaVersaoListResponse, Error, NotaVersaoListResponse>({
    queryKey: queryKeys.all(page, pageSize),
    queryFn: () => notaVersaoService.list({ page, pageSize }),
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
    queryClient.invalidateQueries({ queryKey: ["nota-versao"] });

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
