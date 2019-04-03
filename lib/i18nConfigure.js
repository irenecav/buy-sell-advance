'use strict'

const i18n = require('i18n')
const path = require('path')//utilizamos la libreria path para las rutas de locales

module.exports = function(){
    i18n.configure({
        locales: ['en', 'es'],//le pasamos los idiomas 
        directory: path.join(__dirname, '..', 'locales'), //Donde hemos guardado los literales de idiomas para los respectivod idiomas
        defaultLocale: 'en',
        autoReload: true, // Si yo hago cambio en los ficheros de idiomas sin tirar la aplicacion abajo los recarga
        syncFiles: true, //Crear literales en todos los locales
        cookie: 'nodeapi-lang'//usar locale de esta cookie

    })
    //Por si usamos esto en un script fuera de express
    i18n.setLocale('en')
    return i18n
}