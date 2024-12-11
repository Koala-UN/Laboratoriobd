const express = require('express');
const helloRoutes = require('./modules/hello/routes');
const departments = require('./modules/departments/routes');
const app = express();

app.use(express.json());

// Registrar la ruta principal para "Hello World"
app.use('/api/hello', helloRoutes);
app.use('/api/departments', departments);
module.exports = app;
