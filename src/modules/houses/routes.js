const express = require('express');
const router = express.Router();
const {
    fetchAllHouses,
    fetchHouseById,
    addHouse,
    modifyHouse,
    removeHouse,
    fetchHousesByZoneId,
    fetchHousesByMunicipality,
} = require('./controller');

// Rutas
router.get('/', fetchAllHouses);
router.get('/:id', fetchHouseById);
router.post('/', addHouse);
router.patch('/:id', modifyHouse);
router.delete('/:id', removeHouse);
router.get('/zone/:zoneId', fetchHousesByZoneId);
router.get('/search/municipality', fetchHousesByMunicipality);


module.exports = router;
