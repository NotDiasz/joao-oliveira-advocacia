/** Preencha os dados abaixo para publicar a versão definitiva. */
export const site = {
  name: "João Oliveira",
  fullName: "João Victor Martins de Oliveira",
  profession: "Advocacia",
  city: "Curitiba",
  state: "PR",
  oab: "[OAB/PR nº]",
  whatsapp: "[WhatsApp]",
  email: "[e-mail]",
  address: "[endereço]",
  instagram: "@joaooliveira.adv",
  instagramUrl: "https://www.instagram.com/joaooliveira.adv/",
  description:
    "Advocacia em Curitiba. Atuação em Direito Previdenciário, Médico e da Saúde, Criminal e Prerrogativas do Advogado. Rigor técnico e atenção pessoal.",
  /** URL definitiva do site, quando disponível. */
  url: "",
};

export const whatsappUrl = /^\+?[\d\s()-]{10,}$/.test(site.whatsapp)
  ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`
  : "#contato";
export const emailUrl = site.email.includes("@")
  ? `mailto:${site.email}`
  : "#contato";

export const homeFaqs = [
  {
    question: "Como funciona a primeira conversa?",
    answer:
      "É o momento de entender a sua situação, esclarecer as dúvidas iniciais e identificar os documentos necessários. A partir disso, é possível avaliar os próximos passos.",
  },
  {
    question: "O atendimento pode ser realizado a distância?",
    answer:
      "Sim. A conversa e o envio de documentos podem ser realizados por meios digitais. Quando necessário, o atendimento presencial é combinado previamente.",
  },
  {
    question: "Quais documentos preciso apresentar?",
    answer:
      "Isso depende da área e da situação. Em geral, documentos pessoais e os registros relacionados ao caso ajudam na análise inicial. A orientação específica é dada no primeiro contato.",
  },
  {
    question: "É possível saber o resultado do meu caso?",
    answer:
      "Cada caso exige uma análise individual. O advogado pode explicar os caminhos jurídicos, os riscos e as possibilidades, mas não pode garantir um resultado.",
  },
  {
    question: "Como acompanho o andamento?",
    answer:
      "As informações relevantes e os próximos passos são comunicados ao longo do atendimento. O canal de contato e a forma de acompanhamento são combinados diretamente com o advogado.",
  },
];
