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

Cada serviço está organizado em sua pasta dentro de `components/`. O mapa usa tiles do OpenStreetMap, traça a rota entre as cidades configuradas e requer conexão à internet. Para adicionar fotos às memórias, salve os arquivos em `public/memories/` e informe o caminho `/memories/nome-da-foto.jpg` no campo `image` da memória correspondente em `data/data.ts`; as mesmas fotos também aparecem no carrossel da página inicial. Para alterar o conteúdo do app, edite esse arquivo e publique uma nova versão.
