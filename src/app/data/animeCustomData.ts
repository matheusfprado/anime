export type AnimeLoreNode = {
  era: string;
  highlight: string;
};

export type AnimeCrossMedia = {
  title: string;
  type?: string;
  url?: string;
};

export type AnimeCollectible = {
  name: string;
  description: string;
  link?: string;
};

export type AnimeTechHighlight = {
  name: string;
  description: string;
};

export type AnimeCommunityHook = {
  title: string;
  description: string;
  link?: string;
};

export type AnimeCustomization = {
  title: string;
  characterImage?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  synopsis?: string;
  loreTimeline?: AnimeLoreNode[];
  crossMedia?: AnimeCrossMedia[];
  collectibles?: AnimeCollectible[];
  techHighlights?: AnimeTechHighlight[];
  trivia?: string[];
  communityHooks?: AnimeCommunityHook[];
};

export const ANIME_CUSTOM_DATA: AnimeCustomization[] = [
  {
    title: "Naruto",
    characterImage:
      "https://static.wikia.nocookie.net/naruto/images/d/df/Naruto_-_12_anos_%28Render%29.png/revision/latest/scale-to-width-down/300?cb=20190601002659&path-prefix=pt-br",
    backgroundImage: "https://images5.alphacoders.com/137/1370955.png",
    backgroundVideo:
      "https://media.tenor.com/UVAPZtKp9BIAAAAd/naruto-sunset.mp4",
    synopsis:
      "Naruto Uzumaki é um jovem ninja da Vila da Folha que carrega dentro de si o espírito da Raposa de Nove Caudas, uma poderosa criatura que devastou a vila anos antes de seu nascimento. Isolado e desprezado pelos habitantes, ele cresce com o sonho de se tornar Hokage, o líder máximo de sua aldeia, para que todos o reconheçam. Ao longo de sua jornada, Naruto enfrenta inimigos perigosos, treina arduamente e forma laços profundos com seus companheiros — especialmente Sasuke Uchiha e Sakura Haruno — enquanto descobre o verdadeiro significado da amizade, da dor e da perseverança.",
    loreTimeline: [
      {
        era: "Era Clássica",
        highlight:
          "Arcos das provas Chūnin e da invasão de Konoha definem o ritmo estratégico da série e apresentam a Akatsuki ao fandom.",
      },
      {
        era: "Saga Shippuden",
        highlight:
          "Investigue a Quarta Guerra Ninja, o despertar de Kurama e a ascensão do clã Ōtsutsuki com leituras complementares e teorias da comunidade.",
      },
      {
        era: "Legado",
        highlight:
          "Encaixe Boruto no cânone, compare linhas do tempo alternativas e use o dossiê de jutsus para criar builds nas suas mesas de RPG.",
      },
    ],
    crossMedia: [
      {
        title: "Ultimate Ninja Storm Connections",
        type: "Game",
        url: "https://store.steampowered.com/app/2450250/",
      },
      {
        title: "Light Novel: Itachi Shinden",
        type: "Light Novel",
        url: "https://naruto.fandom.com/wiki/Itachi_Shinden:Book_of_Bright_Light",
      },
      {
        title: "Anime Databook 4",
        type: "Databook",
        url: "https://www.rightstufanime.com/naruto-official-databook-4",
      },
    ],
    collectibles: [
      {
        name: "Bandana da Vila da Folha",
        description: "Replica em metal com acabamento weathering para cosplays pró.",
        link: "https://www.crunchyroll.com/pt-br/store/p/leaf-village-headband",
      },
      {
        name: "Kunai de Treinamento de Minato",
        description: "Minikit impresso em 3D com runas para decoração do setup.",
      },
      {
        name: "Figura AR do Naruto (Hokage)",
        description: "Arquivo .glb para visualização imersiva em realidade aumentada.",
      },
    ],
    techHighlights: [
      {
        name: "Datacard Ninja",
        description:
          "Planilha pronta do AnimeVerse com builds recomendadas para campanhas de mesa baseadas em chakra.",
      },
      {
        name: "Modpack Shinobi VR",
        description:
          "Pacote com 18 cenários otimizados para VRChat e Neos VR inspirados nos campos de treino de Konoha.",
      },
    ],
    trivia: [
      "O episódio piloto de Naruto foi exibido inicialmente no Jump Festa 2002 com trilha alternativa.",
      "Masashi Kishimoto armazenava rascunhos de novos jutsus em copos de ramen — a equipe digitalizou 40 desses sketches e liberou em 2023.",
    ],
    communityHooks: [
      {
        title: "Guilda Hokage Lab",
        description: "Workshops mensais de criação de personagens para campanhas homebrew usando o sistema Verso D20.",
        link: "https://discord.gg/animeverse",
      },
      {
        title: "Watch Party: Reunião da Akatsuki",
        description: "Sessão comentada dos episódios 451-455 focada em Itachi Shinden com tradução simultânea e bingo de teorias.",
      },
    ],
  },
  {
    title: "One Piece",
    characterImage: "/characters/luffy.png",
    backgroundImage:
      "https://i.pinimg.com/originals/64/6d/cc/646dcc8acb12607c621b89d8256e8f9e.gif",
    backgroundVideo:
      "https://media.tenor.com/pkx1nH0MuGIAAAAd/one-piece-luffy.mp4",
    synopsis:
      "Monkey D. Luffy é um jovem sonhador que, inspirado pelo lendário pirata Shanks, decide se aventurar pelos mares em busca do tesouro supremo conhecido como One Piece. Após comer uma Fruta do Diabo, Luffy ganha o poder de esticar o corpo como borracha, mas perde a capacidade de nadar. Determinado a se tornar o Rei dos Piratas, ele reúne uma tripulação única — os Chapéus de Palha — composta por guerreiros, navegadores, médicos e sonhadores de diferentes origens. Juntos, eles enfrentam o Governo Mundial, piratas poderosos e forças místicas, explorando um vasto mundo repleto de segredos e ideais de liberdade.",
    loreTimeline: [
      {
        era: "Saga East Blue",
        highlight:
          "Reveja os episódios 1-61 e compare com o mangá para ver todas as revisões feitas na adaptação live-action.",
      },
      {
        era: "A Nova Era",
        highlight:
          "Time-skip em Sabaody reorganiza toda a build da tripulação; use o nosso planner para distribuir pontos de atributo da Grand Line.",
      },
      {
        era: "Egghead e além",
        highlight:
          "Colete pistas do Vegapunk Labs, teorizando sobre o fim da história, e compartilhe na sala de teoria Quantum Logbook.",
      },
    ],
    crossMedia: [
      {
        title: "One Piece Odyssey",
        type: "JRPG",
        url: "https://store.steampowered.com/app/814000/ONE_PIECE_ODYSSEY/",
      },
      {
        title: "Netflix Live Action",
        type: "Série",
        url: "https://www.netflix.com/title/80217863",
      },
      {
        title: "One Piece Magazine Vol. 15",
        type: "Revista",
        url: "https://www.viz.com/blog/posts/one-piece-magazine",
      },
    ],
    collectibles: [
      {
        name: "Mapa do Novo Mundo em tecido",
        description: "Impressão em canvas com marcações dos Road Poneglyphs atualizadas pela comunidade.",
      },
      {
        name: "Kit Fruta do Diabo (LED)",
        description: "Esculturas iluminadas com filamento TPU que brilham no setup.",
      },
      {
        name: "Wanted Posters customizados",
        description: "Template PSD para criar cartazes da sua guilda com tipografia canon.",
      },
    ],
    techHighlights: [
      {
        name: "Banco de dados das Akuma no Mi",
        description: "CSV com parâmetros de poder e fraquezas, pronto para ingestão em dashboards.",
      },
      {
        name: "Bot Sunny Route",
        description: "Automação no Discord que agenda viagens roleplay e envia cartas náuticas diárias.",
      },
    ],
    trivia: [
      "O número de capítulos planejado por Oda para o arco final foi reajustado três vezes em 2023.",
      "A música 'Binks' Sake' usa progressão harmônica baseada em cantigas marítimas irlandesas do século XVII.",
    ],
    communityHooks: [
      {
        title: "Regata do Thousand Sunny",
        description: "Campanha trimestral com desafios cooperativos em Sea of Thieves inspirados em Egghead.",
      },
      {
        title: "Clube das Teorias Yonko",
        description: "Mesa redonda semanal com analytics dos últimos capítulos e previsões ranqueadas.",
      },
    ],
  },
  {
    title: "Attack on Titan",
    characterImage: "/characters/attackontitan.png",
    backgroundImage:
      "https://i.pinimg.com/originals/1f/9a/2a/1f9a2a2ab421b5b8a3e519d8ef9b26c2.gif",
    backgroundVideo:
      "https://media.tenor.com/lnYDAnCmv0IAAAAd/attack-on-titan-rumbling.mp4",
    synopsis:
      "Séculos após a humanidade quase ser extinta pelos Titãs — criaturas gigantes que devoram humanos — os sobreviventes vivem confinados dentro de enormes muralhas. Eren Yeager, um jovem impetuoso, vê sua vida mudar para sempre quando um Titã colossal destrói parte da muralha, permitindo a invasão de sua cidade. Movido pelo ódio e desejo de vingança, Eren se alista na Tropa de Exploração junto com seus amigos Mikasa e Armin. No entanto, ele logo descobre verdades chocantes sobre a origem dos Titãs, a história da humanidade e o papel que ele mesmo desempenha nesse conflito devastador.",
    loreTimeline: [
      {
        era: "Queda de Shiganshina",
        highlight:
          "Analise o ataque inicial cruzando animação, storyboard do mangá e materiais do artbook INSIDE & OUTSIDE.",
      },
      {
        era: "Guerra de Marley",
        highlight:
          "Compare os pontos de vista entre o anime e o especial 'Chronicle' para mapear discrepâncias intencionais.",
      },
      {
        era: "O Retumbar",
        highlight:
          "Simule o avanço dos titãs colossais com nossa planilha de timeline e discuta as consequências filosóficas no fórum Filosofia Titan.",
      },
    ],
    crossMedia: [
      {
        title: "Attack on Titan: Brave Order",
        type: "Mobile",
        url: "https://aotbrave-order.jp/",
      },
      {
        title: "No Regrets",
        type: "OVA",
        url: "https://www.crunchyroll.com/pt-br/series/G63VGG2G6/attack-on-titan-ovas",
      },
      {
        title: "Guidebook: ANSWERS",
        type: "Guidebook",
        url: "https://kodansha.us/series/attack-on-titan-guidebook-answers/",
      },
    ],
    collectibles: [
      {
        name: "Manopla do DMT em resina",
        description: "Replica com leds RGB sincronizáveis com jogos.",
      },
      {
        name: "Mapa tático da Muralha Maria",
        description: "Poster em dupla camada com marcações removíveis para planejar missões.",
      },
      {
        name: "Patch da Divisão de Reconhecimento",
        description: "Arquivo vetorial e bordado oficial para jaquetas bomber.",
      },
    ],
    techHighlights: [
      {
        name: "Simulador de manobra ODM",
        description: "Mapa custom no Blade & Sorcery para praticar física do equipamento tridimensional.",
      },
      {
        name: "Kit Founding Theory",
        description: "Coleção de prompts para GPTs customizados que simulam memórias dos Eldianos.",
      },
    ],
    trivia: [
      "Hajime Isayama desenhou a muralha com base em uma maquete de madeira criada por fãs para o Comiket 2011.",
      "A cena do túnel em Marley foi renderizada com técnica de rotoscopia para preservar o grão do mangá.",
    ],
    communityHooks: [
      {
        title: "Expedição Roleplay",
        description: "Sessão mensal de tabletop que usa o sistema Powered by the Apocalypse adaptado para titãs.",
      },
      {
        title: "Clube de Fotogrametria",
        description: "Equipe que reconstrói cenários em 3D a partir das temporadas finais.",
      },
    ],
  },
  {
    title: "Demon Slayer",
    characterImage: "/characters/tanjiro.png",
    backgroundImage:
      "https://i.pinimg.com/originals/5b/2e/ef/5b2eef8a85637943d33cbfe14a9fa091.gif",
    backgroundVideo:
      "https://media.tenor.com/VJW3lhfIwMUAAAPo/demon-slayer.mp4",
    synopsis:
      "Em um Japão da era Taisho, Tanjiro Kamado é um jovem bondoso que sustenta sua família vendendo carvão. Sua vida muda drasticamente quando ele retorna para casa e descobre que sua família foi massacrada por demônios, e sua irmã mais nova, Nezuko, foi transformada em uma dessas criaturas. Determinado a encontrar uma cura para Nezuko e vingar sua família, Tanjiro entra para o Corpo de Caçadores de Demônios. Durante sua jornada, ele domina técnicas de respiração, enfrenta inimigos cada vez mais poderosos e descobre segredos sombrios sobre a origem dos demônios e seu líder, Muzan Kibutsuji.",
    loreTimeline: [
      {
        era: "Seleção Final",
        highlight:
          "Use nosso dossiê para estudar cada Respiração e montar build híbrida para campanhas.",
      },
      {
        era: "Distrito do Entretenimento",
        highlight:
          "Analise a coreografia do episódio 6 com breakdown de frames feito pela comunidade de animadores.",
      },
      {
        era: "Forja de Espadas",
        highlight:
          "Aprenda sobre ligas de aço e tinturas usadas nas lâminas Nichirin com guia técnico da nossa guilda cosplay.",
      },
    ],
    crossMedia: [
      {
        title: "Hinokami Chronicles",
        type: "Arena Fighter",
        url: "https://store.steampowered.com/app/1490890/Demon_Slayer__Kimetsu_no_Yaiba__The_Hinokami_Chronicles/",
      },
      {
        title: "Trilogia Mugen Train",
        type: "Filme",
        url: "https://www.crunchyroll.com/pt-br/series/GY2P9DP1Y/demon-slayer-kimetsu-no-yaiba",
      },
      {
        title: "Stage Play Official",
        type: "Teatro",
        url: "https://kimetsu.com/stage/",
      },
    ],
    collectibles: [
      {
        name: "Espada Nichirin impressa",
        description: "Modelagem pronta para impressão FDM com canal de LED interno.",
      },
      {
        name: "Haori da Corporação",
        description: "Molde costurável com padrões 4K dos pilares.",
      },
      {
        name: "Kit de chá do Urokodaki",
        description: "Receita aromática compartilhada nos encontros presenciais AnimeVerse.",
      },
    ],
    techHighlights: [
      {
        name: "Pack de shaders Respiração",
        description: "Preset para After Effects que recria as ondas do estilo Água e Chamas.",
      },
      {
        name: "Treinador de Ritmo Nichirin",
        description: "App comunitário que sincroniza respirações e treinos HIIT baseado na trilha sonora.",
      },
    ],
    trivia: [
      "O padrão do haori de Tanjiro é baseado em um ornamento de lã Ainu preservado no museu Sapporo.",
      "O efeito flamejante da Hinokami Kagura usa mix de pintura digital e partículas físicas capturadas em slow motion.",
    ],
    communityHooks: [
      {
        title: "Clã das Respirações",
        description: "Treinos semanais com alongamentos inspirados nos Hashiras guiados por fisioterapeutas fãs.",
      },
      {
        title: "Laboratório de Props",
        description: "Tutorial coletivo de props com arquivos gratuitos todo mês.",
      },
    ],
  },
];
