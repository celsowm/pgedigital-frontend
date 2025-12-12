export type NotaVersaoResponse = {
  id: number;
  data: string;
  sprint: number;
  ativo: boolean;
  mensagem: string;
  data_exclusao?: string | null;
  data_inativacao?: string | null;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type NotaVersaoListResponse = {
  items: NotaVersaoResponse[];
  pagination: PaginationMeta;
};

export type NotaVersaoListQuery = {
  page?: number;
  pageSize?: number;
};

export type NotaVersaoCreateInput = {
  data: string;
  sprint: number;
  mensagem: string;
  ativo?: boolean;
};

export type NotaVersaoUpdateInput = Partial<NotaVersaoCreateInput> & {
  ativo?: boolean;
};
