'use strict';

const express = require('express');
const app = express();

app.set('port', process.env.PORT | 3000);
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());   

const ranges_parameters = [
  { "etiqueta": "Monoxido de carbono", "de": 0, "hasta": 10 },
  { "etiqueta": "Dioxido de carbono", "de": 0, "hasta": 20 },
  { "etiqueta": "Hidrocarburos", "de": 0, "hasta": 10000 },
  { "etiqueta": "Oxigeno", "de": 0, "hasta": 22 }    
];

const limits = {
  "Parametro CO en rango estandar": 10,
  "Parametro CO2 en rango estandar":20,
  "Parametro HC en rango estandar": 10000,
  "Parametro O2 en rango estandar": 22
};

app.get('/api/emission-measurement/ranges_parameters', (req, res) => { 
    res.status(200).json(ranges_parameters);
}); 

app.post('/api/emission-measurement/ranges_parameters', (req, res) => {
    const rangePost = req.body;
    ranges_parameters.push(rangePost);
    res.status(200).json(ranges_parameters);
});

app.get('/api/emission-measurement/limits', (req, res) => {
  res.status(200).json(limits);
});

app.listen(app.get('port'), function (err) {
    if (err) console.log(err);
    console.log(`Server started on port ${app.get('port')}`);
});

module.exports = app;   