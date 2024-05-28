import express from 'express';
import router from './routes/index.js'
import db from './config/db.js'

const app = express();

//conectar base de datos

db.authenticate()
    .then(() => console.log('Base de datos Conectada') )
    .catch( error => console.log(error));

//defiinir puerto

const port = process.env.PORT || 3000;

//Habilitar pug

app.set('view engine', 'pug');

//Obtener el anio actual

app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
})

//Agregar body parser para leer los datos del formulario

app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica

app.use(express.static('public'));

//Agregar router

app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta conectado en el puerto ${port}`)
})