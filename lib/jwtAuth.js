'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() {
  return function(req, res, next) {
    // leer el token
    const token = req.body.token || req.query.token || req.get('Authorization') //Vemos si el token esta como parametro en el body, o viene en la query o lo han metido en la cabecera
    
    if (!token) {
      const err = new Error('no token provided');
      next(err);
      return;
    }
      
    // verificar que el token es válido
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => { //tiene un callback con un error y que devuelve el payload
      if (err) {
        next(err);
        return;
      }
      req.apiUserId = payload._id;
      next();//Si el token es valido que continue con el require de abajo
    }); 
  };
}


