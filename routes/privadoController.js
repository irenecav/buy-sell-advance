'use strict'

class PrivadoController {
    index(req, res, next){
        res.render('admin')
    }
}

module.exports = new PrivadoController()