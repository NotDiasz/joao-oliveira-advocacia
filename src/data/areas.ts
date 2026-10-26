export interface Area {
  slug: string;
  numeral: string;
  name: string;
  shortName: string;
  intro: string;
  situations: string[];
  approach: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
}

export const areas: Area[] = [
  {
    slug: "previdenciario",
    numeral: "I",
    name: "Direito Previdenciário",
    shortName: "Previdenciário",
    intro:
      "Direitos que acompanham a sua trajetória. Orientação e atuação em aposentadorias, benefícios do INSS e questões previdenciárias de servidores públicos, com análise cuidadosa de cada história de contribuição.",
    situations: [
      "Planejamento e requerimento de aposentadoria.",
      "Benefício negado, suspenso ou cessado pelo INSS.",
      "Dúvidas sobre tempo de contribuição e vínculos de trabalho.",
      "Benefícios por incapacidade e pensão por morte.",
      "Aposentadoria de servidor público e questões do RPPS.",
    ],
    approach: [
      {
        title: "Entender a sua trajetória",
        text: "Levantamento dos vínculos, contribuições e documentos que ajudam a compreender a sua situação previdenciária.",
      },
      {
        title: "Avaliar os caminhos",
        text: "Análise das regras aplicáveis, dos requisitos e das alternativas administrativas ou judiciais.",
      },
      {
        title: "Acompanhar cada etapa",
        text: "Preparação do requerimento ou da medida adequada e comunicação sobre o andamento e os próximos passos.",
      },
    ],
    faqs: [
      {
        question: "Preciso estar perto de me aposentar para buscar orientação?",
        answer:
          "A orientação pode ser útil antes disso. A análise do histórico de contribuições permite identificar pendências e compreender quais regras podem se aplicar à sua situação.",
      },
      {
        question: "Meu benefício foi negado. O que pode ser feito?",
        answer:
          "É necessário examinar a decisão, os documentos e os requisitos do benefício. A partir dessa análise, podem ser avaliados um novo pedido, um recurso ou uma medida judicial.",
      },
      {
        question: "Servidor público também pode buscar orientação?",
        answer:
          "Sim. A análise considera o regime próprio, a legislação do ente público e as características do vínculo. As regras podem variar conforme o caso.",
      },
    ],
  },
  {
    slug: "saude",
    numeral: "II",
    name: "Direito Médico e da Saúde",
    shortName: "Médico e da Saúde",
    intro:
      "O cuidado também passa pelo direito. Atuação em questões que envolvem planos de saúde, acesso a tratamentos e responsabilidade na assistência, com atenção às circunstâncias médicas e jurídicas do caso.",
    situations: [
      "Negativa de cobertura por plano de saúde.",
      "Dificuldade de acesso a tratamento, exame ou medicamento.",
      "Cancelamento ou alteração de contrato de assistência à saúde.",
      "Dúvidas sobre possível falha na prestação de atendimento médico.",
      "Necessidade de orientação jurídica em uma situação de saúde.",
    ],
    approach: [
      {
        title: "Acolher e compreender",
        text: "Escuta da situação e análise dos documentos médicos, da negativa e das condições contratuais disponíveis.",
      },
      {
        title: "Examinar a urgência",
        text: "Avaliação dos prazos, da necessidade do tratamento e dos caminhos jurídicos adequados ao caso concreto.",
      },
      {
        title: "Atuar com clareza",
        text: "Orientação sobre as medidas possíveis e acompanhamento do procedimento, sem promessas de resultado.",
      },
    ],
    faqs: [
      {
        question: "O que guardar quando há negativa de cobertura?",
        answer:
          "Sempre que possível, guarde a negativa por escrito, o pedido médico, relatórios, protocolos de atendimento e o contrato do plano. Esses registros ajudam na análise.",
      },
      {
        question: "Toda complicação em tratamento é erro médico?",
        answer:
          "Não. A existência de responsabilidade depende da análise técnica dos fatos, dos registros e das circunstâncias do atendimento. Um resultado indesejado, por si só, não permite concluir que houve erro.",
      },
      {
        question: "Casos urgentes podem ser avaliados?",
        answer:
          "A urgência deve ser comunicada desde o primeiro contato, com os documentos disponíveis. As medidas possíveis dependem da análise individual e das condições do caso.",
      },
    ],
  },
  {
    slug: "criminal",
    numeral: "III",
    name: "Direito Criminal",
    shortName: "Criminal",
    intro:
      "Defesa exige presença, preparo e responsabilidade. Atuação em investigações e processos penais, com respeito às garantias individuais e orientação clara em momentos que pedem cuidado.",
    situations: [
      "Intimação para prestar depoimento.",
      "Investigação ou inquérito policial em andamento.",
      "Necessidade de defesa em processo penal.",
      "Prisão ou discussão sobre medidas cautelares.",
      "Dúvidas sobre direitos e garantias na esfera criminal.",
    ],
    approach: [
      {
        title: "Conhecer os fatos",
        text: "Conversa reservada e exame dos elementos disponíveis para compreender o contexto da investigação ou do processo.",
      },
      {
        title: "Preparar a defesa",
        text: "Estudo das provas, da legislação e das medidas cabíveis, com explicação dos riscos e das etapas.",
      },
      {
        title: "Estar presente",
        text: "Acompanhamento dos atos pertinentes e comunicação com o cliente sobre as decisões e o andamento.",
      },
    ],
    faqs: [
      {
        question: "Recebi uma intimação. Como proceder?",
        answer:
          "Confira o órgão, a data e a finalidade do ato e procure orientação antes do comparecimento. Guarde a intimação e os documentos relacionados à situação.",
      },
      {
        question: "É possível ter advogado durante a investigação?",
        answer:
          "Sim. A orientação jurídica pode começar na fase de investigação, antes de eventual processo, respeitados os direitos e as condições de acesso aos elementos do procedimento.",
      },
      {
        question: "As informações compartilhadas são sigilosas?",
        answer:
          "O atendimento jurídico está sujeito ao sigilo profissional, conforme as regras aplicáveis à advocacia. As informações são tratadas com a reserva que a atividade exige.",
      },
    ],
  },
  {
    slug: "prerrogativas",
    numeral: "IV",
    name: "Prerrogativas do Advogado",
    shortName: "Prerrogativas",
    intro:
      "Defender a advocacia é defender o exercício da defesa. Orientação e atuação diante de situações que afetam as garantias profissionais do advogado e o desempenho regular de sua atividade.",
    situations: [
      "Restrição ao acesso a autos e elementos documentados.",
      "Impedimento de comunicação reservada com o cliente.",
      "Limitação indevida ao exercício da atividade profissional.",
      "Desrespeito às garantias do advogado em atos e diligências.",
      "Necessidade de orientação para registrar e encaminhar uma violação.",
    ],
    approach: [
      {
        title: "Registrar o ocorrido",
        text: "Organização dos fatos, documentos, registros e circunstâncias relevantes para compreender a possível violação.",
      },
      {
        title: "Identificar a garantia",
        text: "Análise das prerrogativas envolvidas e dos meios institucionais e jurídicos adequados à situação.",
      },
      {
        title: "Encaminhar a atuação",
        text: "Definição e acompanhamento das providências cabíveis, com atenção aos prazos e ao exercício profissional.",
      },
    ],
    faqs: [
      {
        question: "O que fazer diante de uma possível violação?",
        answer:
          "Sempre que possível, preserve os registros do ocorrido, identifique os envolvidos e procure orientação. O acionamento dos canais da OAB pode ser avaliado conforme a situação.",
      },
      {
        question: "Prerrogativas são privilégios pessoais?",
        answer:
          "As prerrogativas são garantias do exercício profissional e da defesa dos direitos do cliente. Sua aplicação deve ser examinada à luz da legislação e das circunstâncias concretas.",
      },
      {
        question: "É necessário reunir provas antes de buscar orientação?",
        answer:
          "Você pode buscar orientação com as informações disponíveis. Documentos, protocolos e registros ajudam, mas a necessidade de outros elementos será avaliada durante a análise.",
      },
    ],
  },
];
