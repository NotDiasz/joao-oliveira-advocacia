# João Oliveira · Advocacia

Versão de apresentação em Astro 5, React, TypeScript e CSS próprio. As animações usam GSAP, ScrollTrigger, SplitText e Lenis.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` verifica os tipos antes de gerar as cinco páginas estáticas em `dist/`.

Os campos de contato, OAB, Instagram e URL definitiva estão em `src/data/site.ts`. Enquanto o WhatsApp e o e-mail forem placeholders, os botões levam à seção de contato. Preencha também `url` antes da publicação para gerar canonical, Open Graph e sitemap com o domínio correto.

O conteúdo das quatro áreas está em `src/data/areas.ts`. A página `src/pages/atuacao/[slug].astro` gera todas elas a partir desses dados.

As imagens contratadas ficam em `public/media/`. O componente `Media.astro` importa as disponíveis, gera versões responsivas por `astro:assets` e usa um bloco neutro quando o arquivo está ausente. A marca original em `brand/` é preservada e os SVGs são inseridos inline para permitir o recorte das camadas.

O ciclo de movimento está em `src/scripts/motion.ts`: inicialização em `astro:page-load`, limpeza em `astro:before-swap`, scroll suave no ticker do GSAP e nenhum pin ou Lenis com movimento reduzido. No celular, as áreas usam scroll-snap; no desktop, a ilha React controla os cartões em perspectiva e os botões de navegação.
