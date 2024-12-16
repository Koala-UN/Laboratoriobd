// zona/routes.js
const express = require('express');
const router = express.Router();
const {
    fetchAllZones,
    fetchZoneById,
    fetchZonesByName,
    fetchZonesByMunicipioId,
    fetchZonesByMunicipioName,
    fetchZonesByType,
    createZoneHandler,
    updateZoneHandler,
    deleteZoneHandler
} = require('../zone/controller');

router.get('/', fetchAllZones);
router.get('/:id', fetchZoneById);
router.get('/search/name', fetchZonesByName);
router.get('/municipio/:municipioId', fetchZonesByMunicipioId);
router.get('/search/municipio', fetchZonesByMunicipioName);
router.get('/search/type', fetchZonesByType);
router.post('/', createZoneHandler);
router.put('/:id', updateZoneHandler);
router.delete('/:id', deleteZoneHandler);

module.exports = router;
