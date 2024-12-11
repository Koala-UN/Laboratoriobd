const pool = require('../../database/connection');

const getAllMunicipalities = async () => {
    const [rows] = await pool.query('SELECT * FROM municipio');
    return rows;
};

const getMunicipalityById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM municipio WHERE id = ?', [id]);
    return rows[0]; // Return only one result
};

const getMunicipalityByName = async (name) => {
    const [rows] = await pool.query('SELECT * FROM municipio WHERE nombre LIKE ?', [`%${name}%`]);
    return rows; // Can return multiple results if the name is similar
};

const getMunicipalitiesByDepartmentId = async (departmentId) => {
    const [rows] = await pool.query('SELECT * FROM municipio WHERE departamento_id = ?', [departmentId]);
    return rows;
};

const getMunicipalitiesByDepartmentName = async (departmentName) => {
    const query = `
        SELECT municipio.*
        FROM municipio
        INNER JOIN departamento ON municipio.departamento_id = departamento.id
        WHERE departamento.nombre LIKE ?`;
    const [rows] = await pool.query(query, [`%${departmentName}%`]);
    return rows;
};

module.exports = {
    getAllMunicipalities,
    getMunicipalityById,
    getMunicipalityByName,
    getMunicipalitiesByDepartmentId,
    getMunicipalitiesByDepartmentName
};