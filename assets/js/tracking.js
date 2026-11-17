/* ===================================================================
   Dra. Claudia Cogo · Rastreamento de marketing
   -------------------------------------------------------------------
   Meta Pixel (PageView + Lead no clique do WhatsApp) e atribuição de
   origem por UTM.

   Consentimento (LGPD): o Pixel da Meta só carrega DEPOIS que a pessoa
   aceita o aviso de cookies. Antes do aceite, nada é enviado à Meta.
   A escolha fica guardada (localStorage) e pode ser trocada pelo link
   "Preferências de cookies" no rodapé.

   A captura de UTM e a marcação de origem na mensagem do WhatsApp são
   de primeira parte (não vão à Meta, não usam cookie) e funcionam
   sempre, com ou sem aceite.

   Conformidade: só PageView e Lead. O único dado personalizado é a
   origem (utm_source/utm_campaign). Nenhum dado de saúde é enviado.
   =================================================================== */
(function () {
  "use strict";

  var PIXEL_ID = "1613938263276675";
  var PIXEL_VALIDO = /^[0-9]{6,}$/.test(PIXEL_ID);
  var CONSENT_KEY = "cc_consent_v1"; /* "accepted" | "rejected" */
  var POLITICA_URL = "/politica-de-privacidade.html";

  /* ----------------------------------------------------------------
     1. UTM — captura na chegada e persiste pela sessão (primeira parte)
     ---------------------------------------------------------------- */
  var CAMPOS_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function capturarUTM() {
    try {
      var q = new URLSearchParams(window.location.search);
      CAMPOS_UTM.forEach(function (chave) {
        var valor = q.get(chave);
        if (valor) {
          /* mantém letras (com acento), números, espaço, ponto, hífen e sublinhado */
          valor = valor.replace(/[^\p{L}\p{N} ._-]/gu, "").slice(0, 60);
          if (valor) sessionStorage.setItem(chave, valor);
        }
      });
    } catch (e) {}
  }

  function origem() {
    try {
      var s = sessionStorage.getItem("utm_source");
      if (!s) return null;
      var c = sessionStorage.getItem("utm_campaign");
      return c ? (s + "/" + c) : s;
    } catch (e) { return null; }
  }

  /* ----------------------------------------------------------------
     2. Meta Pixel — só inicia após consentimento
     ---------------------------------------------------------------- */
  var pixelIniciado = false;

  function iniciarPixel() {
    if (pixelIniciado || !PIXEL_VALIDO) return;
    pixelIniciado = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/pt_BR/fbevents.js");
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }

  function track(evento, dados) {
    if (pixelIniciado && window.fbq) window.fbq("track", evento, dados || {});
  }

  function consentimento() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function guardarConsentimento(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {}
  }

  /* ----------------------------------------------------------------
     3. WhatsApp — marca a origem no texto (sempre) e Lead no clique
        (só com consentimento). Segura a navegação na mesma aba por um
        instante para o evento sair antes de trocar de página.
     ---------------------------------------------------------------- */
  function marcarOrigem(a) {
    var o = origem();
    if (!o) return;
    try {
      var url = new URL(a.href);
      var texto = url.searchParams.get("text") || "";
      if (texto.indexOf("[origem:") !== -1) return;
      var novo = texto ? (texto + " [origem: " + o + "]") : ("[origem: " + o + "]");
      var partes = [];
      var temText = false;
      url.searchParams.forEach(function (v, k) {
        if (k === "text") { temText = true; v = novo; }
        partes.push(k + "=" + encodeURIComponent(v));
      });
      if (!temText) partes.push("text=" + encodeURIComponent(novo));
      a.setAttribute("href", url.origin + url.pathname + "?" + partes.join("&"));
    } catch (e) {}
  }

  function aoClicar(ev) {
    var alvo = ev.target;
    var a = (alvo && alvo.closest) ? alvo.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]') : null;
    if (!a) return;
    marcarOrigem(a);
    if (!pixelIniciado) return;            /* sem consentimento: nada a disparar, navega normal */
    var o = origem();
    var dados = o ? { origem: o } : {};
    var novaAba = a.target === "_blank" || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey;
    if (novaAba || ev.defaultPrevented) { track("Lead", dados); return; }
    /* mesma aba: segura ~250ms para o beacon sair antes de navegar */
    ev.preventDefault();
    var destino = a.href;
    var foi = false;
    function navegar() { if (foi) return; foi = true; window.location.href = destino; }
    track("Lead", dados);
    setTimeout(navegar, 250);
  }

  /* ----------------------------------------------------------------
     4. Aviso de cookies (injetado via JS, sem tocar o CSS do site)
     ---------------------------------------------------------------- */
  function injetarEstilo() {
    if (document.getElementById("cc-cookie-style")) return;
    var st = document.createElement("style");
    st.id = "cc-cookie-style";
    st.textContent =
      "#cc-cookie{position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;" +
      "max-width:640px;margin:0 auto;background:#f7f2eb;color:#2e2d1e;" +
      "border:1px solid #c3b5a4;border-radius:14px;box-shadow:0 10px 40px rgba(43,44,28,.22);" +
      "padding:16px 18px;font-family:'Montserrat',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;" +
      "font-size:14px;line-height:1.5;display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}" +
      "#cc-cookie p{margin:0;flex:1 1 260px;min-width:220px}" +
      "#cc-cookie a{color:#8c6239;text-decoration:underline}" +
      "#cc-cookie .cc-acoes{display:flex;gap:10px;flex:0 0 auto}" +
      "#cc-cookie button{font:inherit;font-weight:600;cursor:pointer;border-radius:999px;" +
      "padding:9px 18px;min-height:40px;border:1px solid #8c6239}" +
      "#cc-cookie .cc-sim{background:#47462b;color:#f7f2eb;border-color:#47462b}" +
      "#cc-cookie .cc-nao{background:transparent;color:#5b5943;border-color:#c3b5a4}" +
      "#cc-cookie .cc-sim:hover{background:#34331f}" +
      "#cc-cookie .cc-nao:hover{background:#eaddca}" +
      "body.cc-banner-aberto .wa-float{bottom:var(--cc-lift,150px)!important}";
    document.head.appendChild(st);
  }

  function esconderBanner() {
    var el = document.getElementById("cc-cookie");
    if (el && el.parentNode) el.parentNode.removeChild(el);
    document.body.classList.remove("cc-banner-aberto");
  }

  function aceitar() {
    guardarConsentimento("accepted"); esconderBanner(); iniciarPixel();
  }
  function recusar() {
    guardarConsentimento("rejected"); esconderBanner();
    /* se o Pixel já tinha sido aceito nesta página, recarrega para pará-lo */
    if (pixelIniciado) { try { window.location.reload(); } catch (e) {} }
  }

  function mostrarBanner() {
    if (!PIXEL_VALIDO) return;
    if (document.getElementById("cc-cookie")) return;
    injetarEstilo();
    var box = document.createElement("div");
    box.id = "cc-cookie";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Aviso de cookies");
    box.innerHTML =
      '<p>Usamos um cookie de marketing (Meta) para entender de onde vêm os contatos ' +
      'e melhorar os anúncios. Nenhum dado de saúde é coletado. ' +
      '<a href="' + POLITICA_URL + '">Saiba mais</a>.</p>' +
      '<div class="cc-acoes">' +
      '<button type="button" class="cc-nao">Agora não</button>' +
      '<button type="button" class="cc-sim">Aceitar</button>' +
      '</div>';
    box.querySelector(".cc-sim").addEventListener("click", aceitar);
    box.querySelector(".cc-nao").addEventListener("click", recusar);
    document.body.appendChild(box);
    document.body.classList.add("cc-banner-aberto");
    try { document.documentElement.style.setProperty("--cc-lift", (box.offsetHeight + 24) + "px"); } catch (e) {}
  }

  /* Link "Preferências de cookies" (rodapé) reabre o aviso a qualquer momento */
  function aoClicarPreferencias(ev) {
    var alvo = ev.target;
    var p = (alvo && alvo.closest) ? alvo.closest("[data-cc-prefs]") : null;
    if (!p) return;
    ev.preventDefault();
    mostrarBanner();
  }

  /* ----------------------------------------------------------------
     Inicialização
     ---------------------------------------------------------------- */
  capturarUTM();
  document.addEventListener("click", aoClicar, true);
  document.addEventListener("click", aoClicarPreferencias, false);

  var estado = consentimento();
  if (estado === "accepted") {
    iniciarPixel();
  } else if (estado !== "rejected") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mostrarBanner);
    } else {
      mostrarBanner();
    }
  }
})();
