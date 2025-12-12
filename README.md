# pgedigital-frontend
Frontend Next.js (App Router) + Tailwind + React Query para consumir o backend de notas de versao.

## Scripts principais
- `npm run dev` inicia o servidor de desenvolvimento.
- `npm run build` gera o build de producao.
- `npm start` sobe o build produzido.
- `npm run lint` roda as checagens de lint.

## Configuracao de API
Defina `NEXT_PUBLIC_API_BASE_URL` se o backend nao estiver em `http://localhost:3000/api`.

## Estrutura
- `src/app` rotas do Next (App Router), layout e providers.
- `src/features/notaVersao` componentes do caso de uso.
- `src/domain` contratos e modelos de dados.
- `src/infrastructure` clientes HTTP e servicos concretos.
- `src/hooks` camadas de orquestracao com React Query.

Rota principal: `/nota-versao` (CRUD completo).
