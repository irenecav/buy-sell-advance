'use strict'

//Creamos un Controller que nos servirá para asociar rutas en app.js
//Cogemos el modelo Usuario
const Usuario = require('../models/Usuario')
const namedRoutes = require('../lib/namedRoutes') 
const bcrypt = require('bcrypt')

class LoginController { //creo una clase con un metodo index que renderiza la pagina login
    
    //lo voy a utilizar como una petición GET a la raiz del sitio "/"
    index(req, res , next) {
        res.locals.error = ''//para que salga el error vacio al entrar en login
        res.render('login')
    }

    //añadimos un metodo POST para cuando nos logeamos
    async post(req, res, next) {
        try{
              //recoger parámetros del cuerpo de la petición, (email y password)
        const email = req.body.email;
        const password = req.body.password;

        // buscar el usuario en la base de datos. (Vamos a pedir al modelo que nos busque el usuario en algun sitio)
        const usuario = await Usuario.findOne({ email: email }) //buscamos que la propiedad email sea igual al valor optenido en email

        if (!usuario || !await bcrypt.compare(password, usuario.password)){ //Si no encontramos al usuario o la password no es correcta
            res.locals.email = email
            res.locals.error = 'Invalid credientals' //lo utilizamos para darle valores a las vistas que vamos a renderizar. En este caso un texto con el error que quiero que aparezca en la pagina
            res.render('login')
            return //para que no siga ejecutandose el codigo de abajo y no intente responder más veces
        }



        //usuario ok
       //     res.redirect('/privado')  No hay que poner las rutas así x si quieres cambiar el nombre de la ruta en un futuro.
        res.redirect(namedRoutes.privado)

        }catch(err){
            next(err)
        }
      
    }
}



module.exports = new LoginController();
//Exporto un controlador construido, una instancia de esta clase (Un objeto que he creado de esta clase)
