/* =========================================================================
   JM ARTS — ARQUIVO DE DADOS
   ---------------------------------------------------------------------------
   Edite APENAS este arquivo para alterar:
   → contato / WhatsApp / Instagram / endereço / horários
   → produtos, formatos, materiais, quantidades e acabamentos
   → preços e regras de cálculo do orçamento
   → serviços, diferenciais e itens do portfólio
   ========================================================================= */

window.JM = {

  /* ---------------------------------------------------------------------
     1. IDENTIDADE / CONTATO
     --------------------------------------------------------------------- */
  config: {
    nome: "JM Arts",
    nomeCompleto: "JM Arts — Gráfica Criativa",
    tagline: "Impressão, papelaria e materiais personalizados",

    // Só o número, com DDI. Formato: 55 + DDD + número
    whatsapp: "558183899022",
    whatsappExibicao: "+55 81 8389-9022",

    instagram: "JMPERSONALIZADOSPE",
    instagramUrl: "https://www.instagram.com/JMPERSONALIZADOSPE/",

    // ⚠️ PLACEHOLDER — troque pelo endereço real
    endereco: "Rua Principal, 123 — Centro, Pernambuco/PE",
    mapsUrl: "",

    email: "contato@jmarts.com.br",

    horarioResumo: "Seg a Qui 07h–21h · Sex 07h–17h · Sáb 08h–13h",
    horarios: [
      { dia: "Domingo",        hora: "Fechada",   fechado: true  },
      { dia: "Segunda-feira",  hora: "07:00 – 21:00" },
      { dia: "Terça-feira",    hora: "07:00 – 21:00" },
      { dia: "Quarta-feira",   hora: "07:00 – 21:00" },
      { dia: "Quinta-feira",   hora: "07:00 – 21:00" },
      { dia: "Sexta-feira",    hora: "07:00 – 17:00" },
      { dia: "Sábado",         hora: "08:00 – 13:00" }
    ],

    // URL de um endpoint de upload (ex.: /api/upload). Deixe "" para desativar.
    uploadEndpoint: "",

    // Google Analytics 4 / GTM — cole o ID para ativar o rastreamento
    analyticsId: ""
  },

  /* ---------------------------------------------------------------------
     2. ACABAMENTOS (comuns a todos os produtos)
     add = adicional em R$ na quantidade-base do produto
     --------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------
     2. CATÁLOGO DE ACABAMENTOS
     Cada produto declara a lista aplicável em `acab` (id + adicional em R$
     na quantidade-base do produto). Edite à vontade.
     --------------------------------------------------------------------- */
  acabamentos: [
    { id: "nenhum",     nome: "Sem acabamento" },
    { id: "lam-fosca",  nome: "Laminação fosca" },
    { id: "lam-brilho", nome: "Laminação brilhante" },
    { id: "verniz",     nome: "Verniz localizado" },
    { id: "corte",      nome: "Corte especial" },
    { id: "lam-uv",     nome: "Laminação UV" }
  ],

  /* ---------------------------------------------------------------------
     3. PRODUTOS
     preco ....... valor "a partir de" na quantidade-base
     qtdBase ..... quantidade de referência do preço
     elasticidade. quanto o preço total cresce com a quantidade (< 1 = desconto)
     mult ........ multiplicador do material sobre o preço-base
     --------------------------------------------------------------------- */
  produtos: [
    {
      id: "cartoes",
      nome: "Cartões",
      pedido: "Cartão de visita",
      desc: "Cartão de visita, fidelidade e cartões personalizados.",
      img: "assets/img/cartoes.svg",
      cor: "#0A5781",
      preco: 68,
      qtdBase: 100,
      elasticidade: 0.72,
      span: 7,
      ratio: "16 / 10",
      formatos: ["8,5 × 5 cm (padrão)", "9 × 5 cm", "Redondo 7 cm", "Formato especial"],
      acab: [
        { id: "nenhum", add: 0 }, { id: "lam-fosca", add: 32 },
        { id: "lam-brilho", add: 32 }, { id: "verniz", add: 62 }, { id: "corte", add: 48 }
      ],
      quantidades: [100, 250, 500, 1000],
      materiais: [
        { nome: "Couché 300g",   mult: 1.00 },
        { nome: "Supremo 350g",  mult: 1.24 },
        { nome: "Reciclado 300g", mult: 1.12 }
      ]
    },
    {
      id: "adesivos",
      nome: "Adesivos",
      pedido: "Adesivo personalizado",
      desc: "Adesivos recortados, etiquetas e personalizados.",
      img: "assets/img/adesivos.svg",
      cor: "#08ABAC",
      preco: 45,
      qtdBase: 100,
      elasticidade: 0.70,
      span: 5,
      ratio: "4 / 5",
      formatos: ["4 × 4 cm", "Redondo 5 cm", "6 × 3 cm (etiqueta)", "Recorte especial"],
      acab: [
        { id: "nenhum", add: 0 }, { id: "lam-fosca", add: 24 },
        { id: "lam-brilho", add: 24 }, { id: "verniz", add: 45 }, { id: "corte", add: 52 }
      ],
      quantidades: [100, 250, 500, 1000],
      materiais: [
        { nome: "BOPP branco",      mult: 1.00 },
        { nome: "BOPP transparente", mult: 1.16 },
        { nome: "Papel kraft",      mult: 1.06 },
        { nome: "Vinil adesivo",    mult: 1.30 }
      ]
    },
    {
      id: "flyers",
      nome: "Flyers",
      pedido: "Flyer",
      desc: "Materiais promocionais e divulgação.",
      img: "assets/img/flyer.svg",
      cor: "#F06B52",
      preco: 95,
      qtdBase: 100,
      elasticidade: 0.75,
      span: 5,
      ratio: "5 / 6",
      formatos: ["A5 — 14,8 × 21 cm", "A4 — 21 × 29,7 cm", "10 × 15 cm", "Dobra especial"],
      acab: [
        { id: "nenhum", add: 0 }, { id: "lam-fosca", add: 38 },
        { id: "lam-brilho", add: 38 }, { id: "verniz", add: 74 }, { id: "corte", add: 40 }
      ],
      quantidades: [100, 250, 500, 1000],
      materiais: [
        { nome: "Couché fosco 150g",  mult: 1.00 },
        { nome: "Couché brilho 170g", mult: 1.09 },
        { nome: "Reciclado 120g",     mult: 1.14 }
      ]
    },
    {
      id: "banners",
      nome: "Banners",
      pedido: "Banner",
      desc: "Comunicação visual de grande formato.",
      img: "assets/img/banner.svg",
      cor: "#143B4A",
      preco: 75,
      qtdBase: 1,
      elasticidade: 0.90,
      span: 7,
      ratio: "16 / 10",
      formatos: ["Lona 1 × 1 m", "Lona 2 × 1 m", "Roll-up 85 × 200 cm", "Faixa 3 × 1 m"],
      acab: [
        { id: "nenhum", add: 0 }, { id: "lam-uv", add: 30 }, { id: "corte", add: 26 }
      ],
      quantidades: [1, 2, 5, 10],
      materiais: [
        { nome: "Lona 440g",        mult: 1.00 },
        { nome: "Vinil adesivo",    mult: 1.22 },
        { nome: "Tecido sublimado", mult: 1.48 }
      ]
    },
    {
      id: "papelaria",
      nome: "Papelaria",
      pedido: "Papelaria personalizada",
      desc: "Blocos, agendas, calendários e materiais corporativos.",
      img: "assets/img/papelaria.svg",
      cor: "#EEAF5A",
      preco: 120,
      qtdBase: 50,
      elasticidade: 0.72,
      span: 7,
      ratio: "16 / 11",
      formatos: ["Bloco A5", "Agenda 14 × 21 cm", "Calendário 30 × 60 cm", "Conjunto corporativo"],
      acab: [
        { id: "nenhum", add: 0 }, { id: "lam-fosca", add: 44 },
        { id: "verniz", add: 80 }, { id: "corte", add: 56 }
      ],
      quantidades: [50, 100, 250, 500],
      materiais: [
        { nome: "Couché 250g",   mult: 1.00 },
        { nome: "Bond 90g",      mult: 0.88 },
        { nome: "Reciclado 120g", mult: 1.05 },
        { nome: "Cartão kraft 250g", mult: 1.16 }
      ]
    },
    {
      id: "embalagens",
      nome: "Embalagens",
      pedido: "Embalagem personalizada",
      desc: "Sacolas, caixas, tags e materiais personalizados.",
      img: "assets/img/embalagem.svg",
      cor: "#0A5781",
      preco: 150,
      qtdBase: 100,
      elasticidade: 0.76,
      span: 12,
      ratio: "21 / 8",
      formatos: ["Sacola 20 × 25 cm", "Caixa 15 × 15 cm", "Tag 5 × 10 cm", "Formato especial"],
      acab: [
        { id: "nenhum", add: 0 }, { id: "lam-fosca", add: 55 },
        { id: "verniz", add: 95 }, { id: "corte", add: 70 }
      ],
      quantidades: [100, 250, 500, 1000],
      materiais: [
        { nome: "Kraft natural",   mult: 1.00 },
        { nome: "Kraft coating",   mult: 1.14 },
        { nome: "Couché 300g",     mult: 1.22 },
        { nome: "Vinil flexível",  mult: 1.36 }
      ]
    }
  ],

  /* ---------------------------------------------------------------------
     4. COMO FUNCIONA
     --------------------------------------------------------------------- */
  passos: [
    { n: "01", titulo: "Escolha",   texto: "Escolha o produto que você precisa.",           cor: "#0A5781", corTxt: "#0A5781" },
    { n: "02", titulo: "Personalize", texto: "Defina formato, quantidade e acabamento.",     cor: "#08ABAC", corTxt: "#04767A" },
    { n: "03", titulo: "Envie",     texto: "Envie sua arte diretamente pelo site.",         cor: "#F06B52", corTxt: "#C7452F" },
    { n: "04", titulo: "Receba",    texto: "Acompanhe seu pedido e receba o material.",      cor: "#EEAF5A", corTxt: "#B07D1E" }
  ],

  /* ---------------------------------------------------------------------
     5. SERVIÇOS
     --------------------------------------------------------------------- */
  servicos: [
    {
      n: "01",
      titulo: "Design e criação",
      texto: "Não tem arte? Nossa equipe cria a identidade, a composição e a arte-final do zero.",
      cor: "#0A5781"
    },
    {
      n: "02",
      titulo: "Impressão digital e offset",
      texto: "Do tiragem curta ao volume alto, com perfil de cor calibrado e prova antes de fechar.",
      cor: "#08ABAC"
    },
    {
      n: "03",
      titulo: "Acabamentos especiais",
      texto: "Laminação, verniz localizado, hot stamping, corte especial, relevo e dobra.",
      cor: "#F06B52"
    },
    {
      n: "04",
      titulo: "Entrega e acompanhamento",
      texto: "Acompanhamento humano do orçamento até a entrega, com status pelo WhatsApp.",
      cor: "#EEAF5A"
    }
  ],

  /* ---------------------------------------------------------------------
     6. DIFERENCIAIS
     --------------------------------------------------------------------- */
  diferenciais: [
    { titulo: "Qualidade",         texto: "Materiais e acabamentos selecionados.",        cor: "#0A5781", corTxt: "#FFFFFF" },
    { titulo: "Agilidade",         texto: "Processo simples e acompanhamento do pedido.", cor: "#08ABAC", corTxt: "#0A2A33" },
    { titulo: "Personalização",    texto: "Seu projeto do jeito que você imaginou.",      cor: "#F06B52", corTxt: "#0A2A33" },
    { titulo: "Atendimento humano", texto: "Do orçamento à entrega, sempre com gente falando com você.", cor: "#EEAF5A", corTxt: "#143B4A" }
  ],

  /* ---------------------------------------------------------------------
     7. PORTFÓLIO
     --------------------------------------------------------------------- */
  portfolio: [
    { titulo: "Café Serra Alta",  cat: "Identidade visual",      img: "assets/img/cartoes.svg",    cor: "#0A5781", ratio: "4 / 5"  },
    { titulo: "Ateliê Nordeste",  cat: "Embalagens",             img: "assets/img/embalagem.svg",  cor: "#EEAF5A", ratio: "4 / 3"  },
    { titulo: "Grupo Vertta",     cat: "Papelaria corporativa",  img: "assets/img/papelaria.svg",  cor: "#08ABAC", ratio: "1 / 1"  },
    { titulo: "Linha Organic",    cat: "Adesivos",               img: "assets/img/adesivos.svg",   cor: "#F06B52", ratio: "4 / 3"  },
    { titulo: "Feira Viva",       cat: "Materiais promocionais", img: "assets/img/flyer.svg",      cor: "#143B4A", ratio: "3 / 4"  },
    { titulo: "Studio Lume",      cat: "Comunicação visual",     img: "assets/img/banner.svg",     cor: "#08ABAC", ratio: "4 / 5"  },
    { titulo: "Doces da Vó",      cat: "Embalagens",             img: "assets/img/embalagem.svg",  cor: "#0A5781", ratio: "1 / 1"  },
    { titulo: "Lume Barbearia",   cat: "Cartões",                img: "assets/img/cartoes.svg",    cor: "#F06B52", ratio: "4 / 3"  }
  ],

  /* ---------------------------------------------------------------------
     8. SOBRE / NÚMEROS
     --------------------------------------------------------------------- */
  numeros: [
    { valor: "8+",   label: "anos de gráfica" },
    { valor: "4.2k", label: "pedidos entregues" },
    { valor: "98%",  label: "clientes que voltam" },
    { valor: "24h",  label: "orçamento no WhatsApp" }
  ]
};
