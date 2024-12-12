const pool = require('../../database/connection');

// Obtener todos los municipios
const getAllMunicipalities = async () => {
    const [rows] = await pool.query(`
        SELECT municipio.*, departamento.nombre AS departamento_nombre, persona.nombre AS alcalde_nombre
        FROM municipio
        LEFT JOIN departamento ON municipio.departamento_id = departamento.id
        LEFT JOIN persona ON municipio.alcalde_id = persona.id
    `);
    return rows;
};

// Obtener un municipio por ID
const getMunicipalityById = async (id) => {
    const [rows] = await pool.query(`
        SELECT municipio.*, departamento.nombre AS departamento_nombre, persona.nombre AS alcalde_nombre
        FROM municipio
        LEFT JOIN departamento ON municipio.departamento_id = departamento.id
        LEFT JOIN persona ON municipio.alcalde_id = persona.id
        WHERE municipio.id = ?
    `, [id]);
    return rows[0]; // Retorna un solo resultado
};

// Obtener municipios por nombre (similar)
const getMunicipalityByName = async (name) => {
    const [rows] = await pool.query(`
        SELECT municipio.*, departamento.nombre AS departamento_nombre, persona.nombre AS alcalde_nombre
        FROM municipio
        LEFT JOIN departamento ON municipio.departamento_id = departamento.id
        LEFT JOIN persona ON municipio.alcalde_id = persona.id
        WHERE municipio.nombre LIKE ?
    `, [`%${name}%`]);
    return rows;
};

// Obtener municipios por ID del departamento
const getMunicipalitiesByDepartmentId = async (departmentId) => {
    const [rows] = await pool.query(`
        SELECT municipio.*, departamento.nombre AS departamento_nombre, persona.nombre AS alcalde_nombre
        FROM municipio
        LEFT JOIN departamento ON municipio.departamento_id = departamento.id
        LEFT JOIN persona ON municipio.alcalde_id = persona.id
        WHERE municipio.departamento_id = ?
    `, [departmentId]);
    return rows;
};

// Obtener municipios por nombre del departamento
const getMunicipalitiesByDepartmentName = async (departmentName) => {
    const query = `
        SELECT municipio.*, departamento.nombre AS departamento_nombre, persona.nombre AS alcalde_nombre
        FROM municipio
        INNER JOIN departamento ON municipio.departamento_id = departamento.id
        LEFT JOIN persona ON municipio.alcalde_id = persona.id
        WHERE departamento.nombre LIKE ?
    `;
    const [rows] = await pool.query(query, [`%${departmentName}%`]);
    return rows;
};

// Asignar o actualizar un alcalde en un municipio
const assignMayor = async (municipioId, alcaldeId) => {
    // Verificar si el alcalde existe
    const [mayorExists] = await pool.query('SELECT id FROM persona WHERE id = ?', [alcaldeId]);
    if (mayorExists.length === 0) {
        throw new Error('The specified mayor does not exist');
    }

    // Actualizar el alcalde en el municipio
    const [result] = await pool.query('UPDATE municipio SET alcalde_id = ? WHERE id = ?', [alcaldeId, municipioId]);
    return result.affectedRows > 0; // Retorna true si se actualizó
};

// Eliminar un alcalde de un municipio
const removeMayor = async (municipioId) => {
    const [result] = await pool.query('UPDATE municipio SET alcalde_id = NULL WHERE id = ?', [municipioId]);
    return result.affectedRows > 0; // Retorna true si se actualizó
};

module.exports = {
    getAllMunicipalities,
    getMunicipalityById,
    getMunicipalityByName,
    getMunicipalitiesByDepartmentId,
    getMunicipalitiesByDepartmentName,
    assignMayor,
    removeMayor
};
