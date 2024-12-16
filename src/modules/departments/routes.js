const express = require('express');
const router = express.Router();
const {
    fetchDepartments,
    fetchDepartmentById,
    searchDepartmentByName
} = require('../departments/controller');

// Ruta para obtener todos los departamentos
router.get('/', fetchDepartments);

// Ruta para buscar un departamento por ID
router.get('/:id', fetchDepartmentById);

// Ruta para buscar un departamento por nombre
router.get('/search/name', searchDepartmentByName);

module.exports = router;
