# Entre Nós — Next.js + TypeScript

Aplicação Next.js com App Router. O conteúdo é definido de forma estática em `data/data.ts`; não usa backend, API ou `localStorage` para guardar os dados.

## Requisitos
- Node.js 20.9 ou superior
- pnpm

## Executar localmente
```bash
pnpm install
pnpm dev
```
Acesse http://localhost:3000

## Build e verificação de tipos
```bash
pnpm build
pnpm typecheck
```

## Estrutura
```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  gate/
  home/
  letters/
  memories/
  playlist/
  shared/
  timeline/
  while-away/
  EntreNosApp.tsx
data/
  data.ts
next.config.ts
tsconfig.json
```

Cada serviço está organizado em sua pasta dentro de `components/`. Para alterar o conteúdo do app, edite `data/data.ts` e publique uma nova versão.
