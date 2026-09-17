# Site · Dra. Claudia Cogo

Instruções para qualquer sessão do Claude que for trabalhar neste repositório.
Leia antes de editar qualquer arquivo.

## O projeto

Site institucional da **Dra. Claudia Cogo**, no ar em **www.claudiacogo.com.br**.
Direção de design e decisões finais: **Bruno Ambrosin** (interlocutor deste repositório).

Público: pessoas a partir dos 50 anos e, principalmente, **filhos e familiares adultos**
que pesquisam e agendam pelos pais. Tom desejado: elegante, sóbrio, acolhedor,
**pouco comercial**. Um convite por tela, nunca uma vitrine de ofertas.

## Regras inegociáveis de texto

1. **NUNCA use travessões (—) em lugar nenhum**, nem em prosa, nem em títulos, nem
   em atributos. Bruno considera o travessão uma marca de texto gerado por IA.
   Use vírgula, dois pontos, parênteses ou reescreva a frase. Para separadores
   técnicos e visuais use o ponto médio (·).
2. **Credenciais, sempre nesta forma:**
   Especialista em Clínica Médica (RQE 10497) e Medicina Intensiva (RQE 10498) ·
   CRM-ES 10090. Pós-graduação em Geriatria pelo Hospital Israelita Albert Einstein (SP).
   Os RQEs **sempre** acompanham a palavra "Especialista" (Art. 4º, II da Resolução
   CFM 2.336/2023). Ela **não tem RQE em Geriatria**: a formação nessa área aparece
   apenas na forma "Pós-graduação em Geriatria pelo Hospital Israelita Albert Einstein",
   sempre com o Einstein citado junto. Nenhuma outra forma de associar a médica à
   Geriatria é permitida, nem como substantivo, nem como adjetivo, nem como
   especialidade. A palavra Geriatria também aparece como nome de procedimento
   (Avaliação Geriátrica Ampla, a AGA; nunca "Integral"; o antigo nome AGI não é mais
   usado). Sem RQE na área, também não se anuncia que ela **trata** doenças próprias
   da especialidade: descreva procedimentos e cuidados, não titulação.
   Uma antiga ressalva de "não especialista" foi retirada do site por decisão do
   cliente em 12/08/2026, tomada com ciência da Resolução. **Não reintroduza sem
   pedido dele.**
3. **Conformidade CFM:** nenhuma promessa de resultado, nenhuma garantia de cura,
   nenhum preço, nenhum "antes e depois" de paciente. Linguagem de risco sempre
   como "está associado a", "aumenta o risco", "estudos sugerem". Programas são
   "linha de cuidado", indicados pela médica na consulta, por critério clínico; a
   proposta sai por escrito, pelo consultório. **Sem preço, sem oferta de programa
   no site:** nada de "compra", "venda", "pacote", "upgrade", "produto", "a partir
   de", botão de comprar.
5. **Telefone único em todo o site:** o do consultório, **(27) 99620-5757**
   (`https://wa.me/5527996205757` e `tel:+5527996205757`). Nenhum outro número em
   texto, link, JSON-LD, alt, comentário HTML, README ou docs. O número pessoal da
   médica só circula na carta impressa para colegas, nunca no site.
6. **Frases oficiais da marca:** gancho "Minha mãe, como sempre conheci." (abre o hero
   da home; pode alternar com "Meu pai, como sempre conheci." em outra página, nunca
   as duas juntas); linha de método "Reconquistando a independência, com metas
   medidas a cada 30 dias." (classe `.linha-metodo`: sob o gancho no hero, sob o nome
   de cada programa nos cards e no rodapé, sob a marca); tagline
   "Saúde · Prevenção · Longevidade" (com o logo, no hero e no rodapé).
4. **Autoridade a reforçar sempre:** a técnica de quem **ainda vive a Medicina
   Intensiva**, lidando diariamente com pacientes graves de alta complexidade,
   agora disponível no consultório. 17 anos de medicina. Preceptora e professora
   universitária há três anos. Mãe de três filhos.

