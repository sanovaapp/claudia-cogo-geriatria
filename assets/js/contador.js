/* ===================================================================
   Dra. Claudia Cogo · Contador de visitas (sem cookie)
   -------------------------------------------------------------------
   Usa o GoatCounter (grátis, código aberto): sem cookie, sem dado
   pessoal e sem identificar ninguém. Conta TODAS as visitas e, por
   isso, carrega SEMPRE, independente do aviso de cookies e do Pixel
   da Meta (que continua carregando só após o consentimento).

   >>> TODO (uma edição só): trocar "__GOATCOUNTER_CODE__" pelo código
       (subdomínio) criado em goatcounter.com, por exemplo "claudiacogo"
       (que vira claudiacogo.goatcounter.com). Enquanto for o
       placeholder, o contador não carrega e nada é enviado.
   =================================================================== */
(function () {
  "use strict";
  var CODE = "__GOATCOUNTER_CODE__";
  if (!/^[a-z0-9-]{2,40}$/.test(CODE)) return; /* placeholder ou inválido: não carrega */
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://" + CODE + ".goatcounter.com/count");
  (document.body || document.documentElement).appendChild(s);
})();
