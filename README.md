# NodeApi

Para inicializar el proyecto:

```shell
npm install
```

Verifica la cadena de conexión a la base de datos en lib/connectMongoose.js

Puedes utilizar el script de inicialización de la base de datos con:

```shell
npm run install_db
```

## Arrancar NODEAPI COMPLETA (Todos los microservicios) con pm2

En el caso de no tener pm2

```shell
npm install pm2 -g
```
Arrancamos la App y los microservicios
```shell
pm2 start
```

## Monitorización con pm2

```shell
pm2 monit
```

## Arrancar NODEAPI sin microservicio thumbnail

Para arrancar el proyecto usar:

* En producción:

```shell
npm start
```

* En desarrollo:

```shell
npm run dev
```

## Arrancar servicio thumbnail

```shell
node thumbnails_service.js
```

## Rutas del WEB

* http://localhost:3000

### Para hacer login desde la web

* https://localhost:3000/login

## Rutas del API

* http://localhost:3000/apiv1/anuncios

Retorna una lista de anuncios

## Authenticación por JWT utilizando Postman

* Hacer una petición post http://localhost:3000/loginJWT, con el email y usuario en el body de la petición, para obtener el token.

* Para utilizar la API http://localhost:3000/apiv1/anuncios incluir en la cabecera el header Authorization con el token. 

##Crear nuevo anuncio con Postman
* Post http://localhost:3000/apiv1/anuncios con los siguientes datos en el body. (usando form-data)

-nombre
-venta
-precio
-foto (type-file)
-tags

## Otra información

### Para arrancar un servidor de mongodb desde consola:

```shel
./bin/mongod --dbpath ./data/db --directoryperdb
```

## Filtros de precio en la API

Rangos de precio. Hay dos variables:

* precioMin  

ej. http://localhost:3000/apiv1/anuncios/?precioMin=200

* precioMax

ej. http://localhost:3000/apiv1/anuncios/?precioMax=200


## Filtros de acción en la API

* Se compra:

ej. http://localhost:3000/apiv1/anuncios/?venta=false

* Se vende:

ej. http://localhost:3000/apiv1/anuncios/?venta=true


## Filtros por tags en la API

* tags=...&    

ej. http://localhost:3000/apiv1/anuncios/?tags=mobile&tags=lifestyle


## Filtros de precio en web

Rangos de precio. Hay dos variables:

* precioMin  

ej. http://localhost:3000/?precioMin=200

* precioMax

ej. http://localhost:3000/?precioMax=200


## Filtros de acción en web

* Se compra: 

ej. http://localhost:3000/?venta=false

* Se vende:

ej. http://localhost:3000/?venta=true

* Se puede dividir por secciones, pulsando los enlaces  


## Filtros por tags en web

* tags=...&    

ej. http://localhost:3000/?tags=mobile&tags=lifestyle




