export const LORE_SPOTLIGHTS = [
  {
    badge: "guia",
    title: "Linhas do tempo organizadas",
    summary:
      "Arcos, filmes e materiais extras separados por ordem de lançamento e ordem cronológica.",
  },
  {
    badge: "curadoria",
    title: "Teorias com contexto",
    summary:
      "Hipóteses de fãs acompanhadas por referências, episódios e capítulos citados.",
  },
  {
    badge: "listas",
    title: "Guias para maratonar",
    summary:
      "Seleções rápidas para rever sagas, pular fillers e encontrar continuações em mangás ou especiais.",
  },
];

export const COLLECTIBLE_DROPS = [
  {
    tag: "figures",
    name: "Action figures e estátuas",
    description:
      "Peças populares, linhas de colecionador e sugestões para começar sem cair em réplica ruim.",
  },
  {
    tag: "DIY",
    name: "Props e cosplay",
    description:
      "Referências visuais, materiais comuns e ideias de acabamento para acessórios de personagens.",
  },
  {
    tag: "print",
    name: "Artbooks e edições especiais",
    description:
      "Volumes, capas alternativas e guias oficiais que valem acompanhar em lançamentos.",
  },
];

export const COMMUNITY_TRACKS = [
  {
    title: "Discussões semanais",
    xp: "sexta à noite",
    description:
      "Conversas sobre episódios recentes, teorias e recomendações sem depender de feed bagunçado.",
    href: "https://discord.gg/animeverse",
    external: true,
    label: "entrar",
  },
  {
    title: "Clube de teorias",
    xp: "spoilers marcados",
    description:
      "Debates separados por obra, arco e nível de spoiler para não estragar a experiência de ninguém.",
    href: "/lore",
    external: false,
    label: "ver teorias",
  },
  {
    title: "Cosplay e coleções",
    xp: "guias práticos",
    description:
      "Espaço para comparar peças, pedir referência e mostrar progresso em props ou figures.",
    href: "/colecionaveis",
    external: false,
    label: "ver guias",
  },
];

export const EVENT_SCHEDULE = [
  {
    title: "Watch Party Shonen Jump",
    datetime: "Sex • 22h BRT",
    location: "Discord",
    focus: "Naruto vs. Pain com pausa para comentários depois do episódio.",
  },
  {
    title: "Debate One Piece",
    datetime: "Sáb • 16h BRT",
    location: "Discord",
    focus: "Teorias de Egghead e conexões com materiais oficiais recentes.",
  },
  {
    title: "Noite Cyberpunk",
    datetime: "Dom • 18h BRT",
    location: "Roll20 + Discord",
    focus: "One-shot inspirado em Edgerunners com playlist e referências visuais.",
  },
];


export const HALL_OF_FAME = [
  {
    codename: "Oracle-762",
    guild: "Lore",
    speciality: "Teorias com referência",
    score: 9870,
  },
  {
    codename: "Synth-Maker",
    guild: "Cosplay",
    speciality: "Props e pintura",
    score: 9420,
  },
  {
    codename: "DataKami",
    guild: "Curadoria",
    speciality: "Listas e guias",
    score: 9265,
  },
];

export const GUILD_ROOMS = [
  {
    name: "Lore",
    focus: "Teorias, cronologias e dúvidas por arco",
    vibe: "Discussão com spoilers bem sinalizados.",
    channel: "#lore",
  },
  {
    name: "Cosplay",
    focus: "Props, moldes, pintura e tecidos",
    vibe: "Troca de referência e progresso real.",
    channel: "#cosplay",
  },
  {
    name: "Watch parties",
    focus: "Agenda, links e comentários pós-episódio",
    vibe: "Sessões organizadas sem poluir o chat principal.",
    channel: "#watch",
  },
];

export const GUILD_MISSIONS = [
  {
    title: "Resumo do episódio",
    description:
      "Publique um resumo curto com referência de episódio e marque spoilers corretamente.",
    reward: "Destaque semanal",
  },
  {
    title: "Referência de cosplay",
    description:
      "Compartilhe imagem, material usado e custo aproximado para ajudar outras pessoas.",
    reward: "Guia fixado",
  },
  {
    title: "Evento rápido",
    description:
      "Organize uma sessão com horário, obra, plataforma e regras de spoiler bem claras.",
    reward: "Agenda da semana",
  },
];