## Identidade visual

Tokens oficiais já definidos em `css/style.css` (`:root`). Use sempre as variáveis,
nunca hex solto:

| Token | Cor | Uso |
|---|---|---|
| `--olive` | `#47462b` | Texto principal, faixas escuras |
| `--sand` | `#eaddca` | Fundos de seção alternados |
| `--cream` | `#f7f2eb` | Fundo base |
| `--taupe` | `#7f695b` | Texto secundário |
| `--gold` | `#d7be99` | Detalhes, filetes, destaques em fundo escuro |
| `--gold-deep` | `#8c6239` | Destaques em fundo claro, eyebrows |

- Tipografia: **Noto Serif Display** (títulos) e **Montserrat** (corpo).
- Logos em `assets/logo/`: `logo-horizontal-escura.png` no cabeçalho,
  `logo-horizontal-clara.png` no rodapé, símbolo em marca d'água nas seções.
- Cantos assimétricos (`border-radius: 26px 26px 26px 8px`) são assinatura da marca.
- Fotos da Dra. Claudia em `assets/images/`, com animação `.flutua` e `.reveal`
  ao rolar a página.

## Stack e publicação

- HTML, CSS e JavaScript puros. Sem frameworks, sem build step.
- Mobile-first, WCAG AA, corpo com no mínimo 18px, alvos de toque de 56px.
- **Publicação automática:** todo push na branch `main` dispara o workflow
  `.github/workflows/pages.yml` e o site atualiza sozinho em um ou dois minutos.
- Domínio, DNS e certificado HTTPS **já estão resolvidos e funcionando**.
  Não mexa em `CNAME`, DNS ou configurações de Pages sem pedido explícito.
- Para conferir o resultado antes do push: `python3 -m http.server 8788` e
  captura de tela com Playwright (`/opt/pw-browsers/chromium`).

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home |
| `sobre.html` | Trajetória, formação, missão e valores |
| `servicos.html` | Serviços, trio Consultório · Domicílio · Telemedicina no topo, bloco "Cinco medidas, uma página" no card da consulta, seção da AGA (`#agi`, id histórico), FAQ "Antes de marcar" (`#perguntas`) antes do agendamento |
| `acompanhamentos.html` | Aba **Acompanhamentos Especiais**: cirurgião, internação, RECOMEÇO 90 · 120 · 180 e VIGOR |
| `metodo.html` | **RECOMEÇO 90** (URL histórica mantida): doze semanas de construção, bloco "Cinco medidas, uma página" antes de "Como funciona" |
| `recomeco-120.html` | RECOMEÇO 120: construção e um mês de consolidação |
| `recomeco-180.html` | RECOMEÇO 180: construção e consolidação até seis meses |
| `recomeco-30.html`, `recomeco-60.html` | **Redirecionamentos** (noindex, fora do sitemap e dos menus) para `acompanhamentos.html`. Os programas 30 e 60 foram retirados em 17/09/2026. Não recriar. |
| `vigor.html` | Programa VIGOR, para quem perde força em casa, sem internação |
| `para-medicos.html` | Carta aos colegas médicos, tabela por especialidade em `#especialidades` |
| `acompanhamento-hospitalar.html` | Acompanhamento durante a internação |
| `depoimentos.html` | Depoimentos. **Oculta**: fora dos menus, do sitemap e dos
buscadores (noindex) até haver depoimentos reais. A seção da home está comentada. |
| `contato.html` | WhatsApp, telefone, e-mail, mapa, formulário |
| `links.html` | Página de links para bio do Instagram (noindex) |

Ao criar uma página nova: replique cabeçalho, rodapé e botão flutuante de uma
página existente, atualize o `aria-current` da navegação, inclua o item nos menus
de **todas** as páginas e acrescente a URL em `sitemap.xml`.

## Contatos e dados atuais

