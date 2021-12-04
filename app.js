'use strict';

//inclusión (mediante la orden require()) del módulo de Express y se crea una aplicación de Express
const express = require('express');
const app = express();

//definir el puerto de entrada del servidor
app.set('port', process.env.PORT | 3000);

//examinar las solicitudes codificadas con URL (solo analiza los cuerpos {urlencoded} 
//y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type);
//{extended: false} precisa que el objeto req.body contendrá pares clave - valores de tipo
//string o matriz únicamente.
app.use(express.urlencoded({ extended: false }));

//examinar las solicitudes donde está presente el encabezado Content-Type: application/json 
//y transforma la entrada JSON basada en texto en variables accesibles con JS en req.body 
app.use(express.json());  

//leer el archivo json ranges_parameters.json y lo almacena en la variable rangesParameters
const ranges_parameters = require('./api/emission-measurement/ranges_parameters/ranges_parameters.json');

//leer el archivo json limits.json y lo almacena en la variable limits
const limits = require('./api/emission-measurement/limits/limits.json');

//definicion de una función (callback) manejadora de ruta para peticiones HTTP GET
app.get('/api/emission-measurement/ranges_parameters', (req, res) => { 
    res.status(200).json(ranges_parameters);
}); 

//definicion de una función (callback) manejadora de ruta para peticiones HTTP POST
app.post('/api/emission-measurement/ranges_parameters', (req, res) => {
    //obtener el objeto con el nuevo rango de la petición POST
    const rangePost = req.body;
    //adicionar el objeto con el nuevo rango a la variable ranges_parameters
    ranges_parameters.push(rangePost);
    //devolver el objeto ranges_parameters con el nuevo rango
    res.status(200).json(ranges_parameters);
});

//definicion de una función (callback) manejadora de ruta para peticiones HTTP GET
app.get('/api/emission-measurement/limits', (req, res) => {
    //devolver el objeto limits
    res.status(200).json(limits);
});

//inicializar el servidor
app.listen(app.get('port'), function (err) {
    if (err) console.log(err);
    console.log(`Server started on port ${app.get('port')}`);
});

//exportar la aplicación de Express
module.exports = app;   
