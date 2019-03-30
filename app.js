var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Cualquier cosa que ponga en public va ser accesible como estatico
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Conexion con la base de datos
 */
require('./lib/connectMongoose')
require('./models/Anuncio')



app.use((req, res, next)=>{
  console.log('recibimos una petición ')
  
  next()
  })
  
  /**
   * variables globales vistas
   */
  
   app.locals.titulo = 'Anuncios'
  
   /**
   * Rutas de nuestra API
   */
  app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'))
  
  
  
  /**
   * Rutas de nuestra web
   */

   const loginController = require('./routes/loginController')
   const privadoController = require('./routes/privadoController')

  app.use('/', require('./routes/index'));
  //usamos el estilo de controladores para estructurar las rutas
  app.get('/login', loginController.index) //ejecuto el metodo index que he creado en el controlador loginController.js, ya que lo hemos hecho el require en lineas anteriores
  app.post('/login',loginController.post)
  app.get('/admin', privadoController.index)
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
  
  
    //errores de validación
    if(err.array){
      err.status = 442
      const errInfo = err.array({ onlyFirstError:true})[0]
     // console.log(errInfo)
     err.message = isAPIRequest(req) ?
     {message: 'Not valid', errors: err.mapped()} : `Not valid - ${errInfo.param} ${errInfo.msg}`
     //err.mapped() me da un array con todo los errores. Si es api request te devuelve el error primero json sino el texto
    }
  
    
  
    // render the error page
    res.status(err.status || 500);
  
  //si es una peticion de API respondo con JSON
  
    if(isAPIRequest(req)){
      res.json({sucess: false, error: err.message})
      return
    }
  
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
  
  });
  
  
  function isAPIRequest(req){
   return req.originalUrl.indexOf('/apiv') === 0
  }
  
  module.exports = app;
  