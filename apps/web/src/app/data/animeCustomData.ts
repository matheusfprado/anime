export type AnimeCustomization = {
  title: string;
  characterImage?: string;
  backgroundImage?: string;
  synopsis?: string;
};

export const ANIME_CUSTOM_DATA: AnimeCustomization[] = [
  {
    title: "Naruto",
    characterImage:
      "https://preview.redd.it/team-7-messed-up-but-strong-together-v0-m96oz37dxzoe1.jpg?width=640&crop=smart&auto=webp&s=1463e63c1cbb2d5784e41026321de3b6e8f4d703",
    backgroundImage: "https://images5.alphacoders.com/137/1370955.png",
    synopsis:
      "Naruto Uzumaki é um jovem ninja da Vila da Folha que carrega dentro de si o espírito da Raposa de Nove Caudas, uma poderosa criatura que devastou a vila anos antes de seu nascimento. Isolado e desprezado pelos habitantes, ele cresce com o sonho de se tornar Hokage, o líder máximo de sua aldeia, para que todos o reconheçam. Ao longo de sua jornada, Naruto enfrenta inimigos perigosos, treina arduamente e forma laços profundos com seus companheiros — especialmente Sasuke Uchiha e Sakura Haruno — enquanto descobre o verdadeiro significado da amizade, da dor e da perseverança.",
  },
  {
    title: "One Piece",
    characterImage: "/characters/luffy-gear5.png",
    backgroundImage:
      "https://i.pinimg.com/originals/64/6d/cc/646dcc8acb12607c621b89d8256e8f9e.gif",
    synopsis:
      "Monkey D. Luffy é um jovem sonhador que, inspirado pelo lendário pirata Shanks, decide se aventurar pelos mares em busca do tesouro supremo conhecido como One Piece. Após comer uma Fruta do Diabo, Luffy ganha o poder de esticar o corpo como borracha, mas perde a capacidade de nadar. Determinado a se tornar o Rei dos Piratas, ele reúne uma tripulação única — os Chapéus de Palha — composta por guerreiros, navegadores, médicos e sonhadores de diferentes origens. Juntos, eles enfrentam o Governo Mundial, piratas poderosos e forças místicas, explorando um vasto mundo repleto de segredos e ideais de liberdade.",
  },
  {
    title: "Attack on Titan",
    characterImage: "/characters/eren-titan.png",
    backgroundImage:
      "https://i.pinimg.com/originals/1f/9a/2a/1f9a2a2ab421b5b8a3e519d8ef9b26c2.gif",
    synopsis:
      "Séculos após a humanidade quase ser extinta pelos Titãs — criaturas gigantes que devoram humanos — os sobreviventes vivem confinados dentro de enormes muralhas. Eren Yeager, um jovem impetuoso, vê sua vida mudar para sempre quando um Titã colossal destrói parte da muralha, permitindo a invasão de sua cidade. Movido pelo ódio e desejo de vingança, Eren se alista na Tropa de Exploração junto com seus amigos Mikasa e Armin. No entanto, ele logo descobre verdades chocantes sobre a origem dos Titãs, a história da humanidade e o papel que ele mesmo desempenha nesse conflito devastador.",
  },
  {
    title: "Demon Slayer",
    characterImage: "/characters/tanjiro-fire.png",
    backgroundImage:
      "https://i.pinimg.com/originals/5b/2e/ef/5b2eef8a85637943d33cbfe14a9fa091.gif",
    synopsis:
      "Em um Japão da era Taisho, Tanjiro Kamado é um jovem bondoso que sustenta sua família vendendo carvão. Sua vida muda drasticamente quando ele retorna para casa e descobre que sua família foi massacrada por demônios, e sua irmã mais nova, Nezuko, foi transformada em uma dessas criaturas. Determinado a encontrar uma cura para Nezuko e vingar sua família, Tanjiro entra para o Corpo de Caçadores de Demônios. Durante sua jornada, ele domina técnicas de respiração, enfrenta inimigos cada vez mais poderosos e descobre segredos sombrios sobre a origem dos demônios e seu líder, Muzan Kibutsuji.",
  },
];
