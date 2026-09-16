// Configuracion del servidor principal
const express = require('express');
const incidenciasRoutes = require('./routes/incidencias')

const app = express();
// Configuramos el puerto de salida
const PORT = 3000;

// parsear bodies en formato JSON
app.use(express.json());

// Rutas de la API
app.use('/', incidenciasRoutes);

// Validacion de ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Mensaje de salida
app.listen(PORT, () =>{
    console.log(`Servidor de TechSupport S.A. corriendo en http://localhost:${PORT}`)
})