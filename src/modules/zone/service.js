// zona/service.js
const pool = require('../../database/connection');

// Get all zones
const getAllZones = async () => {
    const [rows] = await pool.query('SELECT * FROM zona');
    return rows;
};

// Get zone by ID
const getZoneById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM zona WHERE id = ?', [id]);
    return rows[0];
};

// Get zones by name
const getZonesByName = async (name) => {
    const [rows] = await pool.query('SELECT * FROM zona WHERE nombre LIKE ?', [`%${name}%`]);
    return rows;
};

// Get zones by municipio ID
const getZonesByMunicipioId = async (municipioId) => {
    const [rows] = await pool.query('SELECT * FROM zona WHERE municipio_id = ?', [municipioId]);
    return rows;
};

// Get zones by municipio name
const getZonesByMunicipioName = async (municipioName) => {
    const [rows] = await pool.query(
        `SELECT zona.* FROM zona 
         INNER JOIN municipio ON zona.municipio_id = municipio.id 
         WHERE municipio.nombre LIKE ?`, 
        [`%${municipioName}%`]
    );
    return rows;
};

// Get zones by type (barrio or vereda)
const getZonesByType = async (type) => {
    const [rows] = await pool.query('SELECT * FROM zona WHERE tipo_zona_id = ?', [type]);
    return rows;
};

// Create a new zone
const createZone = async (zone) => {
    const { nombre, municipio_id, tipo_zona_id } = zone;
    const [result] = await pool.query(
        'INSERT INTO zona (nombre, municipio_id, tipo_zona_id) VALUES (?, ?, ?)',
        [nombre, municipio_id, tipo_zona_id]
    );
    return { id: result.insertId, ...zone };
};

// Update a zone by ID
const updateZone = async (id, updatedZone) => {
    const { nombre, municipio_id, tipo_zona_id } = updatedZone;
    await pool.query(
        'UPDATE zona SET nombre = ?, municipio_id = ?, tipo_zona_id = ? WHERE id = ?',
        [nombre, municipio_id, tipo_zona_id, id]
    );
    return { id, ...updatedZone };
};

// Delete a zone by ID
const deleteZone = async (id) => {
    await pool.query('DELETE FROM zona WHERE id = ?', [id]);
    return { message: `Zone with ID ${id} deleted successfully` };
};

module.exports = {
    getAllZones,
    getZoneById,
    getZonesByName,
    getZonesByMunicipioId,
    getZonesByMunicipioName,
    getZonesByType,
    createZone,
    updateZone,
    deleteZone
};
