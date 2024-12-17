const {
    getAllPeople,
    getPeopleById,
    getPeopleByName,
    getPeopleBySexo,
    getPeopleByAgeRange,
    getPeopleByViviendaId,
    getPeopleByResponsableId,
    getPeopleByTelefono,
    getPeopleOrderedByName,
    getPeopleOrderedByAge,
    insertPerson,
    updatePersonById,
    deletePersonById,
    deletePeopleByViviendaId,
    deletePeopleByResponsableId,
    countPeople,
    countPeopleBySexo,
    getAverageAge,
    countPeopleByViviendaId,
    countPeopleByResponsableId,
    getPeopleByMunicipio,
    getPeopleWithViviendasPaginated,
    getViviendasByPersonaId,
    getPeopleOwnersByViviendaId,
} = require('../people/service');

const fetchAllPeople = async (req, res) => {
    console.log('Fetching personas');
    try {
        const personas = await getAllPeople(req.query);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas' });
    }
};

const fetchPeopleById = async (req, res) => {
    try {
        const persona = await getPeopleById(req.params.id);
        if (persona) {
            res.json(persona);
        } else {
            res.status(404).json({ error: 'People not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching persona' });
    }
};

const fetchPeopleByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const personas = await getPeopleByName(name);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas by name' });
    }
};

const fetchPeopleBySexo = async (req, res) => {
    let sexo = req.params.sexo;
    if (sexo === 'Masculino' || sexo === 'M' || sexo === '0') {
        sexo = 'Masculino';
    } else if (sexo === 'Femenino' || sexo === 'F' || sexo === '1') {
        sexo = 'Femenino';
    }

    try {
        const personas = await getPeopleBySexo(sexo);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas by sexo' });
    }
};

const fetchPeopleByAgeRange = async (req, res) => {
    try {
        const { minAge, maxAge } = req.query;
        const personas = await getPeopleByAgeRange(minAge, maxAge);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas by age range' });
    }
};

const fetchPeopleByViviendaId = async (req, res) => {
    try {
        const personas = await getPeopleByViviendaId(req.params.viviendaId);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas by vivienda_id' });
    }
};

const fetchPeopleByResponsableId = async (req, res) => {
    try {
        const personas = await getPeopleByResponsableId(req.params.responsableId);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas by responsable_id' });
    }
};

const fetchPeopleByTelefono = async (req, res) => {
    try {
        const personas = await getPeopleByTelefono(req.params.telefono);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas by telefono' });
    }
};

const fetchPeopleOrderedByName = async (req, res) => {
    try {
        const personas = await getPeopleOrderedByName();
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas ordered by name' });
    }
};

const fetchPeopleOrderedByAge = async (req, res) => {
    try {
        const personas = await getPeopleOrderedByAge();
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas ordered by age' });
    }
};
const createPerson = async (req, res) => {
    try {
        const { nombre, sexo, edad, telefono, responsable_id, vivienda_id } = req.body;

        if (!Number.isInteger(Number(edad)) || Number(edad) < 0) {
            return res.status(400).json({ error: 'Age must be a positive integer' });
        }

        const newPersonId = await insertPerson(nombre, sexo, edad, telefono, responsable_id, vivienda_id);
        res.status(201).json({ id: newPersonId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating new person' });
    }
};

const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.edad && (!Number.isInteger(Number(updates.edad)) || Number(updates.edad) < 0)) {
            return res.status(400).json({ error: 'Age must be a positive integer' });
        }

        const affectedRows = await updatePersonById(id, updates);
        if (affectedRows > 0) {
            res.json({ message: 'Person updated successfully' });
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating person' });
    }
};


const removePersonById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting person with id:', id);
        const affectedRows = await deletePersonById(id);
        if (affectedRows > 0) {
            res.json({ message: 'Person deleted successfully' });
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting person' });
    }
};

const removePeopleByViviendaId = async (req, res) => {
    try {
        const { viviendaId } = req.params;
        const affectedRows = await deletePeopleByViviendaId(viviendaId);
        if (affectedRows > 0) {
            res.json({ message: 'People deleted successfully' });
        } else {
            res.status(404).json({ error: 'No people found for the given vivienda_id' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting people by vivienda_id' });
    }
};

const removePeopleByResponsableId = async (req, res) => {
    try {
        const { responsableId } = req.params;
        const affectedRows = await deletePeopleByResponsableId(responsableId);
        if (affectedRows > 0) {
            res.json({ message: 'People deleted successfully' });
        } else {
            res.status(404).json({ error: 'No people found for the given responsable_id' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting people by responsable_id' });
    }
};


const fetchPeopleCount = async (req, res) => {
    try {
        const count = await countPeople();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error counting people' });
    }
};

const fetchPeopleCountBySexo = async (req, res) => {
    try {
        const counts = await countPeopleBySexo();
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Error counting people by sexo' });
    }
};

const fetchAverageAge = async (req, res) => {
   // console.log('Fetching average age');
    try {
        const averageAge = await getAverageAge();
        res.json({ average_age: averageAge });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching average age' });
    }
};

const fetchPeopleCountByViviendaId = async (req, res) => {
    try {
        const counts = await countPeopleByViviendaId();
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Error counting people by vivienda_id' });
    }
};

const fetchPeopleCountByResponsableId = async (req, res) => {
    try {
        const counts = await countPeopleByResponsableId();
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Error counting people by responsable_id' });
    }
};

const fetchPeopleByMunicipio = async (req, res) => {
    console.log('Fetching personas by municipio');
    try {
        const personas = await getPeopleByMunicipio(req.query);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas by municipio' });
    }
};


const fetchPeopleWithViviendasPaginated = async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const personas = await getPeopleWithViviendasPaginated(parseInt(limit), parseInt(offset));
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching personas with viviendas paginated' });
    }
};

const fetchViviendasByPersonaId = async (req, res) => {
    try {
        const { personaId } = req.params;
        const viviendas = await getViviendasByPersonaId(personaId);
        res.json(viviendas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching viviendas by persona ID' });
    }
};

const fetchPeopleOwnersByViviendaId = async (req, res) => {
    try {
        const { viviendaId } = req.params;
        const personas = await getPeopleOwnersByViviendaId(viviendaId);
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching people by vivienda ID' });
    }
};

module.exports = {
    fetchPeopleOwnersByViviendaId,
    fetchViviendasByPersonaId,
    fetchPeopleWithViviendasPaginated,
    fetchPeopleByMunicipio,
    fetchPeopleCountByViviendaId,
    fetchPeopleCountByResponsableId,
    fetchPeopleCount,
    fetchPeopleCountBySexo,
    fetchAverageAge,
    removePersonById,
    removePeopleByViviendaId,
    removePeopleByResponsableId,
    fetchPeopleOrderedByAge,
    createPerson,
    updatePerson,
    fetchPeopleByResponsableId,
    fetchPeopleByTelefono,
    fetchPeopleOrderedByName,
    fetchAllPeople,
    fetchPeopleById,
    fetchPeopleByName,
    fetchPeopleBySexo,
    fetchPeopleByAgeRange,
    fetchPeopleByViviendaId
};