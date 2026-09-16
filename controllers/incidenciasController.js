// Definimos los metodos 
// Arreglo en memoria obligatorio para persistencia
const incidencias = [];
// Contador para asignar los identificadores numericos unicos
let idContador = 1;


// ===== ENDPOINT ===== //

/* -- ENDPOINT 1: Registro de incidencias -- //
// POST /Incidencias
 Recibe: Empleado, Area, Descripcion, Prioridad */
const crearIncidencia = (req, res) => {
    // Obtenemos los datos
    const { Empleado, area, descripcion, prioridad } = req.body;

    res.status(501).json({ mensaje: "Por implementar" });
};

/* -- ENDPOINT 2: Listar de incidencias -- //
// GET / Indicidencias 
// Retorna: Todas las incidencias registradas en formato JSON */
const obtenerIncidencias = (req, res) => {

    res.status(200).json(incidencias);
};

/* -- ENDPOINT 3: Buscar Incidencia por ID -- //
// GET / Indicidencias:id
// Parametro: id(numerico) */
const obtenerIncidenciaPorId = (req, res) => {
    res.status(501).json({ mensaje: "Por implementar" });
};

/* -- ENDPOINT 4: Cambiar Estado de incidencia -- //
// PUT /Incidencias/:id/estado
// Parametro: estado */
const cambiarEstadoIncidencia = (req, res) => {
    res.status(501).json({ mensaje: "Por implementar" });
};

/* -- ENDPOINT 5: Elimar Incidencia -- //
// DELETE /incidencia/:id */
const elimarIncidencia = (req, res) => {
    res.status(501).json({ mensaje: "Por implementar" });
};

/* -- ENDPOINT 6: Estadisticas  -- //
// GET / Estadisticas  
// Retorna: totalIncidencias, pendientes, enProceso, resueltas, canceladas */
const obtenerEstadisticas = (req, res) => {

    res.status(501).json({ mensaje: "Por implementar" });
};

/* -- ENDPOINT 7: Clasificación Automática  -- //
// GET / Estadisticas/:id/clasificacion
// Parametros: id, clasificacions */
const obtenerClasificacion = (req, res) =>{
    res.status(501).json({ mensaje: "Por implementar" });
};

// Exportamos todos los métodos para ser consumidos en el archivo de rutas[cite: 1]
module.exports = {
    crearIncidencia,
    obtenerIncidencias,
    obtenerIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
};