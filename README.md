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

## Arranque

Para arrancar el proyecto usar:

* En producción:

```shell
npm start
```

* En desarrollo:

```shell
npm run dev
```

## Rutas del API

* http://localhost:3000/apiv1/anuncios

Retorna una lista de anuncios

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




