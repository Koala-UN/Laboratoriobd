const {
    getAllHouses,
    getHouseById,
    createHouse,
    updateHouse,
    deleteHouse,
    getHousesByZoneId,
    getHousesByMunicipality,
} = require('./service');

// Obtener todas las viviendas
const fetchAllHouses = async (req, res) => {
    try {
        const houses = await getAllHouses();
        res.json(houses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching houses' });
    }
};

// Obtener una vivienda por ID
const fetchHouseById = async (req, res) => {
    try {
        const house = await getHouseById(req.params.id);
        if (house) {
            res.json(house);
        } else {
            res.status(404).json({ error: 'House not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching house by ID' });
    }
};

// Crear una nueva vivienda
const addHouse = async (req, res) => {
    try {
        const houseId = await createHouse(req.body);
        res.status(201).json({ message: 'House created successfully', houseId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating house' });
    }
};

// Actualizar una vivienda
const modifyHouse = async (req, res) => {
    try {
        const success = await updateHouse(req.params.id, req.body);
        if (success) {
            res.json({ message: 'House updated successfully' });
        } else {
            res.status(404).json({ error: 'House not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating house' });
    }
};

// Eliminar una vivienda
const removeHouse = async (req, res) => {
    try {
        const success = await deleteHouse(req.params.id);
        if (success) {
            res.json({ message: 'House deleted successfully' });
        } else {
            res.status(404).json({ error: 'House not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting house' });
    }
};

// Obtener viviendas por zona (ID)
const fetchHousesByZoneId = async (req, res) => {
    try {
        const houses = await getHousesByZoneId(req.params.zoneId);
        res.json(houses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching houses by zone ID' });
    }
};

// Obtener viviendas por municipio (nombre o ID)
const fetchHousesByMunicipality = async (req, res) => {
    const { municipality } = req.query;
    try {
        if (!municipality) {
            return res.status(400).json({ error: 'Municipality parameter is required' });
        }
        const houses = await getHousesByMunicipality(municipality);
        res.json(houses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching houses by municipality' });
    }
};




module.exports = {
    fetchAllHouses,
    fetchHouseById,
    addHouse,
    modifyHouse,
    removeHouse,
    fetchHousesByZoneId,
    fetchHousesByMunicipality,
};
