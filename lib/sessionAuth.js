'use strict'

const namedRoutes = ('./namedRoutes.js')
/**
 * Middleware que sirve para comprobar que un usuario esta autenticado
 */

 module.exports = function(){//Esta funcion retorna el middleware
     return function(req, res ,next) { 
        if(!req.session.authUser){ //Si el usuario no esta logueado lo mando al login
            res.redirect(namedRoutes.login)
            return
         }
         next() //asi sigue al siguiente midleware que es privado.controller.index y entra al area privada
     }
 }

