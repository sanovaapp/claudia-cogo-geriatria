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
   CFM 2.336/2023). Ela **não tem RQE em Geriatria**: nunca escreva "geriatra",
   "médica geriatra" nem "especialista em Geriatria". A palavra Geriatria só aparece
   enquadrada como pós-graduação, sempre com o Einstein citado junto, ou como nome de
   procedimento (Avaliação Geriátrica Ampla, a AGA; antigo nome AGI não é mais usado). Sem RQE na área, também não se anuncia
   que ela **trata** doenças próprias da especialidade: descreva procedimentos e
   cuidados, não titulação.
   A expressão "NÃO ESPECIALISTA" foi retirada do site por decisão do cliente em
   12/08/2026, tomada com ciência da Resolução. **Não reintroduza sem pedido dele.**
3. **Conformidade CFM:** nenhuma promessa de resultado, nenhuma garantia de cura,
   nenhum preço, nenhum "antes e depois". Programas são "indicados após avaliação
   individual".
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
| `servicos.html` | 9 serviços, seção da AGA (`#agi`, id histórico), como funciona |
| `metodo.html` | Aba **Acompanhamentos Especiais**: Método RECOMEÇO 90 |
| `recomeco-30.html` | Programa RECOMEÇO 30, primeiro mês após a alta |
| `acompanhamento-hospitalar.html` | Acompanhamento durante a internação |
| `depoimentos.html` | Depoimentos. **Oculta**: fora dos menus, do sitemap e dos
buscadores (noindex) até haver depoimentos reais. A seção da home está comentada. |
| `contato.html` | WhatsApp, telefone, e-mail, mapa, formulário |
| `links.html` | Página de links para bio do Instagram (noindex) |

Ao criar uma página nova: replique cabeçalho, rodapé e botão flutuante de uma
página existente, atualize o `aria-current` da navegação, inclua o item nos menus
de **todas** as páginas e acrescente a URL em `sitemap.xml`.

## Contatos e dados atuais

- WhatsApp e telefone: **(27) 99620-5757** (provisório, confirmar com Bruno)
- E-mail: **draclaudiacogo@gmail.com**
- Instagram: **@draclaudiacogo**
- Cidade: **Vitória, ES**
- Crédito no rodapé: **Design por Bruno Ambrosin**

Links de WhatsApp usam `data-wa` e, quando a mensagem for específica,
`data-wa-msg="..."`. O número fica centralizado em `js/main.js` (`CONFIG.whatsapp`).

## Método RECOMEÇO 90 (o produto principal)

Acompanhamento médico da transição após a alta hospitalar, de **UTI ou enfermaria**,
podendo começar ainda durante a internação. Oito frentes (R.E.C.O.M.E.Ç.O), equipe
liderada pela Dra. Claudia com nutricionista (readequação alimentar semanal),
fisioterapeuta, educador físico e cuidador quando necessário, além de visitas
domiciliares conforme o plano. Inclui **desospitalização assistida** com homecare,
para concluir antibioticoterapia venosa em casa.

Indicadores medidos aos **0, 15, 30, 60 e 90 dias**, e o texto deve sempre deixar
claro que **é o estado do paciente que define os intervalos** e que o
acompanhamento segue além dos 90 dias quando a recuperação pedir.

Existe uma seção "Para colegas médicos" com contrarreferência garantida e o PDF
`assets/docs/metodo-recomeco-90-apresentacao.pdf`. **Se o conteúdo do método mudar
na página, o PDF precisa ser regerado junto** (fonte em ambiente de trabalho, gerado
via Playwright `page.pdf()` a partir de um HTML A4 com a identidade da marca).

**Nunca publique preços no site.** A precificação é assunto privado entre Bruno e a
Dra. Claudia.

## Pendências aguardando dados reais do cliente

- Endereço do consultório: o atual em `contato.html` é **simulação** marcada em
  comentário, junto com o mapa. Substituir quando Bruno enviar o definitivo.
- Depoimentos reais. Até lá tudo permanece oculto, por decisão do cliente.
- Política de convênios ou particular.
- Fotos reais do consultório (as atuais são ilustrativas do projeto da marca).

## Como trabalhar com o Bruno

Ele valoriza entrega direta: implemente, publique e depois relate o que mudou.
Evite listas longas de opções. Quando ele mandar áudio transcrito ou texto com
erros de digitação, interprete a intenção, não a letra. Ele revisa o site com olhar
de designer e aponta excesso de oferta, agressividade comercial ou qualquer coisa
que "pareça feita por IA".
