// zona/controller.js
const {
    getAllZones,
    getZoneById,
    getZonesByName,
    getZonesByMunicipioId,
    getZonesByMunicipioName,
    getZonesByType,
    createZone,
    updateZone,
    deleteZone
} = require('../zone/service');

// Get all zones
const fetchAllZones = async (req, res) => {
    try {
        const zones = await getAllZones();
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching zones' });
    }
};

// Get zone by ID
const fetchZoneById = async (req, res) => {
    try {
        const zone = await getZoneById(req.params.id);
        if (zone) {
            res.json(zone);
        } else {
            res.status(404).json({ error: 'Zone not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching zone by ID' });
    }
};

// Get zones by name
const fetchZonesByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const zones = await getZonesByName(name);
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching zones by name' });
    }
};

// Get zones by municipio ID
const fetchZonesByMunicipioId = async (req, res) => {
    try {
        const zones = await getZonesByMunicipioId(req.params.municipioId);
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching zones by municipio ID' });
    }
};

// Get zones by municipio name
const fetchZonesByMunicipioName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Municipio name parameter is required' });
        }
        const zones = await getZonesByMunicipioName(name);
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching zones by municipio name' });
    }
};

// Get zones by type
const fetchZonesByType = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({ error: 'Type parameter is required' });
        }
        const zones = await getZonesByType(type);
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching zones by type' });
    }
};

// Create a new zone
const createZoneHandler = async (req, res) => {
    try {
        const { nombre, municipio_id, tipo_zona } = req.body;

        // Verificar si ya existe una zona con los mismos datos
        const existingZone = await getZonesByName(nombre);
        if (existingZone.some(zona => zona.municipio_id === municipio_id && zona.tipo_zona === tipo_zona

        )) {
            return res.status(409).json({ error: 'Zone already exists' });
        }

        const newZone = await createZone(req.body);
        res.status(201).json(newZone);
    } catch (error) {
        res.status(500).json({ error: 'Error creating zone' });
    }
};
// Update a zone by ID
const updateZoneHandler = async (req, res) => {
    const zoneId = req.params.id;

    if (!zoneId) {
        return res.status(400).json({ error: 'Zone ID is required' });
    }

    try {
        const zone = await getZoneById(zoneId);
        if (!zone) {
            return res.status(404).json({ error: 'Zone not found' });
        }

        const updatedZone = await updateZone(zoneId, req.body);
        res.json(updatedZone);
    } catch (error) {
        res.status(500).json({ error: 'Error updating zone' });
    }
};

// Delete a zone by ID
const deleteZoneHandler = async (req, res) => {
    const zoneId = req.params.id;
    
    if (!zoneId) {
        return res.status(400).json({ error: 'Zone ID is required' });
    }

    try {
        const zone = await getZoneById(zoneId);
        if (!zone) {
            return res.status(404).json({ error: 'Zone not found' });
        }

        const result = await deleteZone(zoneId);
        res.json({ message: `Zone with ID ${zoneId} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting zone' });
    }
};

module.exports = {
    fetchAllZones,
    fetchZoneById,
    fetchZonesByName,
    fetchZonesByMunicipioId,
    fetchZonesByMunicipioName,
    fetchZonesByType,
    createZoneHandler,
    updateZoneHandler,
    deleteZoneHandler
};
