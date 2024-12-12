const {
    getAllMunicipalities,
    getMunicipalityById,
    getMunicipalityByName,
    getMunicipalitiesByDepartmentId,
    getMunicipalitiesByDepartmentName,
    assignMayor,
    removeMayor
} = require('../municipalities/service');

const fetchAllMunicipalities = async (req, res) => {
    try {
        const municipalities = await getAllMunicipalities();
        res.json(municipalities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching municipalities' });
    }
};

const fetchMunicipalityById = async (req, res) => {
    try {
        const municipality = await getMunicipalityById(req.params.id);
        if (municipality) {
            res.json(municipality);
        } else {
            res.status(404).json({ error: 'Municipality not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching municipality by ID' });
    }
};

const searchMunicipalitiesByName = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const municipalities = await getMunicipalityByName(name);
        res.json(municipalities);
    } catch (error) {
        res.status(500).json({ error: 'Error searching municipalities by name' });
    }
};

const fetchMunicipalitiesByDepartmentId = async (req, res) => {
    try {
        const municipalities = await getMunicipalitiesByDepartmentId(req.params.departmentId);
        res.json(municipalities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching municipalities by department ID' });
    }
};

const searchMunicipalitiesByDepartmentName = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            return res.status(400).json({ error: 'Department name parameter is required' });
        }
        const municipalities = await getMunicipalitiesByDepartmentName(name);
        res.json(municipalities);
    } catch (error) {
        res.status(500).json({ error: 'Error searching municipalities by department name' });
    }
};


// Asignar o actualizar un alcalde en un municipio
const assignMunicipalityMayor = async (req, res) => {
    const { id } = req.params; // ID del municipio
    const { alcaldeId } = req.body; // ID del alcalde

    try {
        if (!alcaldeId) {
            return res.status(400).json({ error: 'Mayor ID (alcaldeId) is required' });
        }
        const success = await assignMayor(id, alcaldeId);
        if (success) {
            res.json({ message: 'Mayor assigned successfully' });
        } else {
            res.status(404).json({ error: 'Municipality not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error assigning mayor' });
    }
};

// Eliminar el alcalde de un municipio
const removeMunicipalityMayor = async (req, res) => {
    const { id } = req.params; // ID del municipio

    try {
        const success = await removeMayor(id);
        if (success) {
            res.json({ message: 'Mayor removed successfully' });
        } else {
            res.status(404).json({ error: 'Municipality not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error removing mayor' });
    }
};


module.exports = {
    fetchAllMunicipalities,
    fetchMunicipalityById,
    searchMunicipalitiesByName,
    fetchMunicipalitiesByDepartmentId,
    searchMunicipalitiesByDepartmentName,
    assignMunicipalityMayor,
    removeMunicipalityMayor
};
