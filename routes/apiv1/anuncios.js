'use strict'

const express = require('express')
const router = express.Router()
const Anuncio = require('../../models/Anuncio')



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

        if (nombre) {
            filter.nombre = new RegExp('^' + req.query.nombre, "i")
        }


        if(precioMin || precioMax){
            filter.precio= {}
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

        if (tags) {
            filter.tags = { $all: tags}
        }

        console.log(tags)



        const anuncios = await Anuncio.listar(filter, skip, limit, fields, sort)
        res.json({
            success: true,
            results: anuncios
        })
    } catch (err) {
        next(err)
        return 
    }
})






/**
 * Get /anuncios/:id
 * Obtener un anuncios
 */

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id

        const anuncio = await Anuncio.findById(id).exec() 
        res.json({
            success: true,
            result: anuncio
        })


    } catch (err) {
        next(err)
        return
    }
})




/**
 * POST /anuncios
 * Crear un anuncios
 */

//  router.post('/', async (req, res, next) => {
//     try {
//         const data = req.body

//         const anuncio = new Anuncio(data)
//         //lo guardamos en la bd
//         const anuncioGuardado = await anuncio.save() 

//         res.json({
//             success: true,
//             result: anuncioGuardado
//         })

//     } catch (err) {
//         next(err)
//         return
//     }

// }) 
var path = require('path')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/images/'))
    },
    filename: (req, file, cb) => {
        console.log(file,'aquiiiii el fileeeee')
        cb(null, file.fieldname + '-' + Date.now())    }
})

var upload = multer({storage: storage})


router.post('/', upload.single('foto'),  async (req, res, next) => {
    try {
        const data = req.body
        data.foto = req.file.filename;

        const anuncio = new Anuncio(data)
        //lo guardamos en la bd
        const anuncioGuardado = await anuncio.save() 

        res.json({
            success: true,
            result: anuncioGuardado
        })

    } catch (err) {
        next(err)
        return
    }

})












/**
 * PUT /anuncios:id
 * Actualiza un anuncio
 */
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const anuncioActualizado = await Anuncio.findOneAndUpdate({
            _id: id
        }, data, {
            new: true
        }).exec() 
        res.json({
            success: true,
            result: anuncioActualizado
        })

    } catch (err) {
        next(err)
        return
    }
})

/**
 * DELETE /anuncios/:id
 * Elimina un anuncio
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id

        await Anuncio.deleteMany({
            _id: id
        }).exec()
        res.json({
            success: true
        })

    } catch (err) {
        next(err)
        return
    }
})

module.exports = router //exportamos el router, no olvidar