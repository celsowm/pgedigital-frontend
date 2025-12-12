import {
  NotaVersaoCreateInput,
  NotaVersaoListQuery,
  NotaVersaoListResponse,
  NotaVersaoResponse,
  NotaVersaoUpdateInput,
} from "@/domain/models/notaVersao";

export interface NotaVersaoService {
  list(query?: NotaVersaoListQuery): Promise<NotaVersaoListResponse>;
  get(id: number): Promise<NotaVersaoResponse>;
  create(payload: NotaVersaoCreateInput): Promise<NotaVersaoResponse>;
  update(id: number, payload: NotaVersaoUpdateInput): Promise<NotaVersaoResponse>;
  remove(id: number): Promise<void>;
}
