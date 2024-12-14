const pool = require("../../database/connection");

// Obtener todas las personas
async function getAllPeople() {
  const [rows] = await pool.query("SELECT * FROM persona");
  return rows;
}

// Obtener una persona por ID
async function getPeopleById(id) {
  const [rows] = await pool.query("SELECT * FROM persona WHERE id = ?", [id]);
  return rows[0];
}

// Obtener personas por nombre
async function getPeopleByName(nombre) {
  const [rows] = await pool.query("SELECT * FROM persona WHERE nombre LIKE ?", [
    `%${nombre}%`,
  ]);
  return rows;
}

// Obtener personas por sexo
async function getPeopleBySexo(sexo) {
  const [rows] = await pool.query("SELECT * FROM persona WHERE sexo = ?", [
    sexo,
  ]);
  return rows;
}

// Obtener personas por rango de edad
async function getPeopleByAgeRange(minAge, maxAge) {
  const [rows] = await pool.query(
    "SELECT * FROM persona WHERE edad BETWEEN ? AND ?",
    [minAge, maxAge]
  );
  return rows;
}

// Obtener personas VIVIENDO EN X VIVIENDA por vivienda_id
async function getPeopleByViviendaId(viviendaId) {
  const [rows] = await pool.query(
    "SELECT * FROM persona WHERE vivienda_id = ?",
    [viviendaId]
  );
  return rows;
}
// Obtener personas por responsable_id
async function getPeopleByResponsableId(responsableId) {
  const [rows] = await pool.query(
    "SELECT * FROM persona WHERE responsable_id = ?",
    [responsableId]
  );
  return rows;
}

// Obtener personas con un número de teléfono específico
async function getPeopleByTelefono(telefono) {
  const [rows] = await pool.query(
    "SELECT * FROM persona WHERE telefono LIKE ?",
    [`%${telefono}%`]
  );
  return rows;
}

// Obtener personas ordenadas por nombre
async function getPeopleOrderedByName() {
  const [rows] = await pool.query("SELECT * FROM persona ORDER BY nombre");
  return rows;
}

// Obtener personas ordenadas por edad
async function getPeopleOrderedByAge() {
  const [rows] = await pool.query("SELECT * FROM persona ORDER BY edad");
  return rows;
}

// Insertar una nueva persona
async function insertPerson(
  nombre,
  sexo,
  edad,
  telefono,
  responsable_id,
  vivienda_id
) {
  const [result] = await pool.query(
    "INSERT INTO persona (nombre, sexo, edad, telefono, responsable_id, vivienda_id) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, sexo, edad, telefono, responsable_id, vivienda_id]
  );
  return result.insertId;
}

// Actualizar una persona de manera dinámica por ID
async function updatePersonById(id, updates) {
  const fields = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(updates);
  values.push(id);

  const [result] = await pool.query(
    `UPDATE persona SET ${fields} WHERE id = ?`,
    values
  );
  return result.affectedRows;
}

// Eliminar una persona por ID
async function deletePersonById(id) {
  const [result] = await pool.query("DELETE FROM persona WHERE id = ?", [id]);
  return result.affectedRows;
}

// Eliminar personas por vivienda_id
async function deletePeopleByViviendaId(viviendaId) {
  const [result] = await pool.query(
    "DELETE FROM persona WHERE vivienda_id = ?",
    [viviendaId]
  );
  return result.affectedRows;
}

// Eliminar personas por responsable_id
async function deletePeopleByResponsableId(responsableId) {
  const [result] = await pool.query(
    "DELETE FROM persona WHERE responsable_id = ?",
    [responsableId]
  );
  return result.affectedRows;
}

// Contar el número de personas
async function countPeople() {
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM persona");
  return rows[0].count;
}

// Contar el número de personas por sexo
async function countPeopleBySexo() {
  const [rows] = await pool.query(
    "SELECT sexo, COUNT(*) AS count FROM persona GROUP BY sexo"
  );
  return rows;
}

