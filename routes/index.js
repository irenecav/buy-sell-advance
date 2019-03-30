var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio')
const {
    query,
    params,
    body,
    validationResult
} = require('express-validator/check')




router.get('/', async (req, res, next) => {
    try { 

        const nombre = req.query.nombre 
        const precioMin = req.query.precioMin
        const precioMax = req.query.precioMax
        const venta = req.query.venta
        const tags = req.query.tags
        const skip = parseInt(req.query.skip)
        const limit = parseInt(req.query.limit)
        const fields = req.query.fields
        const sort = req.query.sort


        const filter = {}
        //Filtro por nombre
        if (nombre) {
            filter.nombre = new RegExp('^' + req.query.nombre, "i")
        }
        //Filtrar por precio max y precio min
        if (precioMin || precioMax) {
            filter.precio = {}
        }

        if (precioMin) {
            filter.precio.$gte = precioMin
        }
        if (precioMax) {
            filter.precio.$lte = precioMax
        }

        if (venta) {
            filter.venta = venta
        }
       //Filtrar las tag con $all, para que sea necesario que todas las tags de la query aparezcan en los anuncios mostrados
        if (tags) {
            filter.tags = { $all: tags}
        }





        const anuncios = await Anuncio.listar(filter, skip, limit, fields, sort)
        res.locals.anuncios = anuncios
        res.render('index')
    } catch (err) {
        next(err)
        return 
    }
})









module.exports = router;