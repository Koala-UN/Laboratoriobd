const express = require('express');
const router = express.Router();

const {
    fetchAllMunicipalities,
    fetchMunicipalityById,
    searchMunicipalitiesByName,
    fetchMunicipalitiesByDepartmentId,
    searchMunicipalitiesByDepartmentName,
    assignMunicipalityMayor,
    removeMunicipalityMayor
} = require('../municipalities/controller');

// Ruta para obtener todos los municipios
router.get('/', fetchAllMunicipalities);

// Ruta para obtener un municipio por ID
router.get('/:id', fetchMunicipalityById);

// Ruta para buscar municipios por nombre
router.get('/search/name', searchMunicipalitiesByName);

// Ruta para obtener municipios por ID del departamento
router.get('/department/:departmentId', fetchMunicipalitiesByDepartmentId);

// Ruta para buscar municipios por nombre del departamento
router.get('/search/department', searchMunicipalitiesByDepartmentName);

// Ruta para asignar o actualizar un alcalde en un municipio
router.patch('/:id/mayor', assignMunicipalityMayor);

// Ruta para eliminar el alcalde de un municipio
router.patch('/:id/remove-mayor', removeMunicipalityMayor);

module.exports = router;