- WhatsApp e telefone do consultório: **(27) 99620-5757** (único número do site, ver regra 5)
- E-mail: **draclaudiacogo@gmail.com**
- Instagram: **@draclaudiacogo**
- Cidade: **Vitória, ES**
- Crédito no rodapé: **Design por Bruno Ambrosin**

Links de WhatsApp usam `data-wa` e, quando a mensagem for específica,
`data-wa-msg="..."`. O número fica centralizado em `js/main.js` (`CONFIG.whatsapp`).

## A escada RECOMEÇO 90 · 120 · 180 (a linha de cuidado principal)

Três durações de uma mesma linha de cuidado, definida em 17/09/2026 (os antigos
RECOMEÇO 30 e 60 saíram; o VIGOR continua como programa próprio):

- **RECOMEÇO 90:** doze semanas de construção. Primeira consulta de uma hora e meia
  mede o ponto de partida (força da mão, massa muscular, velocidade do passo, sentar
  e levantar, memória), revisa cada remédio e escreve o plano. A médica coordena a
  equipe (fisioterapia supervisionada, nutrição, educador físico quando indicado).
  Retornos presenciais e por vídeo, uma visita em casa e uma reunião com quem cuida.
  Relatório escrito aos 30, 60 e 90 dias.
- **RECOMEÇO 120:** as doze semanas e mais um mês de consolidação, com intensidade
  menor. Reavaliação ampla aos 120 dias e plano de manutenção em casa por escrito.
- **RECOMEÇO 180:** seis meses. Construção nas primeiras doze semanas e consolidação
  supervisionada até o sexto mês, com o educador físico à frente e a médica
  reavaliando a cada 30 dias. Segunda reunião com quem cuida. Relatório mensal.

Nomes nos menus e rodapés: "RECOMEÇO 90", "RECOMEÇO 120", "RECOMEÇO 180",
"Programa VIGOR". Sem contagem de sessões, sem preço, sem horas da médica. Oito
frentes (R.E.C.O.M.E.Ç.O) e **desospitalização assistida** com homecare continuam
descritas em `metodo.html`.

O bloco **"Cinco medidas, uma página"** (nome provisório; "Retrato de Partida" ainda
não foi aprovado) está em `servicos.html` e `metodo.html`. Pode citar o nome do
aparelho como fato (InBody 270S), nunca "o mais moderno", "o único", "grau clínico".
As fotos `assets/images/inbody-270s.webp` e `assets/images/dinamometro-dm90.webp`
ainda não chegaram: o markup das figuras está comentado nas duas páginas e deve ser
descomentado quando os arquivos entrarem no repositório.

O PDF `assets/docs/metodo-recomeco-90-apresentacao.pdf` descreve a versão anterior
do método (marcos aos 15, 30, 60 e 90 dias) e **não está mais linkado** em
`metodo.html`. Só volte a linká-lo depois de regerá-lo com o conteúdo atual.

**Nunca publique preços no site.** A precificação é assunto privado entre Bruno e a
Dra. Claudia. O site apresenta a linha de cuidado; a indicação é feita na consulta
e a proposta sai por escrito, pelo consultório.

## Pendências aguardando dados reais do cliente

- Fotos dos aparelhos (balança InBody 270S e dinamômetro) para o bloco "Cinco
  medidas, uma página".
- Regerar o PDF de apresentação para colegas com o conteúdo atual do RECOMEÇO 90.
- Depoimentos reais. Até lá tudo permanece oculto, por decisão do cliente.
- Fotos reais do consultório (as atuais são ilustrativas do projeto da marca).

## Como trabalhar com o Bruno

Ele valoriza entrega direta: implemente, publique e depois relate o que mudou.
Evite listas longas de opções. Quando ele mandar áudio transcrito ou texto com
erros de digitação, interprete a intenção, não a letra. Ele revisa o site com olhar
de designer e aponta excesso de oferta, agressividade comercial ou qualquer coisa
que "pareça feita por IA".
