const pool = require('../../database/connection');

const getDepartments = async () => {
    const [rows] = await pool.query('SELECT * FROM departamento');
    return rows;
};


module.exports = { getDepartments};
