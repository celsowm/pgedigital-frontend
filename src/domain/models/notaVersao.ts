export type NotaVersaoResponse = {
  id: number;
  data: string;
  sprint: number;
  ativo: boolean;
  mensagem: string;
  data_exclusao?: string | null;
  data_inativacao?: string | null;
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
