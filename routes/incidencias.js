// Definicion de rutas
const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');

// ruta para agregar una incidencia 
router.post('/incidencias', controller.crearIncidencia);
//ruta para obtener todas las incidencias creadas 
router.get('/incidencias', controller.obtenerIncidencias);
//Ruta para obtener la incidencia por su id 
router.get('/incidencias/:id', controller.obtenerIncidenciaPorId);
//ruta para cambiar el estado de una incidencia
router.put('/incidencias/:id/estado', controller.cambiarEstadoIncidencia);
//rutas para eliminar una incidencia ya creada
router.delete('/incidencias/:id', controller.eliminarIncidencia);
//ruta para obner las estadisticas de las incidencias creadas
router.get('/estadisticas', controller.obtenerEstadisticas);
//ruta para obtener la clasificacion de una incidencia por su id
router.get('/estadisticas/:id/clasificacion', controller.obtenerClasificacion);

// se exporta el router para ser consumido en app.js
module.exports = router;

