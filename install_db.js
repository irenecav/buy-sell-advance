'use strict'

require('dotenv').config()
/**
 * Crear los datos iniciales  de la base de datos
 */
//ponemos primeros los require de node, despues los de los paketes de npm y mas tarde os propios de nuestra aplicacion 
const readline = require('readline')

const db = require('./lib/connectMongoose')
const Anuncio = require('./models/Anuncio')
const Usuario = require('./models/Usuario') //cogemos el modelo de usuario 
const anunciosData = require('./data/anuncios.json') 
const usuariosData = require('./data/usuarios.json') // cogemos el objeto json con los datos de los suarios

db.once('open', async ()=> {
    try{

        //preguntar al usuario si quiere borrar la base de datos.
        const respuesta = await preguntaUsuario('¿Estas seguro que quieres que borre toda la base de datos? (no)')
        
        if(respuesta.toLowerCase() !== 'si'){
            console.log('Abortado!')
            process.exit(0)
        }

       // await initAnuncios()
        await initModel(Anuncio, anunciosData, 'anuncios') 

        //hacer Hash de las contraseñas
        for (let i = 0; i < usuariosData.length; i++){
            usuariosData[i].password = await Usuario.hashPassword(usuariosData[i].password)
        }

        await initModel(Usuario, usuariosData, 'usuarios') //El 3 parametros es el nombre del modelo y solo lo utilizamos para verlo en la consola


        db.close()

    }catch(err){
        console.log('Hubo un error', err)
        process.exit(1) //ha terminado el proceso de erros
    }

})


function preguntaUsuario(pregunta){
return new Promise(( resolve, reject) => {
    const interfaz = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

interfaz.question(pregunta, answer =>{
    interfaz.close()
    resolve(answer)
    return
})

})
}



async function initModel(Model, data, modelName){

    try{
        const deleted = await Model.deleteMany()
        console.log(`Eliminados ${JSON.parse(deleted).n} ${modelName}` )
        //ahora creamos los anuncios iniciales. Que estan en un fichero JSON de la carpeta data
   const insertado = await Model.insertMany(data)
   console.log(`Insertado ${insertado.length} ${modelName}. `)
    
    }catch(err){
        next(err)
    }
   

    
}