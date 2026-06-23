# AnimeVerse

Uma comunidade web para fãs de anime: descubra títulos, consulte detalhes, explore personagens, acompanhe lore, colecionáveis e eventos.

## Tecnologias

- Next.js 15 com App Router
- React 18 e TypeScript strict
- Tailwind CSS
- pnpm
- Jikan, AniList, MangaDex e MyAnimeList como fontes de conteúdo

## Arquitetura

O catálogo utiliza uma arquitetura hexagonal pragmática. O restante da aplicação permanece organizado como um monólito modular do Next.js e pode migrar por domínio, sem reescrever a interface.

```text
React / Next.js (src/app)
          |
          v
Application use cases (src/application)
          |
          v
Ports / contracts (src/application/ports)
          |
          v
Infrastructure adapters (src/infrastructure)
          |
          v
APIs externas: Jikan, AniList, MangaDex e MyAnimeList
```

### Estrutura

```text
src/
  app/                         # Rotas, telas e Route Handlers do Next.js
  domain/anime/                # Entidades e tipos puros do domínio de anime
  application/
    anime/                     # Casos de uso do catálogo
    ports/                     # Contratos de entrada/saída
  infrastructure/anime/        # Adaptadores para APIs e scraping
  lib/                         # Composição de dependências e utilitários
  types/                       # Reexports e declarações de bibliotecas
```

### Fluxo do catálogo

1. A página chama a fachada em `src/lib/anime-service.ts`.
2. A fachada instancia `AnimeCatalogUseCases`.
3. O caso de uso usa a porta `AnimeCatalogPort`.
4. O adaptador em `src/infrastructure/anime` consulta as fontes externas e normaliza a resposta.
5. A UI recebe entidades tipadas, sem conhecer detalhes de HTTP ou scraping.

Essa separação permite trocar uma API, adicionar cache ou criar um mock para testes sem alterar os componentes React.

## Funcionalidades atuais

- Catálogo de animes com categorias e busca local
- Página de detalhes com poster, sinopse, personagens, onde assistir, mangás e trilhas
- Páginas de lore, comunidade, eventos e colecionáveis
- Navegação responsiva para desktop e mobile
- Estados de fallback para falhas das APIs externas
- Logo e favicon próprios

Alguns recursos sociais aparecem como **Em breve** até existir backend próprio.

## Como executar

### Pré-requisitos

- Node.js 20+
- pnpm 10+

### Instalação

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Qualidade e validação

```bash
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Testes

Os testes unitários usam Jest e `ts-jest`.

```bash
pnpm test
```

Os testes atuais exercitam `AnimeCatalogUseCases` com uma implementação mockada de `AnimeCatalogPort`. Isso valida os casos de uso sem chamadas de rede e sem depender das APIs externas.

## Fontes externas

| Fonte       | Uso                                                 |
| ----------- | --------------------------------------------------- |
| Jikan       | Detalhes, personagens e links oficiais de streaming |
| AniList     | Categorias e tendências do catálogo                 |
| MangaDex    | Sugestões de mangás relacionados                    |
| MyAnimeList | Busca de músicas temáticas                          |

As integrações possuem timeout e o catálogo mantém dados de fallback quando uma fonte não responde.

## Próximos passos

### Comunidade real

- Autenticação e perfis de usuário
- Posts, comentários, reações e marcação de spoilers
- Salas de discussão por anime
- Agenda de eventos com confirmação de presença
- Moderação, denúncias e permissões

### Plataforma e dados

- Banco de dados para usuários, posts e eventos
- Cache compartilhado para respostas das APIs externas
- Jobs agendados para sincronizar catálogo e eventos
- Observabilidade: logs estruturados, métricas e rastreamento de erros
- Mais testes unitários para regras de comunidade e eventos
- Testes de integração para os adaptadores externos
- Testes de interface para jornadas críticas

### Produto

- Listas pessoais: assistindo, concluído e quero assistir
- Avaliações e recomendações da comunidade
- Notificações de novos episódios e eventos
- Acessibilidade avançada e PWA/offline
