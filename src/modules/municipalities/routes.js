const express = require('express');
const router = express.Router();
const {
    fetchAllMunicipalities,
    fetchMunicipalityById,
    searchMunicipalitiesByName,
    fetchMunicipalitiesByDepartmentId,
    searchMunicipalitiesByDepartmentName
} = require('../municipalities/controller');

// Route to fetch all municipalities
router.get('/', fetchAllMunicipalities);

// Route to fetch a municipality by ID
router.get('/:id', fetchMunicipalityById);

// Route to search municipalities by name
router.get('/search/name', searchMunicipalitiesByName);

// Route to fetch municipalities by department ID
router.get('/department/:departmentId', fetchMunicipalitiesByDepartmentId);

// Route to search municipalities by department name
router.get('/search/department', searchMunicipalitiesByDepartmentName);

module.exports = router;
