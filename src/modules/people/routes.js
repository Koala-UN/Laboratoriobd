    const express = require('express');
    const router = express.Router();
    const {
        fetchAllPeople,
        fetchPeopleById,
        fetchPeopleByName,
        fetchPeopleBySexo,
        fetchPeopleByAgeRange,
        fetchPeopleByViviendaId,
        fetchPeopleByResponsableId,
        fetchPeopleByTelefono,
        fetchPeopleOrderedByName,
        fetchPeopleOrderedByAge,
        createPerson,
        updatePerson,
        removePersonById,
        removePeopleByViviendaId,
        removePeopleByResponsableId,
        fetchPeopleCount,
        fetchPeopleCountBySexo,
        fetchAverageAge,
        fetchPeopleCountByViviendaId,
        fetchPeopleCountByResponsableId,
        fetchPeopleByMunicipio,
        fetchPeopleWithViviendasPaginated,
        fetchViviendasByPersonaId,
        fetchPeopleOwnersByViviendaId
    } = require('./controller');

    // Ruta para obtener todas las personas
    router.get('/', fetchAllPeople);

    // Ruta para obtener personas ordenadas por nombre
    router.get('/ordered-by-name', fetchPeopleOrderedByName);

    // Ruta para obtener personas ordenadas por edad
    router.get('/ordered-by-age', fetchPeopleOrderedByAge);


    // Ruta para obtener personas por nombre
    router.get('/name', fetchPeopleByName);

    // Ruta para obtener personas por rango de edad
    router.get('/age', fetchPeopleByAgeRange);

    // Ruta para contar el número de personas
    router.get('/count', fetchPeopleCount);

    // Ruta para contar el número de personas por sexo
    router.get('/count-by-sexo', fetchPeopleCountBySexo);

    // Ruta para obtener la edad promedio de las personas
    router.get('/average-age', fetchAverageAge);

    // Ruta para obtener el número de personas por vivienda_id
    router.get('/count-by-vivienda', fetchPeopleCountByViviendaId);

    // Ruta para obtener el número de personas por responsable_id
    router.get('/count-by-responsable', fetchPeopleCountByResponsableId);

    // Ruta para obtener personas por id de municipio o nombre de municipio
    router.get('/municipio', fetchPeopleByMunicipio);

    // Ruta para obtener personas con sus viviendas, ordenadas por nombre de persona, con paginación
    router.get('/people-with-viviendas', fetchPeopleWithViviendasPaginated);

    // Ruta para obtener todas las viviendas de una persona por su id_persona
    router.get('/viviendas/:personaId', fetchViviendasByPersonaId);

    // Ruta para obtener todas las personas (dueños) que tienen X vivienda por su id_vivienda
    router.get('/owners/:viviendaId', fetchPeopleOwnersByViviendaId);



    // Ruta para obtener una persona por ID
    router.get('/:id', fetchPeopleById);


    // Ruta para obtener personas por sexo
    router.get('/sex/:sexo', fetchPeopleBySexo);


    // Ruta para obtener personas por vivienda_id
    router.get('/house/:viviendaId', fetchPeopleByViviendaId);

    // Ruta para obtener personas por responsable_id
    router.get('/responsable/:responsableId', fetchPeopleByResponsableId);

    // Ruta para obtener personas con un número de teléfono específico
    router.get('/phone/:telefono', fetchPeopleByTelefono);


    // Ruta para insertar una nueva persona
    router.post('/', createPerson);

    // Ruta para actualizar una persona de manera dinámica por ID
    router.put('/:id', updatePerson);

    // Ruta para eliminar una persona por ID
    router.delete('/:id', removePersonById);

    // Ruta para eliminar personas por vivienda_id
    router.delete('/house/:viviendaId', removePeopleByViviendaId);

    // Ruta para eliminar personas por responsable_id
    router.delete('/responsable/:responsableId', removePeopleByResponsableId);



    module.exports = router;