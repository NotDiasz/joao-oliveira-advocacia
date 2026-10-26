# Site João Oliveira Advocacia — especificação (versão de apresentação)

_Escrito em 2026-10-26 pelo Claude (coordenador). Fonte de verdade para quem constrói._

## Intenção

Site institucional do advogado **João Victor Martins de Oliveira** (Curitiba, OAB/PR,
Instagram @joaooliveira.adv). Esta primeira versão serve para **apresentar ao cliente**:
precisa impressionar visualmente e funcionar de verdade, mas dados de contato ficam como
campos a preencher.

Posicionamento: advogado técnico, sóbrio, premium, "Old Money". Público amplo, de 30 a 70
anos, sem persona: texto claro, sem juridiquês, fonte confortável, contato fácil de achar.

Quatro áreas com **o mesmo peso** (nenhuma em destaque):

1. Direito Previdenciário (`previdenciario`): INSS, aposentadorias, benefícios, servidor público/RPPS.
2. Direito Médico e da Saúde (`saude`): planos de saúde, acesso a tratamento, erro médico.
3. Direito Criminal (`criminal`): defesa em inquérito e processo penal.
4. Prerrogativas do Advogado (`prerrogativas`): defesa de advogados com garantias violadas.

## Referência visual (decidida pelo Miguel)

https://about-victor.netlify.app/ — o que copiar é o **comportamento**, não a cara:

- Pouca coisa por tela: fundo liso, **título enorme à esquerda, um objeto à direita**, muito vazio.
- Cada bloco de manifesto **prende a tela (pin)**; as linhas do título "acendem" de ~18% de
  opacidade para cor cheia conforme o scroll (scrub), uma linha de cada vez.
- Objetos à direita com movimento lento (flutuar, girar levemente) acompanhando o scroll.
- **A seção de marca ("Foundry")**: logo parado no centro com uma palavra gigante só em
  contorno passando atrás; **faixas diagonais** varrem a tela trocando a cor de fundo pela
  paleta, e o logo **inverte de cor** do lado da faixa; etiqueta pequena embaixo à esquerda
  com nome e HEX da cor; linha de progresso no topo; **zoom para dentro do logo** até ele
  virar a próxima tela.
- **Carrossel 3D de cartões** empilhados em perspectiva, avançando com o scroll, contador
  "01 / 04" com linha de progresso.
- Etiquetas pequenas espaçadas no formato `(01) — ÁREAS` e colchetes `[ O MÉTODO ]`.
- Navegação em pílula no canto superior direito, monograma no canto superior esquerdo,
  ícones sociais na vertical à esquerda, indicador "role" embaixo à direita.

## Anti-objetivos (o Miguel rejeitou explicitamente)

- Nada de "cara de IA": **sem listras, quadriculado, grid decorativo, neon, glow**,
  glassmorphism, gradiente como enfeite, partículas, blobs.
- Nada de balança da justiça, martelo, pilares gregos, clip-art.
- Nada de movimento saltitante/elástico. Movimento é lento e com peso
  (0,8–1,4 s, `power3.out`/`expo.out`, nunca `back`/`elastic`).
- Não citar congressos, eventos ou "advogado de bairro".

## Identidade (já pronta em `brand/`)

- `brand/tokens.css`: paleta e fontes. `brand/logo/*.svg`: monograma, assinatura e lockup
  em 5 variações de cor, texto em curvas. `brand/logo/favicon*`. `brand/brand-kit.html`: manual.
- Paleta: marfim `#F2ECE1`, verde inglês `#1E2B23`, couro `#7A5C33`, latão `#D6BE8E`,
  bordô `#5E1E2A`. **Base do site escura**: acrescente `--color-tinta: #0E1511`
  (verde inglês quase preto) como fundo padrão. Seções em marfim entram como contraste
  (a seção de marca começa em marfim, como o "papel" da referência).
