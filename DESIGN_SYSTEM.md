# AnimeVerse Design System

## Direção

O AnimeVerse usa uma linguagem **japonesa editorial contemporânea**: páginas de revista e mangá, papel quente, tinta escura e rosa cerejeira. A interface deve remeter ao Japão sem depender de clichês visuais.

Princípios:

1. Conteúdo e imagens são protagonistas.
2. Rosa cerejeira é assinatura, não preenchimento dominante.
3. Assimetria editorial com estrutura previsível.
4. Alto contraste e leitura confortável.
5. Ornamentos japoneses são discretos e funcionais.

## Cores

| Token | Valor | Uso |
| --- | --- | --- |
| `background` | `#fffaf8` | Papel principal |
| `foreground` | `#241b1e` | Tinta e títulos |
| `card` | `#ffffff` | Superfícies elevadas |
| `muted` | `#f7efed` | Áreas secundárias |
| `muted-foreground` | `#74676b` | Texto secundário |
| `primary` | `#d85f7c` | Cerejeira, CTA e seleção |
| `primary-foreground` | `#ffffff` | Texto sobre cerejeira |
| `accent` | `#f8d9e1` | Realces suaves |
| `border` | `#e8d9dc` | Linhas editoriais |
| `destructive` | `#b93846` | Erros e ações destrutivas |
| `ink` | `#171214` | Blocos de alto contraste |

Não usar rosa em grandes áreas. Para fundos, usar papel, branco ou tinta.

## Tipografia

- Títulos editoriais: `Noto Serif JP`, `Yu Mincho`, Georgia, serif.
- Interface e corpo: Inter, `Noto Sans`, `Segoe UI`, sans-serif.
- Título principal: 40–72 px, peso 700, entrelinha 0.95–1.1.
- Título de seção: 24–36 px, peso 700.
- Corpo: mínimo 16 px em mobile, entrelinha 1.6.
- Metadados: 11–13 px, caixa alta, tracking moderado.

Caracteres japoneses podem aparecer como rótulos decorativos curtos. Nunca substituir informação em português.

## Espaçamento e layout

- Escala: 4, 8, 12, 16, 24, 32, 48, 64 e 96 px.
- Container: máximo de 1280 px.
- Gutter: 16 px mobile, 24 px tablet, 32 px desktop.
- Cards: raio de 16 px; destaques podem usar 24 px.
- Linhas de 1 px são usadas como divisórias de página de mangá.
- A assimetria deve mudar peso visual, nunca prejudicar a ordem de leitura.

## Componentes

Os componentes seguem o padrão shadcn/ui e ficam em `src/components/ui`.

- `Button`: ações primária, secundária, outline, ghost e link.
- `Card`: conteúdo agrupado, com cabeçalho e rodapé opcionais.
- `Badge`: gênero, status e metadados curtos.
- `Input`: busca e filtros com label visível ou acessível.
- `Separator`: divisória editorial horizontal ou vertical.

Ícones usam exclusivamente `lucide-react`, normalmente com 18 ou 20 px e `strokeWidth={1.75}`.

## Imagens

- Posters: proporção 2:3.
- Banners: proporção entre 16:9 e 21:9.
- Declarar dimensões ou `aspect-ratio` para evitar CLS.
- Aplicar `object-cover`; nunca distorcer.
- Textura de retícula pode aparecer com opacidade máxima de 6%.

## Interação

- Área clicável mínima: 44 × 44 px.
- Transições: 150–250 ms, apenas `opacity`, `color` e `transform`.
- Estado de foco: anel cerejeira de 2 px com offset.
- Hover não pode ser a única forma de revelar uma ação.
- Respeitar `prefers-reduced-motion`.

## Acessibilidade

- Contraste WCAG AA: 4.5:1 para texto comum e 3:1 para texto grande.
- Imagens informativas precisam de `alt` descritivo.
- Botões apenas com ícone precisam de `aria-label`.
- Ordem de heading deve ser semântica.
- Cor nunca deve ser o único indicador de estado.

## Composição das telas

- **Home:** capa editorial, manifesto curto e rotas principais.
- **Catálogo:** destaque assimétrico seguido por estante de capas.
- **Anime:** abertura em página dupla, ficha técnica e capítulos de conteúdo.
- **Lore:** dossiê, índice lateral e linha do tempo.
- **Comunidade:** mural, guildas e ranking com hierarquia de jornal.
- **Eventos:** agenda em cartões semelhantes a cartazes.
- **Colecionáveis:** vitrine editorial em grid.

## Evitar

- Neon, glow intenso e gradientes multicoloridos.
- Misturar várias cores de destaque por tela.
- Flores de cerejeira em todos os blocos.
- Emojis como ícones de interface.
- Tracking excessivo em textos longos.
- Transparência que prejudique contraste.
