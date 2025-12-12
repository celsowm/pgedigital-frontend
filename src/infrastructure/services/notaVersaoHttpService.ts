import {
  NotaVersaoCreateInput,
  NotaVersaoResponse,
  NotaVersaoUpdateInput,
} from "@/domain/models/notaVersao";
import { NotaVersaoService } from "@/domain/services/notaVersaoService";
import { HttpClient } from "@/infrastructure/http/httpClient";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export class NotaVersaoHttpService implements NotaVersaoService {
  constructor(private readonly httpClient: HttpClient) {}

  list(): Promise<NotaVersaoResponse[]> {
    return this.httpClient.request<NotaVersaoResponse[]>("/nota-versao");
  }

  get(id: number): Promise<NotaVersaoResponse> {
    return this.httpClient.request<NotaVersaoResponse>(`/nota-versao/${id}`);
  }

  create(payload: NotaVersaoCreateInput): Promise<NotaVersaoResponse> {
    return this.httpClient.request<NotaVersaoResponse>("/nota-versao", {
      method: "POST",
      body: payload,
    });
  }

  update(id: number, payload: NotaVersaoUpdateInput): Promise<NotaVersaoResponse> {
    return this.httpClient.request<NotaVersaoResponse>(`/nota-versao/${id}`, {
      method: "PUT",
      body: payload,
    });
  }

  async remove(id: number): Promise<void> {
    await this.httpClient.request<void>(`/nota-versao/${id}`, {
      method: "DELETE",
    });
  }
}

export const notaVersaoService = new NotaVersaoHttpService(
  new HttpClient(API_BASE_URL),
);
