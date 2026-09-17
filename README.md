# Site · Dra. Claudia Cogo

Site institucional do consultório da Dra. Claudia Cogo, especialista em Clínica Médica
(RQE 10497) e Medicina Intensiva (RQE 10498), CRM-ES 10090, com pós-graduação em
Geriatria pelo Hospital Israelita Albert Einstein (SP).
Construído conforme `docs/briefing.md`, seguindo a identidade visual oficial
(`assets/logo/identidade-visual.webp`): oliva escuro, creme, taupe e dourado,
com a tagline **Saúde · Prevenção · Longevidade**.

## Visualizar o site

Basta abrir `index.html` no navegador, ou rodar um servidor local:

```
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.

## Estrutura

```
claudia-cogo-geriatria/
├── index.html           # Home (hero, serviços, mini-bio, CTA)
├── sobre.html           # Trajetória e filosofia de cuidado
├── servicos.html        # Serviços, "Cinco medidas, uma página", FAQ antes de marcar
├── acompanhamentos.html # Acompanhamentos Especiais: cirurgião, internação, RECOMEÇO, VIGOR
├── metodo.html          # RECOMEÇO 90 (doze semanas de construção)
├── recomeco-120.html    # RECOMEÇO 120 (construção e um mês de consolidação)
├── recomeco-180.html    # RECOMEÇO 180 (construção e consolidação até seis meses)
├── recomeco-30.html     # Redirecionamento (programa retirado)
├── recomeco-60.html     # Redirecionamento (programa retirado)
├── vigor.html           # Programa VIGOR
├── para-medicos.html    # Carta aos colegas médicos
├── acompanhamento-hospitalar.html
├── depoimentos.html     # Oculta (noindex) até haver depoimentos reais
├── contato.html         # WhatsApp, telefone, mapa, formulário
├── css/style.css        # Design system da marca (mobile-first, WCAG AA)
├── js/main.js           # Menu, formulário→WhatsApp, carrossel, links wa.me
├── assets/
│   ├── images/claudia-retrato.webp    # Foto profissional (recebida)
│   └── logo/identidade-visual.webp    # Prancha da identidade (referência)
└── docs/briefing.md     # Especificação completa
```

## Telefone único

O site usa **um único número**, o do consultório: (27) 99620-5757
(`https://wa.me/5527996205757` e `tel:+5527996205757`). Todos os botões de
WhatsApp são preenchidos pelo `js/main.js` a partir de `CONFIG.whatsapp`; os
`href` estáticos no HTML repetem o mesmo número como fallback sem JavaScript.
Nenhum outro número entra em texto, link, JSON-LD, alt ou comentário.

## Linha de cuidado RECOMEÇO e política de oferta

RECOMEÇO 90 · 120 · 180 são três durações de uma mesma linha de cuidado (ver
`CLAUDE.md`). O site **não publica preço nem oferta de programa**: a médica indica o
programa na consulta, por critério clínico, e a proposta sai por escrito, pelo
consultório.

## Pendências de conteúdo (TODO)

Todos os placeholders estão marcados no código com `<!-- TODO: ... -->`.

| Item | Onde substituir | Status |
|---|---|---|
| Foto profissional | `assets/images/claudia-retrato.webp` | ✅ recebida e aplicada |
| Identidade visual | `assets/logo/identidade-visual.webp` | ✅ recebida (logo recriado em HTML/CSS; falta SVG/PNG isolado) |
| Número de WhatsApp | `js/main.js` (`CONFIG.whatsapp`) + `href` estáticos | ⬜ pendente |
| CRM / RQE | `sobre.html` (hero) + rodapé de todas as páginas + badge no hero da home | ⬜ pendente |
| Nome completo | rodapé de todas as páginas | ⬜ pendente |
| Telefone | `contato.html` + rodapés (`tel:+55...`) | ⬜ pendente |
| E-mail | `contato.html` + rodapés (`mailto:`) | ⬜ pendente |
| Endereço do consultório | `contato.html` + rodapés + JSON-LD em `index.html` | ⬜ pendente |
| Mapa (Google Maps embed) | `contato.html` (bloco `map-placeholder`, instruções no comentário) | ⬜ pendente |
| Horários de atendimento | `contato.html` | ⬜ pendente |
| Convênios / particular | `contato.html` | ⬜ pendente |
| Instagram (@) | rodapé de todas as páginas (`href="#"`) | ⬜ pendente |
| Lista final de serviços | `servicos.html` (paliativos, domiciliar e telemedicina aguardam confirmação) | ⬜ pendente |
| Depoimentos reais | `depoimentos.html` + carrossel em `index.html` (textos atuais são ilustrativos) | ⬜ pendente |
| Domínio real | `<link rel="canonical">` e `og:url` em todas as páginas | ⬜ pendente |
| Formação/experiência | `sobre.html` (cards de trajetória) | ⬜ pendente |

## Notas técnicas

- **Stack:** HTML + CSS + JS puro, sem build. Funciona abrindo `index.html`
  direto ou em qualquer hospedagem estática.
- **Acessibilidade:** corpo com 18px, contraste AA, alvos de toque ≥ 56px,
  HTML semântico, navegação por teclado, `skip-link`, `prefers-reduced-motion`.
- **SEO:** title/description por página, Open Graph, JSON-LD `Physician`
  na home (atualizar com endereço/telefone reais).
- **Formulário de contato:** não envia dados a servidor, abre o WhatsApp com
  a mensagem preenchida.
- **Fontes:** Cormorant Garamond (títulos) + Inter (corpo), via Google Fonts.
- **Logo:** recriado em HTML/CSS (monograma SVG + tipografia) usando a prancha
  como referência, até a cliente enviar o arquivo isolado.
