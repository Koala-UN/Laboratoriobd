const pool = require('../../database/connection');

const getDepartments = async () => {
    const [rows] = await pool.query('SELECT * FROM departamento');
    return rows;
};

const getDepartmentById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM departamento WHERE id = ?', [id]);
    return rows[0]; // Devolver solo un resultado
};

const getDepartmentByName = async (name) => {
    const [rows] = await pool.query('SELECT * FROM departamento WHERE nombre LIKE ?', [`%${name}%`]);
    return rows; // Puede devolver varios resultados si el nombre es similar
};

module.exports = { getDepartments, getDepartmentById, getDepartmentByName };
