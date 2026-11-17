# Ativar o rastreamento de marketing (quando o ID do Pixel chegar)

Estado: tudo pronto nesta branch (`rastreamento-meta-pixel`) com o placeholder
`__PIXEL_ID__`. Nada está publicado. A `main` e o site ao vivo estão limpos.
O Pixel só liga com um ID numérico real; com o placeholder, nada é enviado à Meta.

Quando o Bruno passar o ID do Pixel da Meta, fazer, nesta ordem:

## 1. Definir o ID (uma edição)
Em `assets/js/tracking.js`, trocar na linha `var PIXEL_ID = "__PIXEL_ID__";`
o `__PIXEL_ID__` pelo ID real (só dígitos). O guard `/^[0-9]{6,}$/` ativa o Pixel
sozinho a partir daí (PageView no load; Lead no clique do WhatsApp).

## 2. Ativar o <noscript> nas 14 páginas
Está comentado em cada `<head>`. Descomentar e trocar o `__PIXEL_ID__` pelo mesmo ID.
Um comando resolve os dois passos de uma vez (rodar na raiz do repo):

    ID=000000000000000   # <- ID real
    sed -i "s/__PIXEL_ID__/$ID/g" assets/js/tracking.js *.html
    # tira os marcadores de comentário só do bloco do noscript:
    sed -i 's#<!-- <noscript><img height="1" width="1"#<noscript><img height="1" width="1"#; s#noscript=1" alt=""></noscript> -->#noscript=1" alt=""></noscript>#' *.html

Conferir: `grep -rn "__PIXEL_ID__" .` deve voltar vazio; `grep -c "<noscript>" index.html` = 1.

## 3. Tratar o aviso de cookies/consentimento (LGPD) — PENDENTE, decidir na hora
O site NÃO tem banner de cookies, consentimento nem página de política de privacidade.
O Pixel idealmente carrega só após consentimento. Antes de publicar com o ID ativo,
decidir com o Bruno: banner de consentimento que só chama `tracking.js` após o aceite,
mais uma página de política de privacidade citando Meta/Pixel e finalidade. Sem isso,
o rastreamento vai ao ar sem base de consentimento.

## 4. Publicar
Validar local (ver `assets/js/tracking.js`): PageView no load, Lead no clique wa.me,
UTM anexada ao texto. Merge na `main` e push (deploy automático via `.github/workflows/pages.yml`).
Confirmar no Gerenciador de Eventos da Meta (aba Testar Eventos) que PageView e Lead chegam.

## O que NÃO fazer
- Não publicar com o placeholder (o `__PIXEL_ID__` não pode ir para a produção ativa).
- Não enviar dado de saúde em evento nenhum. Só PageView e Lead; o único dado
  personalizado é a origem (utm_source/utm_campaign).
