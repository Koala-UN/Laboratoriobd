const service = require('./service');

const getDepartments = async (req, res) => {
    try {
        const departments = await service.getDepartments();

        // Caso: No hay departamentos registrados
        if (departments.length === 0) {
            return res.status(404).json({ error: 'No departments found.' });
        }

        // Caso: Departamentos encontrados
        res.status(200).json(departments);
    } catch (error) {
        // Caso: Error de conexión a la base de datos
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({ error: 'Database connection failed. Please try again later.' });
        }

        // Caso: Error genérico inesperado
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

module.exports = { getDepartments };
