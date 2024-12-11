const {
    getDepartments,
    getDepartmentById,
    getDepartmentByName
} = require('../departments/service');

// Obtener todos los departamentos
const fetchDepartments = async (req, res) => {
    try {
        const departments = await getDepartments();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching departments' });
    }
};

// Obtener un departamento por ID
const fetchDepartmentById = async (req, res) => {
    try {
        const department = await getDepartmentById(req.params.id);
        if (department) {
            res.json(department);
        } else {
            res.status(404).json({ error: 'Department not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching department by ID' });
    }
};

// Buscar departamentos por nombre
const searchDepartmentByName = async (req, res) => {
    const { name } = req.query; // Obtener el parámetro ?name=valor
    try {
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const departments = await getDepartmentByName(name);
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Error searching department by name' });
    }
};

module.exports = {
    fetchDepartments,
    fetchDepartmentById,
    searchDepartmentByName
};
