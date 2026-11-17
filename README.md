# Entre Nós — Next.js

Aplicação migrada para **Next.js com App Router**, mantendo as telas e os recursos da versão React.

## Requisitos
- Node.js 20.9 ou superior
- npm

## Executar localmente
```bash
npm install
npm run dev
```
Acesse http://localhost:3000

## Build de produção
```bash
npm run build
npm start
```

## Painel administrativo
Acesse `http://localhost:3000/?admin=1` para exibir a aba Admin.

## Estrutura
```text
app/
  globals.css
  layout.jsx
  page.jsx
components/
  admin/
  gate/
  home/
  letters/
  memories/
  playlist/
  shared/
  timeline/
  while-away/
  EntreNosApp.jsx
data/
  data.js
```

## Persistência e autenticação
As configurações administrativas são salvas no `localStorage` do navegador atual. O parâmetro `?admin=1` apenas exibe a interface administrativa; ele **não é um mecanismo de autenticação**. Para uso real entre dispositivos, conecte um backend (por exemplo, Supabase) e implemente autenticação e autorização no servidor.

## Notas
- A aplicação usa o App Router do Next.js.
- `EntreNosApp.jsx` coordena o estado global, a navegação e os serviços; cada funcionalidade fica em sua pasta dentro de `components/`.
- Os serviços que usam estado local, efeitos ou interação com o navegador são Client Components.
- O conteúdo original foi mantido como base.
- O mapa é uma representação visual simplificada e a distância é calculada a partir das coordenadas em `data/data.js`.
- Os espaços de memórias são placeholders; imagens reais podem ser adicionadas posteriormente.
