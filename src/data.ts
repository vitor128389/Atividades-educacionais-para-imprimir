import { ActivitySample, Bonus, Testimonial, FAQItem } from './types';

export const ACTIVITY_CATEGORIES = [
  { id: 'math', name: 'Matemática e Números', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'alphabet', name: 'Alfabetização e Letras', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'coloring', name: 'Desenhos para Colorir', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'motor', name: 'Coordenação Motora', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export const ACTIVITY_SAMPLES: ActivitySample[] = [
  {
    id: 'matematica-1',
    title: 'Ligue o Número ao Grupo Correto',
    category: 'math',
    age: '4 a 6 anos',
    thumbnailSvg: 'math',
    instructions: 'Conte os objetos em cada conjunto e ligue ao número correspondente no centro.',
    printableContent: {
      title: 'Contando e Somando',
      description: 'Atividade de fixação dos números de 1 a 5 e contagem de objetos lúdicos.',
      instructions: 'Conte as figuras em cada quadro e desenhe uma linha até o número correspondente.',
      elements: [
        {
          type: 'math',
          data: {
            leftItems: [
              { id: 'l1', count: 3, label: '🍎 Maçãs', value: 3 },
              { id: 'l2', count: 1, label: '🧸 Ursinho', value: 1 },
              { id: 'l3', count: 4, label: '⭐ Estrelas', value: 4 },
            ],
            numbers: [1, 3, 4],
          }
        }
      ]
    }
  },
  {
    id: 'alfabeto-1',
    title: 'Treino de Caligrafia: Vogal A',
    category: 'alphabet',
    age: '3 a 5 anos',
    thumbnailSvg: 'alphabet',
    instructions: 'Suba e desça seguindo a direção das setas e depois cubra os tracejados da letra A.',
    printableContent: {
      title: 'A de Abelha & Abacaxi',
      description: 'Treino de caligrafia e reconhecimento visual da letra A.',
      instructions: 'Cubra o pontilhado da vogal A maiúscula e minúscula, depois pinte a abelhinha.',
      elements: [
        {
          type: 'trace',
          data: {
            letter: 'A',
            words: ['ABELHA', 'ABACAXI', 'ANEL'],
            traces: ['A', 'A', 'A', 'a', 'a', 'a'],
          }
        }
      ]
    }
  },
  {
    id: 'colorir-1',
    title: 'Leãozinho Divertido no Safari',
    category: 'coloring',
    age: '3 a 8 anos',
    thumbnailSvg: 'coloring',
    instructions: 'Solte a imaginação e pinte o leãozinho com as cores do arco-íris!',
    printableContent: {
      title: 'As Cores do Rei Leão',
      description: 'Desenvolvimento artístico e criatividade livre com guias de cores.',
      instructions: 'Use seus lápis favoritos para dar vida ao leãozinho. Você também pode pintar o sol e as flores!',
      elements: [
        {
          type: 'color',
          data: {
            title: 'Leãozinho Feliz',
            guideline: 'Dica: Use amarelo para o corpo e marrom para a juba.',
          }
        }
      ]
    }
  },
  {
    id: 'motor-1',
    title: 'Caminho das Borboletas: Ligue os Pontos',
    category: 'motor',
    age: '3 a 5 anos',
    thumbnailSvg: 'motor',
    instructions: 'Ajude a borboleta a chegar até a flor cobrindo as linhas curvas e em espiral.',
    printableContent: {
      title: 'Coordenação Motora Fina',
      description: 'Trabalho de foco, destreza e preensão do lápis seguindo linhas de fluxo.',
      instructions: 'Cubra o caminho pontilhado com cuidado, mantendo o lápis no papel de uma ponta à outra.',
      elements: [
        {
          type: 'maze',
          data: {
            paths: [
              { start: '🦋', end: '🌸', pattern: 'wave' },
              { start: '🐝', end: '🌻', pattern: 'zigzag' },
              { start: '🐞', end: '🌿', pattern: 'loop' },
            ]
          }
        }
      ]
    }
  }
];

export const BONUSES: Bonus[] = [
  {
    id: 'bonus-1',
    badge: 'BÔNUS 1',
    title: '10 Jogos Educativos Prontos para Imprimir',
    subtitle: 'Diversão em família a custo zero',
    icon: 'Gamepad2',
    value: 29.90,
    isFree: true,
    description: 'Jogos cooperativos e competitivos que estimulam raciocínio rápido, memória e reflexos de forma totalmente didática.',
    bullets: [
      'Jogo da Memória das Letras',
      'Dominó das Sílabas',
      'Bingo do Alfabeto',
      'Quebra-Cabeça das Palavras',
      'Ligue a Figura à Palavra',
      'Roleta das Vogais',
      'Caça-Palavras Infantil',
      'Trilha das Sílabas',
      'Cartas das Cores e Formas',
      'Jogo dos Números'
    ]
  },
  {
    id: 'bonus-2',
    badge: 'BÔNUS 2',
    title: '200+ Atividades de Datas Comemorativas',
    subtitle: 'O ano letivo inteiro planejado',
    icon: 'CalendarDays',
    value: 39.90,
    isFree: true,
    description: 'Materiais com temas e atividades focados nas datas mais queridas do ano para envolver os pequenos no clima festivo.',
    bullets: [
      'Volta às Aulas super animados',
      'Páscoa divertida com coelhos',
      'Dia das Mães e Dia dos Pais',
      'Festa Junina e tradições',
      'Halloween e mistérios infantis',
      'Natal mágico para colorir e recortar'
    ]
  },
  {
    id: 'bonus-3',
    badge: 'BÔNUS 3',
    title: '100+ Desenhos Variados para Colorir',
    subtitle: 'Estimule a imaginação artística',
    icon: 'Palette',
    value: 19.90,
    isFree: true,
    description: 'Uma coleção de animais super fofos, dinossauros aventureiros, fadas e cenários da natureza para exercitar o foco e relaxar.',
    bullets: [
      'Animais do zoológico e fazendinha',
      'Dinossauros brincalhões',
      'Paisagens e natureza exuberantes',
      'Cenários mágicos e fantasias'
    ]
  },
  {
    id: 'bonus-4',
    badge: 'BÔNUS 4',
    title: 'Material 100% PDF com Acesso Vitalício',
    subtitle: 'Baixe e imprima quantas vezes precisar',
    icon: 'FileSpreadsheet',
    value: 14.90,
    isFree: true,
    description: 'Tenha o arquivo guardado para sempre em seu computador, tablet ou celular. Perfeito para imprimir sob demanda.',
    bullets: [
      'Acesso imediato enviado ao seu e-mail',
      'Download em apenas um clique',
      'Formato padrão A4 de alta qualidade',
      'Perfeito para escola ou lição de casa'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ana Paula',
    role: 'Mãe do Theo (4 anos)',
    city: 'São Paulo - SP',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
    text: 'Gente, sério, chocada com a qualidade! Meu pequeno Theo tem 4 anos e pegou as vogais num piscar de olhos. Agora ele mesmo pede pra fazer as "tarefinhas" no fim da tarde. Melhor investimento que fiz pro meu filho, salvou demais!'
  },
  {
    id: 'test-2',
    name: 'Márcia Costa',
    role: 'Professora de Educação Infantil',
    city: 'Curitiba - PR',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
    text: 'Sou prof de escolinha e digo: esse material é uma verdadeira mão na roda pros meus planejamentos! Uso direto com a turminha e eles ficam super focados, super lúdico. O design é fofinho e eles amam.'
  },
  {
    id: 'test-3',
    name: 'Thiago Lemes',
    role: 'Pai do Leo (3 anos) e da Clara (6 anos)',
    city: 'Belo Horizonte - MG',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
    text: 'Sem condições de ficar gastando rios de dinheiro com livraria ou apostilas caras. Esse PDF é bom demais, custo-benefício surreal! Imprimo em segundos no escritório e a Clara já tá até lendo as primeiras palavras, muito top!'
  },
  {
    id: 'test-4',
    name: 'Sandra Alencar',
    role: 'Psicopedagoga Clínica',
    city: 'Recife - PE',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
    text: 'Recomendo de olhos fechados pros pais no consultório. O material trabalha a coordenação motora fina e de quebra ajuda a reduzir absurdamente o tempo de tela dos pequenos. Uma maravilha de material!'
  }
];

export const INTRO_HIGHLIGHTS = [
  { icon: 'Sparkles', text: '500+ Atividades pedagógicas exclusivas e organizadas por idade' },
  { icon: 'Smile', text: 'Facilita o aprendizado brincando e reduz o tempo de telas nocivas' },
  { icon: 'Printer', text: 'Pronto em PDF de alta qualidade para imprimir quando quiser' },
  { icon: 'Clock', text: 'Acesso imediato no e-mail após a confirmação!' }
];

export const WHO_IS_FOR = [
  {
    id: 'wf-1',
    title: 'Pais e Mães Dedicados',
    description: 'Que querem auxiliar no reforço escolar e garantir que seus filhos tenham entretenimento produtivo em casa, longe do celular.',
    icon: 'Home',
    color: 'border-blue-200 bg-blue-50/50 text-blue-600',
  },
  {
    id: 'wf-2',
    title: 'Professores e Educadores',
    description: 'Procurando atividades ricas, lúdicas e alinhadas aos marcos pedagógicos para enriquecer seu plano de aula economizando horas de planejamento.',
    icon: 'School',
    color: 'border-amber-200 bg-amber-50/50 text-amber-600',
  },
  {
    id: 'wf-3',
    title: 'Profissionais de Apoio',
    description: 'Psicopedagogos e tutores de reforço escolar buscando fichas organizadas por categorias de desenvolvimento cognitivos infantis de 3 a 8 anos.',
    icon: 'Brain',
    color: 'border-red-200 bg-red-50/50 text-red-600',
  },
  {
    id: 'wf-4',
    title: 'Crianças de 3 a 8 anos',
    description: 'O público-alvo central do material, que se diverte aprendendo vogais, números, lógicas, recorte e colagem com desenhos super simpáticos.',
    icon: 'Baby',
    color: 'border-emerald-200 bg-emerald-50/50 text-emerald-600',
  }
];

export const BENEFITS = [
  {
    title: 'Aprendizado divertido',
    icon: 'Laugh',
    text: 'Colorir, desenhar e resolver desafios fáceis mantém a criança engajada de forma natural.'
  },
  {
    title: 'Coordenação Motora Fina',
    icon: 'PenTool',
    text: 'Treino de tracejados, cobrir linhas e labirintos lúdicos preparam a criança para a escrita fluida.'
  },
  {
    title: 'Auxilio na alfabetização',
    icon: 'CaseSensitive',
    text: 'Introdução gradual de letras, vogais e formação de sílabas com forte associação imagética.'
  },
  {
    title: 'Praticidade total',
    icon: 'CheckSquare',
    text: 'Sem mistério. Chega no e-mail e você decide o que imprimir conforme a necessidade da criança.'
  },
  {
    title: 'Economia financeira',
    icon: 'TrendingDown',
    text: 'Pague uma única vez R$ 9,90 e tenha o material vitalício, sem mensalidades ou taxas surpresa.'
  },
  {
    title: 'Organização inteligente',
    icon: 'LayoutGrid',
    text: 'Material segmentado e estruturado passo a passo, facilitando aplicar as tarefas no dia a dia.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Como receberei o material?',
    answer: 'Você receberá o acesso imediatamente no e-mail cadastrado logo após a confirmação do pagamento. O material é enviado em formato digital de altíssima resolução.'
  },
  {
    id: 'faq-2',
    question: 'Preciso pagar mensalidade?',
    answer: 'Não! O pagamento é único. Você paga somente R$ 9,90 uma vez e desfruta de acesso vitalício a todas as 500+ atividades e bônus.'
  },
  {
    id: 'faq-3',
    question: 'Posso imprimir quantas vezes quiser?',
    answer: 'Com certeza! Como você recebe os livros digitais em formato PDF, você pode imprimi-los quantas vezes precisar, seja para um único filho ou para uma turma escolar inteira.'
  },
  {
    id: 'faq-4',
    question: 'Funciona no celular?',
    answer: 'Sim, você pode baixar o PDF e visualizar no celular, tablet ou computador. Você também pode enviar o arquivo diretamente para sua impressora a partir de qualquer dispositivo.'
  },
  {
    id: 'faq-5',
    question: 'O material é em formato PDF?',
    answer: 'Sim, todos os volumes e bônus exclusivos são arquivos PDF formatados em tamanho padrão A4, prontos para impressão com excelente definição e cores vibrantes.'
  }
];
