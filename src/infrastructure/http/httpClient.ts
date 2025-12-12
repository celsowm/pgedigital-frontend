export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type HttpRequestOptions<TBody = unknown> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
};

export class HttpClient {
  constructor(private readonly baseUrl: string) {}

  async request<TResponse, TBody = unknown>(
    path: string,
    options: HttpRequestOptions<TBody> = {},
  ): Promise<TResponse> {
    const url = `${this.baseUrl}${path}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorPayload = await this.safeParseJson(response);
      const reason = errorPayload?.message ?? response.statusText;
      throw new Error(`Erro ao chamar ${path}: ${reason}`);
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return (await response.json()) as TResponse;
  }

  private async safeParseJson(response: Response) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
}
