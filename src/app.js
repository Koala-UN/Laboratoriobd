const express = require('express');
const helloRoutes = require('./modules/hello/routes');
const departments = require('./modules/departments/routes');
const municipalities = require('./modules/municipalities/routes');
const app = express();

app.use(express.json());

// Registrar la ruta principal para "Hello World"
app.use('/api/hello', helloRoutes);
app.use('/api/departments', departments);
app.use('/api/municipalities', municipalities);
module.exports = app;
