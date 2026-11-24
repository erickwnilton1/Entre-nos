export type Coordinate = [number, number];
export type Letter = [title: string, description: string, message: string];
export interface Memory {
  title: string;
  year: string;
  description: string;
  image: string;
}
export type Surprise = [days: number, title: string, description: string];

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
}

export const DEFAULT_DATA: AppData = {
  n1: "Eu", n2: "Você", orig: "Recife", dest: "Miami",
  dep: "2026-12-07T08:00", ret: "2027-02-27T18:00",
  cartas: [
    ["Abra quando estiver indo","Para o momento da partida","Hoje você está indo, e o meu peito está dividido em dois: um pedaço feliz, outro já sentindo sua falta.\n\nIrei deixar você no aeroporto, e tenho certeza que irá passar um filme na minha cabeça com todos nossos momentos juntos.\n\nBoa viagem, meu amor. Vá, seja bastante feliz, e volte me contando cada detalhe. Eu estarei aqui, te esperando."],
    ["Abra quando sentir saudade","Quando o aperto vier","Eu também estou sentindo. Sinto o seu abraço, aquela conversa sem pressa, olhar no fundo dos seus olhos.\n\nNós construímos algo único. Se não fosse, a saudade nem existiria.\n\nRespira fundo, fecha os olhos e lembra: estou do outro lado, pensando em você agora. A distância não diminui nada do que sinto. Só me faz te querer mais."],
    ["Abra quando estiver triste","Para os dias pesados","Você não precisa ser forte o tempo inteiro. Existem dias difíceis, e tudo bem tê-los.\n\nChora se precisar, descansa, reclama comigo. Eu não quero a versão perfeita de você, quero você de verdade.\n\nEstou longe, mas perto no que importa. Me manda mensagem, me liga, ou só fica quietinha lendo isso. Esse dia passa."],
    ["Abra quando lembrar de nós","Só nós dois entendemos","Aposto que você sorriu em algum momento antes mesmo de abrir. Foi alguma das nossas piadas ou momentos juntos, não foi?\n\nEu lembro de tantas coisas: das nossas bobeiras, dos momentos juntos, dos silêncios confortáveis. Esse tipo de coisa não cabe em foto, só na gente.\n\nGuarda isso aí com você. Quando voltar, a gente cria mais um monte."],
    ["Abra quando estiver voltando","A volta para casa","Se você está lendo isso, já está a caminho. Eu estou contando as horas, ensaiando o que vou dizer e sabendo que, na hora, vou simplesmente te abraçar e esquecer tudo.\n\nQuero ouvir suas histórias, ver suas fotos, descobrir coisas novas suas.\n\nVem logo. Estou te esperando, com o abraço mais apertado que eu já guardei."],
    ["Abra quando tiver um dia incrível","Para comemorar junto","Eu sabia! Me conte tudo. Quero cada detalhe, até os bobos.\n\nSuas alegrias também são minhas. Não estou aí para ver seu sorriso, mas consigo imaginar ele daqui.\n\nOrgulho de você hoje e sempre. Aproveita, guarda esse dia, e me liga para eu comemorar com você."],
    ["Abra quando achar que está sozinha","Você é lembrada","Você não está sozinha. Mesmo quando a casa está quieta e o mundo parece grande demais.\n\nExiste gente que pensa em você todos os dias, e eu sou a primeira da fila. Você é amada e importante, e faz falta em cada canto daqui.\n\nTá sentindo aquele peso? Respira. Eu estou contigo, do meu jeito, do outro lado do oceano."],
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
  sem: ["Semana 1: estou feliz por você. Aproveite.","Semana 2: já passou da fase de adaptação. Me conte sobre os seus passeios","Semana 3: me conta uma coisa nova que você fez."],
  sau: ["Fecha os olhos: estou te abraçando agora.","Hoje pensei em você umas mil vezes.","Falta pouco meu pão doce","Seu cheiro, seu sorriso, seu jeito: tudo faz falta."],
  mot: ["Você é a minha pessoa favorita.","Não vejo a hora de poder te tocar","Alguém no Brasil tem muito orgulho de você.","Já pensou no que vamos fazer quando você voltar?"],
  conta: "Quero te contar uma coisa: eu te amo mais que tudo.",
  sur: [[30,"Surpresa de 30 dias","Um mês! Nosso primeira saída será para o Outback"],[60,"Surpresa de 60 dias","Dois meses. E temos um compromisso, eu e você, sozinhos."],[90,"Surpresa de 90 dias","Noventa dias. Tem algo te esperando."]],
  todo: ["Ir ao cinema","Fazer uma viagem pra ilha","Jantar no lugar que a gente gosta","Passar um dia inteiro sem celular"]
};

export const CITIES: Record<string, Coordinate> = {
  "Recife": [-8.05,-34.88], "São Paulo": [-23.55,-46.63], "Rio de Janeiro": [-22.9,-43.17],
  "Salvador": [-12.97,-38.5], "Fortaleza": [-3.73,-38.52], "Brasília": [-15.78,-47.93],
  "Belo Horizonte": [-19.92,-43.94], "Porto Alegre": [-30.03,-51.22], "Orlando": [28.54,-81.38],
  "Miami": [25.76,-80.19], "Nova York": [40.71,-74], "Boston": [42.36,-71.06],
  "Los Angeles": [34.05,-118.24], "San Francisco": [37.77,-122.42], "Chicago": [41.88,-87.63]
};
