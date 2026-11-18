export type Coordinate = [number, number];
export type Letter = [title: string, description: string, message: string];
export interface Memory {
  title: string;
  year: string;
  description: string;
  image: string;
}
export type Surprise = [days: number, title: string, description: string];
export type Song = [title: string, artist: string, description: string, url: string];

export interface AppData {
  n1: string;
  n2: string;
  orig: string;
  dest: string;
  dep: string;
  ret: string;
  cartas: Letter[];
  mem: Memory[];
  sem: string[];
  sau: string[];
  mot: string[];
  conta: string;
  sur: Surprise[];
  todo: string[];
  pl: Song[];
}

export const DEFAULT_DATA: AppData = {
  n1: "Eu", n2: "Você", orig: "Recife", dest: "Miami",
  dep: "2026-12-07T08:00", ret: "2027-02-27T18:00",
  cartas: [
    ["Abra quando estiver indo","Para o momento da partida","Hoje você vai embora, e o meu peito está dividido em dois: um pedaço explodindo de orgulho, outro já sentindo falta.\n\nVocê batalhou por essa viagem. Cada passo seu até aqui me mostrou quem você é, e ver você realizando isso me deixa feliz de um jeito difícil de explicar.\n\nBoa viagem, meu amor. Vá, viva tudo, e volte me contando cada detalhe. A saudade já começou, mas ela vem junto com a certeza de que vale a pena."],
    ["Abra quando sentir saudade","Quando o aperto vier","Eu também estou sentindo. Sinto o seu abraço, aquela conversa sem pressa, o jeito como você ri de coisas que só nós entendemos.\n\nA saudade dói porque o que construímos é grande. Se não fosse, ela nem apareceria.\n\nRespira fundo, fecha os olhos e lembra: estou do outro lado desse mesmo céu, pensando em você agora. A distância não diminui nada do que sinto. Só me faz querer te abraçar mais forte."],
    ["Abra quando estiver triste","Para os dias pesados","Você não precisa ser forte o tempo inteiro. Sério. Existem dias difíceis, e tudo bem tê-los.\n\nChora se precisar, descansa, reclama comigo. Eu não quero a versão perfeita de você, quero você de verdade.\n\nEstou longe no mapa, mas perto no que importa. Me manda mensagem, me liga, ou só fica quietinha lendo isso. Esse dia passa, e eu continuo aqui."],
    ["Abra quando precisar de motivação","Para lembrar do que você é capaz","Lembra de quanta coragem foi preciso para chegar aí? Foi sua. Ninguém fez isso por você.\n\nVocê é mais capaz do que acredita e mais forte do que imagina. Aproveite essa oportunidade: conheça lugares, diga sim para o inesperado, erre, aprenda, se surpreenda.\n\nEu vou estar torcendo por você em cada passo, como sempre estive."],
    ["Abra quando lembrar de nós","Só nós dois entendemos","Aposto que você sorriu em algum momento antes mesmo de abrir. Foi alguma das nossas piadas internas, não foi?\n\nEu lembro de tantas coisas: das nossas bobeiras, dos planos mirabolantes, dos silêncios confortáveis. Esse tipo de coisa não cabe em foto, só na gente.\n\nGuarda isso aí com você. Quando voltar, a gente cria mais um monte."],
    ["Abra quando estiver voltando","A volta para casa","Se você está lendo isso, já está a caminho. Eu estou contando as horas, ensaiando o que vou dizer e sabendo que, na hora, vou simplesmente te abraçar e esquecer tudo.\n\nQuero ouvir suas histórias, ver suas fotos, descobrir quem você se tornou nessa viagem.\n\nVem logo. Estou te esperando, com o abraço mais apertado que eu já guardei."],
    ["Abra quando não conseguir dormir","Para ler antes de dormir","Shhh. Larga o celular depois de ler isso.\n\nRespira devagar. Inspira, segura, solta. O dia acabou e você fez o que podia. Amanhã é outra chance.\n\nEu estou aqui, mesmo dormindo do outro lado. Você está segura, é querida, e é amada. Fecha os olhos. Boa noite, meu amor. Sonha bonito."],
    ["Abra quando tiver um dia incrível","Para comemorar junto","Eu sabia! Conta tudo, agora mesmo. Quero cada detalhe, até os bobos.\n\nSuas alegrias também são minhas. Não estou aí para ver seu sorriso, mas consigo imaginar ele daqui.\n\nOrgulho de você hoje e sempre. Aproveita, guarda esse dia, e me liga para eu comemorar contigo."],
    ["Abra quando achar que está sozinha","Você é lembrada","Você não está sozinha. Mesmo quando a casa está quieta e o mundo parece grande demais.\n\nExiste gente que pensa em você todos os dias, e eu sou a primeira da fila. Você é amada e importante, e faz falta em cada canto daqui.\n\nTá sentindo aquele peso? Respira. Eu estou contigo, do meu jeito, do outro lado do oceano."],
    ["Abra quando completar um mês","Um mês já passou","Um mês! Parecia uma eternidade, e olha só: você já viveu tanta coisa. Eu sei que não foi sempre fácil, mas você enfrentou tudo.\n\nEstou orgulhoso de cada passo. Aproveite o que vem pela frente, porque cada dia aí é um presente.\n\nA saudade segue aqui, mas faz parte. Falta menos do que ontem."],
    ["Abra quando completar dois meses","A reta final está perto","Dois meses. Quanto caminho, quanta saudade acumulada, quanta história nova para me contar.\n\nO reencontro já dá para sentir de longe. Eu começo a pensar no aeroporto, no abraço, na primeira coisa que vou dizer.\n\nMais um pouquinho. Aproveita o que falta, e carrega a gente junto."],
    ["Abra quando estiver de volta","O reencontro","Você voltou. Finalmente.\n\nEu imaginei esse momento tantas vezes e, mesmo assim, não estava preparado para a alegria que é ter você aqui.\n\nObrigado por ter ido, por ter voltado, e por ter ficado comigo mesmo à distância.\n\nForam dias, semanas e meses contando a distância.\n\nMas agora não precisamos mais contar quilômetros.\n\nSó quero contar os segundos para te abraçar novamente."]
  ],
  mem: [
    { title: "Nosso primeiro encontro", year: "2026", description: "O dia em que tudo começou.", image: "/memories/primeiro-encontro.jpg" },
    { title: "Minha foto favorita", year: "2026", description: "A foto que eu quero pôr em um quadro.", image: "/memories/foto-preferida.jpg" },
    { title: "Um final de semana qualquer", year: "2026", description: "Esses são meus favoritos.", image: "/memories/final-de-semana.jpg" },
    { title: "Nós dois", year: "2026", description: "O melhor dia da minha vida.", image: "/memories/nos.jpg" },
    { title: "Minha companheira", year: "2026", description: "A pessoa que me faz feliz todos os dias.", image: "/memories/nos-1.jpeg" },
    { title: "A melhor lasanha que eu já comi", year: "2026", description: "Essa tá no meu top 1.", image: "/memories/lasanha.jpg" },
    { title: "Do último feriado", year: "2026", description: "Esse foi diferente.", image: "/memories/piscina.PNG" },
    { title: "Meu porto seguro", year: "2026", description: "O lugar onde me sinto em casa.", image: "/memories/brincadeira.PNG" },
    { title: "Minha felicidade é você", year: "2026", description: "Minha felicidade tem nome.", image: "/memories/praia.jpeg" },
    { title: "Depois de um rodizío", year: "2026", description: "Comendo sempre.", image: "/memories/pos-rodizio.jpeg" },
    { title: "Nossa primeira viagem", year: "2026", description: "Viagem de 2h.", image: "/memories/sitio.jpeg" },
    { title: "Dona dos melhores hamburguers", year: "2026", description: "Ganha do laça", image: "/memories/hamburguer.jpeg" },
    { title: "Dona do melhor cheiro", year: "2026", description: "Inclusive, queria agora.", image: "/memories/cheiro.jpeg" },
    { title: "De uma tarde produtiva", year: "2026", description: "Só pintamos e fizemos pudim.", image: "/memories/pintura.jpeg" },
    { title: "Meu coração fora do peito", year: "2026", description: "Minha felicidade é te fazer feliz.", image: "/memories/selfie.jpeg" },
    { title: "Dona do melhor pudim", year: "2026", description: "Depois diz que não quer me ver gordo.", image: "/memories/pudim.jpeg" },
    { title: "Dos nossos momentos diários", year: "2026", description: "A hora mais esperada do meu dia.", image: "/memories/chamada-de-video.jpeg" },
    { title: "Das nossas despedidas", year: "2026", description: "A pior hora do dia.", image: "/memories/despedidas.jpeg" },
  ],
  sem: ["Semana 1: você está começando uma história linda. Aproveite.","Semana 2: já passou da fase de adaptação. Olha o quanto você já fez.","Semana 3: me conta uma coisa nova que você aprendeu."],
  sau: ["Fecha os olhos: estou te abraçando agora.","Hoje pensei em você umas mil vezes.","Falta menos do que ontem.","Seu cheiro, seu riso, seu jeito: tudo faz falta."],
  mot: ["Você é a minha pessoa favorita.","Lembra do seu sorriso hoje de manhã? Eu lembro.","Alguém no Brasil tem muito orgulho de você.","Já pensou no que vamos comer quando voltar?"],
  conta: "Quero te contar uma coisa: eu te amo mais do que ontem, e menos do que amanhã.",
  sur: [[30,"Surpresa de 30 dias","Um mês! Escrevi uma música bobinha para você (cantada muito mal) e vou te mandar por áudio."],[60,"Surpresa de 60 dias","Dois meses. Uma videochamada de jantar, eu cozinho aqui, você pede aí."],[90,"Surpresa de 90 dias","Noventa dias. Tem algo te esperando aqui em casa."]],
  todo: ["Ir ao cinema e dividir a pipoca","Fazer uma viagem só nós dois","Jantar naquele lugar que a gente adora","Passar um dia inteiro sem celular"],
  pl: [["Nossa música","Artista","Tocou no dia em que nos conhecemos.","https://open.spotify.com"],["Viagem de carro","Artista","A trilha das nossas estradas.","https://youtube.com"]]
};

export const CITIES: Record<string, Coordinate> = {
  "Recife": [-8.05,-34.88], "São Paulo": [-23.55,-46.63], "Rio de Janeiro": [-22.9,-43.17],
  "Salvador": [-12.97,-38.5], "Fortaleza": [-3.73,-38.52], "Brasília": [-15.78,-47.93],
  "Belo Horizonte": [-19.92,-43.94], "Porto Alegre": [-30.03,-51.22], "Orlando": [28.54,-81.38],
  "Miami": [25.76,-80.19], "Nova York": [40.71,-74], "Boston": [42.36,-71.06],
  "Los Angeles": [34.05,-118.24], "San Francisco": [37.77,-122.42], "Chicago": [41.88,-87.63]
};
