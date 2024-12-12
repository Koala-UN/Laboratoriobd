const pool = require('../../database/connection');

// Obtener todas las viviendas
const getAllHouses = async () => {
    const [rows] = await pool.query('SELECT * FROM vivienda');
    return rows;
};

// Obtener una vivienda por ID
const getHouseById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM vivienda WHERE id = ?', [id]);
    return rows[0];
};

// Crear una nueva vivienda
const createHouse = async (houseData) => {
    const { direccion, capacidad, niveles, zona_id } = houseData;
    const [result] = await pool.query(
        'INSERT INTO vivienda (direccion, capacidad, niveles, zona_id) VALUES (?, ?, ?, ?)',
        [direccion, capacidad, niveles, zona_id]
    );
    return result.insertId; // Retorna el ID de la vivienda creada
};

// Actualizar una vivienda
const updateHouse = async (id, houseData) => {
    const { direccion, capacidad, niveles, zona_id } = houseData;
    const [result] = await pool.query(
        'UPDATE vivienda SET direccion = ?, capacidad = ?, niveles = ?, zona_id = ? WHERE id = ?',
        [direccion, capacidad, niveles, zona_id, id]
    );
    return result.affectedRows > 0; // Retorna true si se actualizó
};

// Eliminar una vivienda
const deleteHouse = async (id) => {
    const [result] = await pool.query('DELETE FROM vivienda WHERE id = ?', [id]);
    return result.affectedRows > 0; // Retorna true si se eliminó
};

// Obtener viviendas por zona (ID)
const getHousesByZoneId = async (zoneId) => {
    const [rows] = await pool.query('SELECT * FROM vivienda WHERE zona_id = ?', [zoneId]);
    return rows;
};

// Obtener viviendas por municipio (nombre o ID)
const getHousesByMunicipality = async (municipality) => {
    const query = `
        SELECT vivienda.*
        FROM vivienda
        INNER JOIN zona ON vivienda.zona_id = zona.id
        INNER JOIN municipio ON zona.municipio_id = municipio.id
        WHERE municipio.id = ? OR municipio.nombre LIKE ?`;
    const [rows] = await pool.query(query, [municipality, `%${municipality}%`]);
    return rows;
};


module.exports = {
    getAllHouses,
    getHouseById,
    createHouse,
    updateHouse,
    deleteHouse,
    getHousesByZoneId,
    getHousesByMunicipality,
};
