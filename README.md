# Entre Nós — Next.js + TypeScript

Aplicação Next.js com App Router. O conteúdo principal é definido de forma estática em `data/data.ts`. Os corações de presença são compartilhados entre dispositivos por meio do Supabase.

## Presença com coração
Crie um projeto no Supabase e execute `supabase/schema.sql` no SQL Editor. Copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` com os dados do projeto. O nome antigo `NEXT_PUBLIC_SUPABASE_ANON_KEY` também é aceito. Reinicie o servidor após configurar as variáveis.

O recurso não exige login: quem deixa um coração escolhe “Erick” ou “Rafaela”. Como essa identidade não é verificada, qualquer visitante com acesso ao site pode escolher qualquer opção. A tabela armazena somente essa escolha e o horário. Em produção, configure as variáveis no provedor de hospedagem antes de gerar o build/redeploy.

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
  shared/
  timeline/
  while-away/
  EntreNosApp.tsx
lib/
  supabase.ts
supabase/
  schema.sql
data/
  data.ts
next.config.ts
tsconfig.json
```

Cada serviço está organizado em sua pasta dentro de `components/`. O mapa usa tiles do OpenStreetMap, traça a rota entre as cidades configuradas e requer conexão à internet. Para adicionar fotos às memórias, salve os arquivos em `public/memories/` e informe o caminho `/memories/nome-da-foto.jpg` no campo `image` da memória correspondente em `data/data.ts`; as mesmas fotos também aparecem no carrossel da página inicial. Para alterar o conteúdo do app, edite esse arquivo e publique uma nova versão.
