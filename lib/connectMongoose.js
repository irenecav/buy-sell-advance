'use strict'

const mongoose = require('mongoose')

//me subscribo al evento error, por si hay un error de conexión quiero que lo pinte en la consola
mongoose.connection.on('error', err =>{
    consolelog('Error de conexión', err)
    process.exit(1)
})

//solo la primera vez quiero que active este eventhandler y asi ver cuando se ha conectado 
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name)
})

mongoose.set('useCreateIndex',true)

//aqui le decimos que se conecte
mongoose.connect('mongodb://localhost/anuncios', { useNewUrlParser: true }) //le ponemos el useNew...xk así se hace ahora en mongodb, en el futuro no sera nacesario ponerlo...

module.exports = mongoose.connection //Esta linea no es realmente necesaria en este caso
