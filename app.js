require('dotenv').config()


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken')
const namedRoutes = require('./lib/namedRoutes');



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
 * Setup de internalizacion (i18n)
 */
const i18n = require('./lib/i18nConfigure')()//Tenemos que ejecutar la funcion que importamos
app.use(i18n.init)//No es una funcion, es una propiedad que paunta a un middleware

console.log(i18n.__('Application tittle'))


/**
 * Conexion con la base de datos
 */
const mongooseConnection = require('./lib/connectMongoose')
require('./models/Anuncio')



app.use((req, res, next)=>{
  console.log(i18n.__('recibimos una petición '))
  
  next()
  })
  
  /**
   * variables globales vistas
   */
  
   app.locals.titulo = 'Anuncios'

   const jwtAuth = require('./lib/jwtAuth')

   /**
   * Rutas de nuestra API
   */


  //Creamos un middleware en el que queremos comprobar que nos han mandado el token correspondiente.El que esta enmedio
  app.use('/apiv1/anuncios', jwtAuth() , require('./routes/apiv1/anuncios'))
  
  /**
   * Inicializamos y cargamos la sesión del usuario que hace la petición. que ha hecho login.
   */

   app.use(session({
     name: 'nodeapi-session',
     secret: 'srdxfcgv  dfg f ghjkfd tfygiuhioj',
     resave: false,
     saveUninitialized: true,
     cookie: {
       secure: true,
       maxAge: 2 * 24 * 60 * 60 * 1000 //caduca la cookie a los dos dias
     },
     store: new MongoStore({
       // le pasamos como conectarse a la base de datos
       mongooseConnection: mongooseConnection
     })

   }))
  

      // para tener disponible la sesión en las vistas
      app.use((req, res, next) => {
        res.locals.session = req.session;
        next();
      });

  /**
   * Rutas de nuestra web
   */
   const sessionAuth = require('./lib/sessionAuth')
   const loginController = require('./routes/loginController')
   const privadoController = require('./routes/privadoController')

  app.use('/', require('./routes/index'));
  app.use('/change-lang', require('./routes/change-lang'))
  //usamos el estilo de controladores para estructurar las rutas

  app.get('/login', loginController.index) //ejecuto el metodo index que he creado en el controlador loginController.js, ya que lo hemos hecho el require en lineas anteriores
  app.post('/login',loginController.post)
  app.post('/loginJWT',loginController.postJWT)

  app.get('/logout', loginController.logout)
  app.get('/admin',sessionAuth(),  privadoController.index) //Aqui utilizo e middleware sessionAuth que esta en sessionAuth.js
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
     {message: i18n.__('Not valid'), errors: err.mapped()} : `${i18n.__('Not valid')} - ${errInfo.param} ${errInfo.msg}`
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
  