// Obtener la edad promedio de las personas
async function getAverageAge() {
  const [rows] = await pool.query(
    "SELECT AVG(edad) AS average_age FROM persona"
  );
  return rows[0].average_age;
}

// Obtener el número de personas por vivienda_id
async function countPeopleByViviendaId() {
  const [rows] = await pool.query(
    "SELECT vivienda_id, COUNT(*) AS count FROM persona GROUP BY vivienda_id"
  );
  return rows;
}

// Obtener el número de personas por responsable_id
async function countPeopleByResponsableId() {
  const [rows] = await pool.query(
    "SELECT responsable_id, COUNT(*) AS count FROM persona GROUP BY responsable_id"
  );
  return rows;
}

// Obtener personas por id de municipio o nombre de municipio
async function getPeopleByMunicipio(query) {
  let sql = `
  SELECT p.*, m.nombre AS municipio_nombre
  FROM persona p
  JOIN vivienda v ON p.vivienda_id = v.id
  JOIN zona z ON v.zona_id = z.id
  JOIN municipio m ON z.municipio_id = m.id`;

  let params = [];

  if (query.municipioId) {
    sql += " WHERE m.id = ?";
    params.push(query.municipioId);
  } else if (query.municipioName) {
    sql += " WHERE m.nombre = ?";
    params.push(query.municipioName);
  } else {
    throw new Error("No se proporcionó un ID o nombre de municipio");
  }

  console.log(
    "Fetching personas by municipio SQL. " +
      query.municipioId +
      " " +
      query.municipioName +
      " " +
      sql
  );

  const [rows] = await pool.query(sql, params);
  return rows;
}

// Obtener personas con sus viviendas, ordenadas por nombre de persona, con paginación
async function getPeopleWithViviendasPaginated(limit, offset) {
  const sql = `
      SELECT p.*, v.*, m.nombre AS municipio_nombre
      FROM persona p
      JOIN persona_has_vivienda phv ON p.id = phv.persona_id
      JOIN vivienda v ON phv.vivienda_id = v.id
      JOIN zona z ON v.zona_id = z.id
      JOIN municipio m ON z.municipio_id = m.id
      ORDER BY p.nombre
      LIMIT ? OFFSET ?;
  `;
  const [rows] = await pool.query(sql, [limit, offset]);
  return rows;
}

// Obtener todas las viviendas de una persona por su id_persona
async function getViviendasByPersonaId(personaId) {
  const sql = `
      SELECT v.*
      FROM vivienda v
      JOIN persona_has_vivienda phv ON v.id = phv.vivienda_id
      WHERE phv.persona_id = ?;
  `;
  const [rows] = await pool.query(sql, [personaId]);
  return rows;
}

// Obtener todas las personas (dueños) que tienen X vivienda mediante id_vivienda
async function getPeopleOwnersByViviendaId(viviendaId) {
  const sql = `
      SELECT p.*
      FROM persona p
      JOIN persona_has_vivienda phv ON p.id = phv.persona_id
      WHERE phv.vivienda_id = ?;
  `;
  const [rows] = await pool.query(sql, [viviendaId]);
  return rows;
}

module.exports = {
  getPeopleOwnersByViviendaId,
  getViviendasByPersonaId,
  getPeopleWithViviendasPaginated,
  getPeopleByMunicipio,
  countPeopleByViviendaId,
  countPeopleByResponsableId,
  countPeople,
  countPeopleBySexo,
  getAverageAge,
  deletePersonById,
  deletePeopleByViviendaId,
  deletePeopleByResponsableId,
  getPeopleOrderedByAge,
  insertPerson,
  updatePersonById,
  getPeopleByResponsableId,
  getPeopleByTelefono,
  getPeopleOrderedByName,
  getAllPeople,
  getPeopleById,
  getPeopleByName,
  getPeopleBySexo,
  getPeopleByAgeRange,
  getPeopleByViviendaId,
};
