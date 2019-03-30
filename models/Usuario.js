'use strict'

const mongoose = require('mongoose')//cargo moongose pork me voy a hacer un modelo de mongoose

const usuarioSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },  //No se nos puede olvidar los INDICES para las cosas que buscamos!!!!! Y le decimos que sea único. El email es unico por usuario.
    password: String
})

const Usuario = mongoose.model('Usuario', usuarioSchema)//Creame un modelo que se llame usuario con el esquema usuarioSchema

module.exports = Usuario