// Definicion de rutas
const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');

router.post('/incidencias', controller.crearIncidencia);
router.get('/ver', controller.obtenerIncidencias);

module.exports = router;

