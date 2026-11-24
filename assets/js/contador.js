/* ===================================================================
   Dra. Claudia Cogo · Contador de visitas (sem cookie)
   -------------------------------------------------------------------
   Usa o GoatCounter (grátis, código aberto): sem cookie, sem dado
   pessoal e sem identificar ninguém. Conta TODAS as visitas e, por
   isso, carrega SEMPRE, independente do aviso de cookies e do Pixel
   da Meta (que continua carregando só após o consentimento).

   Conta: draclaudiacogo (painel em https://draclaudiacogo.goatcounter.com).
   Carrega em https://draclaudiacogo.goatcounter.com/count. Para desligar,
   voltar o CODE para um placeholder (ex.: "__GOATCOUNTER_CODE__").
   =================================================================== */
(function () {
  "use strict";
  var CODE = "draclaudiacogo";
  if (!/^[a-z0-9-]{2,40}$/.test(CODE)) return; /* placeholder ou inválido: não carrega */
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://" + CODE + ".goatcounter.com/count");
  (document.body || document.documentElement).appendChild(s);
})();