- Tipografia: **Bodoni Moda** (títulos, enorme, pode ser caixa alta nos manifestos),
  **Pinyon Script** (acentos curtos: "Advocacia", uma palavra de um título), **Montserrat**
  (texto e etiquetas espaçadas). Texto corrido mínimo 17px no desktop, 16px no celular.
- Fotos: `brand/fotos/joao-retrato.png` (retrato de terno, fundo cinza) e
  `brand/fotos/joao-tribunal.png` (de toga, em sessão). Mídia gerada (objetos e recorte do
  retrato) chega em `public/media/` por outro trabalhador — ver "Contrato de mídia".

## Stack

- **Astro 5** + **React** (`@astrojs/react`) só nas ilhas animadas; TypeScript; npm.
- **GSAP 3** com ScrollTrigger (e SplitText, que é gratuito desde a 3.13) + **Lenis**
  (scroll suave sincronizado com o ticker do GSAP).
- CSS próprio a partir de `brand/tokens.css` (copiar para `src/styles/`). Sem Tailwind.
- Fontes via `@fontsource` (self-host) ou Google Fonts com `display=swap`.
- Imagens por `astro:assets` (webp/avif, tamanhos responsivos).
- Transição entre páginas: View Transitions do Astro (`<ClientRouter />`) com uma cortina
  marfim que sobe; animações GSAP precisam reiniciar a cada navegação (`astro:page-load`)
  e limpar no `astro:before-swap`.

## Home — seções em ordem

0. **Abertura (preloader)**: fundo tinta, o monograma se desenha em traço de latão
   (~1,2 s), preenche, e a tela sobe como cortina. No máximo 1,8 s. Só na primeira visita da
   sessão (`sessionStorage`).
1. **Hero** (100vh): à esquerda, "Advocacia" em Pinyon Script (latão) e, abaixo,
   **"João Oliveira"** enorme em Bodoni (marfim), depois a linha
   "Previdenciário · Saúde · Criminal · Prerrogativas" em etiqueta espaçada e o botão
   "Agendar consulta" (WhatsApp). À direita, o retrato recortado (`joao-recorte`) com uma
   luz quente e suave atrás (radial em couro/latão, baixa opacidade — não é glow).
   Entrada: linhas do título sobem por máscara. Scroll: retrato sobe mais devagar (parallax).
2. **Manifesto 1** (pin + scrub, padrão "Constância importa"):
   título `RIGOR TÉCNICO.` · texto: "Cada caso começa pelo estudo: a lei, os documentos, a
   jurisprudência. A estratégia vem depois, explicada em linguagem que você entende." ·
   etiqueta `[ O MÉTODO ]` · objeto: `livro`.
3. **Manifesto 2**: título `ATENÇÃO PESSOAL.` · texto: "Você fala diretamente com o
   advogado responsável pelo seu caso, do primeiro contato à última decisão." · etiqueta
   `[ O COMPROMISSO ]` · objeto: `caneta`.
4. **A marca** (o "Foundry", ~400vh, pin): estágio A fundo marfim, monograma JO grande no
   centro (verde), atrás dele `JOÃO OLIVEIRA — ADVOCACIA —` gigante só em contorno correndo
   na horizontal com o scroll; rodapé com três etiquetas: `(02) — A MARCA`,
   `JOÃO OLIVEIRA`, `ADVOCACIA · CURITIBA`. Estágio B: faixas diagonais (`clip-path:
   polygon`) varrem verde inglês → bordô → latão → tinta; duas camadas do monograma, a de
   cima recortada pelo mesmo polígono, para inverter a cor onde a faixa passa; etiqueta
   embaixo à esquerda troca (`VERDE INGLÊS · #1E2B23` etc.); linha de progresso no topo.
   Estágio C: zoom para dentro do monograma (escala grande, origem no miolo do "O") até a
   cor tomar a tela e virar o fundo da seção de áreas.
