export type Anime = {
  title: string;
  rating: number;
  description: string;
  genre: string;
  year: number;
  status: string;
  character: string;
  background: string;
  cover: string;
};

export type Category = {
  name: string;
  animes: Anime[];
};

export const CATEGORIES: Category[] = [
  // ------------------ SHOUNEN ------------------
  {
    name: "Shounen",
    animes: [
      {
        title: "Naruto",
        rating: 8.3,
        description:
          "Naruto Uzumaki é um jovem ninja que sonha em se tornar o Hokage.",
        genre: "Ação, Aventura",
        year: 2002,
        status: "Finalizado",
        character: "/characters/naruto.png",
        background:
          "https://pa1.aminoapps.com/6288/70cddb99c1e2d5372f274a14c224010060c96178_hq.gif",
        cover:
          "https://br.web.img3.acsta.net/pictures/16/04/11/16/56/089875.jpg",
      },
      {
        title: "Dragon Ball Z",
        rating: 8.7,
        description:
          "Goku e seus amigos defendem a Terra contra poderosos inimigos enquanto buscam se superar.",
        genre: "Ação, Artes Marciais, Aventura",
        year: 1989,
        status: "Finalizado",
        character: "/characters/goku.png",
        background:
          "https://i.pinimg.com/originals/ff/4a/a9/ff4aa9fafb96e1c5f94a589ec871a7d6.gif",
        cover:
          "https://i.pinimg.com/474x/f6/0d/02/f60d02d28665090bfa92c32938f5e4d0.jpg",
      },
      {
        title: "One Piece",
        rating: 9.0,
        description:
          "Luffy parte em uma jornada para se tornar o Rei dos Piratas.",
        genre: "Ação, Aventura, Comédia",
        year: 1999,
        status: "Em exibição",
        character: "/characters/luffy.png",
        background:
          "https://i.pinimg.com/originals/fc/32/f4/fc32f41477bb4cd5a0322d6e767b65a9.gif",
        cover:
          "https://cdn.selectgame.net/wp-content/uploads/2023/05/One-Piece-Capa-Anime-001-Luffy-Nami-Zoro-Usopp-Sanji.webp",
      },
    ],
  },

  // ------------------ AÇÃO E DRAMA ------------------
  {
    name: "Ação e Drama",
    animes: [
      {
        title: "Attack on Titan",
        rating: 9.1,
        description:
          "Eren Yeager luta pela liberdade e descobre a verdade por trás das muralhas.",
        genre: "Ação, Drama, Mistério",
        year: 2013,
        status: "Finalizado",
        character: "/characters/attackontitan.png",
        background:
          "https://blog.quizur.com/wp-content/uploads/2023/11/attack-on-titan-the-final-season-part2ending-akuma-no-ko.gif",
        cover:
          "https://img.elo7.com.br/product/zoom/2C15140/big-poster-anime-attack-on-titan-lo004-tamanho-90x60-cm-attack-on-titan.jpg",
      },
      {
        title: "Demon Slayer",
        rating: 8.7,
        description:
          "Tanjiro busca vingança contra os demônios e tenta salvar sua irmã.",
        genre: "Ação, Fantasia",
        year: 2019,
        status: "Em exibição",
        character: "/characters/tanjiro.png",
        background:
          "https://i.pinimg.com/originals/f5/f7/51/f5f751a75b7f9aed22cb2fb9f58876ad.gif",
        cover: "/cover/DamonSlayerCapa.png",
      },
      {
        title: "Fullmetal Alchemist",
        rating: 9.2,
        description:
          "Edward e Alphonse buscam a Pedra Filosofal após perderem seus corpos em um experimento de alquimia.",
        genre: "Ação, Aventura, Drama",
        year: 2009,
        status: "Finalizado",
        character: "/characters/edward.png",
        background:
          "https://i.pinimg.com/originals/a8/f0/a0/a8f0a0b8473c0462a93890444ff55822.gif",
        cover: "/cover/FMA.png",
      },
    ],
  },

  // ------------------ FANTASIA ------------------
  {
    name: "Fantasia",
    animes: [
      {
        title: "Sword Art Online",
        rating: 7.7,
        description:
          "Jogadores ficam presos em um MMORPG e devem lutar para sobreviver dentro do jogo.",
        genre: "Ação, Aventura, Fantasia",
        year: 2012,
        status: "Em exibição",
        character: "/characters/kirito.png",
        background:
          "https://i.pinimg.com/originals/3d/9b/66/3d9b66d411eaf4aef398e73a29dd1989.gif",
        cover: "/cover/SAO.png",
      },
      {
        title: "Re:Zero",
        rating: 8.3,
        description:
          "Subaru é transportado para um mundo de fantasia e descobre que pode voltar no tempo após morrer.",
        genre: "Fantasia, Drama, Suspense",
        year: 2016,
        status: "Em exibição",
        character: "/characters/subaru.png",
        background:
          "https://media.tenor.com/REfa3oo6K7IAAAAM/re-zero-natsuki-subaru.gif",
        cover: "/cover/ReZero.png",
      },
      {
        title: "Black Clover",
        rating: 8.1,
        description:
          "Asta, um garoto sem magia, busca se tornar o Rei Mago de seu reino.",
        genre: "Ação, Fantasia, Magia",
        year: 2017,
        status: "Em exibição",
        character: "/characters/asta.png",
        background: "https://giffiles.alphacoders.com/221/221910.gif",
        cover: "/cover/BlackClover.png",
      },
    ],
  },

  // ------------------ PSICOLÓGICO ------------------
  {
    name: "Psicológico",
    animes: [
      {
        title: "Death Note",
        rating: 9.0,
        description:
          "Light Yagami encontra um caderno que mata qualquer pessoa cujo nome seja escrito nele.",
        genre: "Suspense, Mistério, Psicológico",
        year: 2006,
        status: "Finalizado",
        character: "/characters/light.png",
        background: "https://giffiles.alphacoders.com/147/147074.gif",
        cover: "/cover/DeathNote.png",
      },
      {
        title: "Code Geass",
        rating: 8.9,
        description:
          "Lelouch ganha o poder do 'Geass' e lidera uma rebelião contra o Império da Britannia.",
        genre: "Ação, Mecha, Psicológico",
        year: 2006,
        status: "Finalizado",
        character: "/characters/lelouch.png",
        background:
          "https://i.pinimg.com/originals/13/a9/99/13a99989da1f8c6b20b6669987d9ca9b.gif",
        cover: "/cover/CodeGeass.png",
      },
      {
        title: "Paranoia Agent",
        rating: 7.8,
        description:
          "Uma série de ataques misteriosos provoca o colapso psicológico de uma cidade.",
        genre: "Psicológico, Mistério, Thriller",
        year: 2004,
        status: "Finalizado",
        character: "/characters/lilslugger.png",
        background:
          "https://64.media.tumblr.com/595e71ddf933be314c0336cefca73e67/tumblr_ml635s5wBA1qdc388o1_500.gif",
        cover: "/cover/ParanoiaAgent.png",
      },
    ],
  },

  // ------------------ ESCOLAR ------------------
  {
    name: "Escolar e Romance",
    animes: [
      {
        title: "Your Lie in April",
        rating: 8.6,
        description:
          "Um pianista traumatizado volta a tocar após conhecer uma violinista livre e inspiradora.",
        genre: "Drama, Romance, Música",
        year: 2014,
        status: "Finalizado",
        character: "/characters/arima.png",
        background:
          "https://i.pinimg.com/originals/3e/b1/53/3eb1532f87ee35e0d54805774b86f8b6.gif",
        cover: "/cover/YourLieInApril.png",
      },
      {
        title: "Toradora!",
        rating: 8.2,
        description:
          "Dois estudantes com personalidades opostas se unem para ajudar um ao outro a conquistar seus amores.",
        genre: "Comédia, Romance, Escolar",
        year: 2008,
        status: "Finalizado",
        character: "/characters/taiga.png",
        background:
          "https://i.pinimg.com/originals/3a/96/b6/3a96b6854bf4d2ec1cc07d98d6ee9d1b.gif",
        cover: "/cover/Toradora.png",
      },
      {
        title: "Komi-san wa, Komyushou desu",
        rating: 8.4,
        description:
          "Komi tenta superar sua timidez extrema e fazer 100 amigos na escola.",
        genre: "Comédia, Slice of Life, Escolar",
        year: 2021,
        status: "Em exibição",
        character: "/characters/komi.png",
        background:
          "https://64.media.tumblr.com/7ab28bb8546063207bd6eac6c1badc2f/f80d82af895ff855-ef/s500x750/95e8002c0b21acc820072e2b2b5573bb10c8c5ea.gifv",
        cover: "/cover/KomiSan.png",
      },
    ],
  },

  // ------------------ NOVOS LANÇAMENTOS ------------------
  {
    name: "Novos Lançamentos",
    animes: [
      {
        title: "Jujutsu Kaisen",
        rating: 8.8,
        description:
          "Yuji Itadori se envolve em um mundo de maldições e se torna um feiticeiro jujutsu.",
        genre: "Ação, Sobrenatural, Fantasia",
        year: 2020,
        status: "Em exibição",
        character: "/characters/itadori.png",
        background: "https://giffiles.alphacoders.com/211/211786.gif",
        cover: "/cover/JujutsuKaisen.png",
      },
      {
        title: "Chainsaw Man",
        rating: 8.9,
        description:
          "Denji, um jovem caçador de demônios, ganha o poder de transformar partes de seu corpo em motosserras.",
        genre: "Ação, Terror, Fantasia",
        year: 2022,
        status: "Em exibição",
        character: "/characters/denji.png",
        background: "https://giffiles.alphacoders.com/217/217718.gif",
        cover: "/cover/ChainsawMan.png",
      },
      {
        title: "Solo Leveling",
        rating: 8.5,
        description:
          "Um caçador fraco ganha uma habilidade misteriosa que o permite ficar mais forte a cada missão.",
        genre: "Ação, Fantasia, RPG",
        year: 2024,
        status: "Em exibição",
        character: "/characters/jinwoo.png",
        background:
          "https://i.pinimg.com/originals/7c/b7/fe/7cb7fee465024f546d4eced9bb9c6645.gif",
        cover: "/cover/SoloLeveling.png",
      },
    ],
  },
];
