/* ===================================================================
   Dra. Claudia Cogo · Rastreamento de marketing
   -------------------------------------------------------------------
   Meta Pixel (PageView + Lead no clique do WhatsApp) e atribuição de
   origem por UTM. Sem dependências. Vanilla JS.

   >>> TODO (uma edição só): trocar '__PIXEL_ID__' pelo ID real do Pixel
       da Meta quando a conta for verificada. Enquanto o ID for o
       placeholder, NADA é enviado à Meta (o Pixel não inicializa).
       A captura de UTM e a marcação de origem no WhatsApp funcionam
       de qualquer forma, pois não dependem da Meta.

   Conformidade: só PageView e Lead. O único dado personalizado é a
   origem (utm_source/utm_campaign). Nenhum dado de saúde é enviado.
   =================================================================== */
(function () {
  "use strict";

  /* ID do Pixel. Só ativa com um ID numérico real (o placeholder não). */
  var PIXEL_ID = "__PIXEL_ID__";
  var PIXEL_ATIVO = /^[0-9]{6,}$/.test(PIXEL_ID);

  /* -----------------------------------------------------------------
     1. UTM — captura na chegada e persiste pela sessão
     ----------------------------------------------------------------- */
  var CAMPOS_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function capturarUTM() {
    try {
      var q = new URLSearchParams(window.location.search);
      CAMPOS_UTM.forEach(function (chave) {
        var valor = q.get(chave);
        if (valor) {
          /* limita tamanho e tira caracteres estranhos pra não sujar a mensagem */
          valor = valor.replace(/[^\w .\-]/g, "").slice(0, 60);
          if (valor) sessionStorage.setItem(chave, valor);
        }
      });
    } catch (e) { /* sessionStorage pode estar bloqueado; segue sem UTM */ }
  }

  /* Origem curta e legível: "source/campaign" (ou só "source"). Null sem UTM. */
  function origem() {
    try {
      var s = sessionStorage.getItem("utm_source");
      if (!s) return null;
      var c = sessionStorage.getItem("utm_campaign");
      return c ? (s + "/" + c) : s;
    } catch (e) { return null; }
  }

  /* -----------------------------------------------------------------
     2. Meta Pixel — base (só inicializa com ID real)
     ----------------------------------------------------------------- */
  if (PIXEL_ATIVO) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }

  /* Dispara um evento só se o Pixel estiver ativo. */
  function track(evento, dados) {
    if (PIXEL_ATIVO && window.fbq) window.fbq("track", evento, dados || {});
  }

  /* -----------------------------------------------------------------
     3. WhatsApp — marca a origem no texto e dispara Lead no clique
     ----------------------------------------------------------------- */
  function ehLinkWhatsApp(a) {
    if (!a || !a.href) return false;
    var h = a.href;
    return h.indexOf("wa.me") !== -1 || h.indexOf("api.whatsapp.com") !== -1;
  }

  /* Acrescenta " [origem: x/y]" ao parâmetro text. Cria o text se não houver.
     Idempotente: não anexa duas vezes. Sem UTM, não mexe no link. */
  function marcarOrigem(a) {
    var o = origem();
    if (!o) return;
    try {
      var url = new URL(a.href);
      var texto = url.searchParams.get("text") || "";
      if (texto.indexOf("[origem:") !== -1) return;
      var marca = "[origem: " + o + "]";
      url.searchParams.set("text", texto ? (texto + " " + marca) : marca);
      a.setAttribute("href", url.toString());
    } catch (e) { /* URL malformada: ignora */ }
  }

  function aoClicar(ev) {
    var alvo = ev.target;
    var a = (alvo && alvo.closest) ? alvo.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]') : null;
    if (!a || !ehLinkWhatsApp(a)) return;
    marcarOrigem(a);                     /* reescreve o href antes de navegar */
    var o = origem();
    track("Lead", o ? { origem: o } : {}); /* não bloqueia a navegação */
  }

  /* -----------------------------------------------------------------
     Inicialização
     ----------------------------------------------------------------- */
  capturarUTM();
  /* Listener delegado em captura: pega todos os links wa.me, atuais e futuros,
     e roda antes de qualquer handler de navegação. */
  document.addEventListener("click", aoClicar, true);
})();
