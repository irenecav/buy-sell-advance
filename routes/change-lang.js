var express = require('express');
var router = express.Router();

router.get('/:locale', (req, res, next) => {
  // recuperar el código de locale
  const locale = req.params.locale;

  // guardar la página a la que hay que volver (referer)
  const backTo = req.get('referer');

  // establecer la cookie del nuevo idioma en la respuesta
  res.cookie('nodeapi-lang', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 }); // 20 days

  // redireccionar al referer (valor de la cabecera referer)
  res.redirect(backTo);
});

module.exports = router;
