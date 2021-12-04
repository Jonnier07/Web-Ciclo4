'use strict';

const express = require('express');
const app = express();

app.set('port', process.env.PORT | 3000);
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());  

const ranges_parameters = require('./api/emission-measurement/ranges_parameters/ranges_parameters.json');
const limits = require('./api/emission-measurement/limits/limits.json');

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