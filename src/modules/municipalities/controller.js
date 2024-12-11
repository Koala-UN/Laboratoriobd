const {
    getAllMunicipalities,
    getMunicipalityById,
    getMunicipalityByName,
    getMunicipalitiesByDepartmentId,
    getMunicipalitiesByDepartmentName
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

module.exports = {
    fetchAllMunicipalities,
    fetchMunicipalityById,
    searchMunicipalitiesByName,
    fetchMunicipalitiesByDepartmentId,
    searchMunicipalitiesByDepartmentName
};
