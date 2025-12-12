# pgedigital-frontend
Frontend Next.js (App Router) + Tailwind + React Query para consumir o backend do PGE Digital.

## Scripts principais
- `npm run dev` inicia o servidor de desenvolvimento na porta `3001`.
- `npm run build` gera o build de producao.
- `npm start` sobe o build produzido na porta `3001`.
- `npm run lint` roda as checagens de lint.

## Configuracao de API
Defina `NEXT_PUBLIC_API_BASE_URL` se o backend nao estiver em `http://localhost:3000/api`. (Frontend roda em `3001` para nao conflitar com o backend na `3000`.)

## Estrutura
- `src/app` rotas do Next (App Router), layout e providers.
- `src/config/modules.ts` registro de modulos/entidades exibidos no menu e na home.
- `src/features/*` componentes especificos por caso de uso (ex.: `notaVersao`).
- `src/domain` contratos e modelos de dados.
- `src/infrastructure` clientes HTTP e servicos concretos.
- `src/hooks` camadas de orquestracao com React Query.

## Como adicionar um novo modulo/entidade
1) Cadastre a entrada no menu e na home em `src/config/modules.ts` com `key`, `name`, `href` e `description`.
2) Crie os modelos em `src/domain/models/<entidade>.ts` e o contrato de servico em `src/domain/services/<entidade>Service.ts`.
3) Implemente o HTTP service em `src/infrastructure/services/<entidade>HttpService.ts`.
4) Crie os hooks de React Query em `src/hooks/use<Entidade>.ts`.
5) Construa a feature UI em `src/features/<entidade>/...` e crie a rota em `src/app/<href>/page.tsx`.

Hoje existe um modulo exemplo: `/nota-versao` (CRUD completo).