5. **Áreas** (`(03) — ATUAÇÃO`, título `QUATRO FRENTES.`): carrossel 3D de 4 cartões
   altos empilhados em perspectiva, avançando com o scroll (pin), contador `01 / 04` com
   linha. Cada cartão: numeral romano (Bodoni itálico, latão), nome da área, três situações
   comuns, link "Conhecer a área →" para `/atuacao/<slug>`. Cartões alternam verde inglês e
   bordô, com filete duplo de latão. No celular: deslizar na horizontal (scroll-snap).
6. **O advogado** (`(04) — O ADVOGADO`): foto com revelação por cortina bordô (clip-path);
   nome completo; texto curto com campos a preencher; a assinatura (`brand/logo/assinatura-*`)
   revelada da esquerda para a direita por máscara.
7. **Atendimento** (`(05) — COMO FUNCIONA`): 4 etapas — Primeira conversa · Análise ·
   Estratégia · Acompanhamento — ligadas por uma linha de latão que se desenha com o scroll.
8. **Dúvidas frequentes**: 5 perguntas em acordeão acessível (`<details>` ou botão com
   `aria-expanded`), respostas genéricas e seguras.
9. **Contato** (fundo bordô): "Vamos conversar sobre *o seu caso*." (Pinyon na parte em
   itálico); o lacre (`lacre`) entra com efeito de carimbo (escala 1,3→1, leve giro,
   sombra assentando); botões WhatsApp e e-mail; endereço.
10. **Rodapé**: lockup, links das áreas, OAB/PR nº, ano.

## Páginas `/atuacao/<slug>` (4, um template)

Dados num arquivo (`src/data/areas.ts`): hero com numeral romano enorme e nome; parágrafo de
introdução; "Quando procurar" (5 situações); "Como atuo" (3 pontos); 3 perguntas
frequentes da área; CTA de contato; links para as outras três áreas. Mesmo vocabulário
visual da home, com reveals simples (sem o show da marca).

## Conteúdo e ética (OAB, Provimento 205/2021)

Sem prometer resultado, sem preço, sem "melhor/maior", sem número de casos ganhos, sem
depoimentos, sem captação mercantil. Linguagem informativa. Português do Brasil.

Campos a preencher ficam **num único arquivo** `src/data/site.ts`, visíveis no site entre
colchetes: `[OAB/PR nº]`, `[WhatsApp]`, `[e-mail]`, `[endereço]`, `[Instagram]` (este já é
`@joaooliveira.adv`). O botão de WhatsApp monta `https://wa.me/<numero>` a partir do
campo; com o placeholder, aponta para `#contato`.

## Contrato de mídia (`public/media/`)

Outro trabalhador gera estes arquivos; quem constrói o site referencia exatamente estes
caminhos e, enquanto não existirem, usa um placeholder neutro (retângulo tinta) — nunca
uma imagem inventada.

- `public/media/joao-recorte.webp` (retrato sem fundo, transparente) e `joao-recorte.png`
- `public/media/objetos/livro.webp`, `caneta.webp`, `lacre.webp`, `sinete.webp`
  (PNG/WebP transparente, objeto isolado, ~1600 px no lado maior)

## Movimento e acessibilidade

- `prefers-reduced-motion`: sem Lenis, sem pin/scrub; tudo aparece estático e legível.
- Celular: pins mais curtos ou trocados por reveals simples; nada de scroll travado longo.
- Contraste AA, foco visível, `alt` em toda imagem, títulos em ordem, navegação por teclado.
- SEO: `title`/`description` por página, Open Graph, JSON-LD `Attorney` com os campos do
  `site.ts`, `sitemap`, favicon de `brand/logo/`.

## Critério de pronto

- `npm run build` sem erro e sem aviso de tipo.
- Capturas em 1440×900 e 390×844 de cada seção da home e de uma página de área, sem
  quebra de layout nem rolagem horizontal; console sem erro.
- Lighthouse mobile: performance ≥ 85, acessibilidade ≥ 95.
