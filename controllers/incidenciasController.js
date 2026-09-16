const { limpiarTexto } = require('../utils/helpers');
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
    const { empleado, area, descripcion, prioridad } = req.body;

    // Validamos los campos
    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }

    // Limpieza de espacios y validación de cadenas vacías con trim()[cite: 1]
    const empLimpio = limpiarTexto(empleado);
    const areaLimpia = limpiarTexto(area);
    const descLimpia = limpiarTexto(descripcion);
    const prioLimpia = limpiarTexto(prioridad);

    if (!empLimpio || !areaLimpia || !descLimpia || !prioLimpia) {
        return res.status(400).json({ mensaje: "No se permiten campos con cadenas vacías" });
    }

    // Validación de prioridad permitida usando toLowerCase()[cite: 1]
    const prioridadNormalizada = prioLimpia.toLowerCase();
    let prioridadValida = "";

    switch (prioridadNormalizada) {
        case "alta":
            prioridadValida = "Alta";
            break;
        case "media":
            prioridadValida = "Media";
            break;
        case "baja":
            prioridadValida = "Baja";
            break;
        default:
            return res.status(400).json({ mensaje: "Prioridad no válida. Debe ser Alta, Media o Baja" });
    }

    // Creación de la nueva incidencia con estado inicial Pendiente
    const nuevaIncidencia = {
        id: idContador++,
        empleado: empLimpio,
        area: areaLimpia,
        descripcion: descLimpia,
        prioridad: prioridadValida,
        estado: "Pendiente"
    };

    // Almacenamiento en el arreglo usando push()
    incidencias.push(nuevaIncidencia);

    // Mensaje de e
    return res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
};

/* -- ENDPOINT 2: Listar de incidencias -- //
// GET / Indicidencias 
// Retorna: Todas las incidencias registradas en formato JSON */
const obtenerIncidencias = (req, res) => {
    return res.status(200).json(incidencias);
};

/* -- ENDPOINT 3: Buscar Incidencia por ID -- //
// GET / Indicidencias:id
// Parametro: id(numerico) */
const obtenerIncidenciaPorId = (req, res) => {

    // Extraemos el parametro de la URL y lo convertimos
    const id = Number(req.params.id);
    // Buscamos el elemento con el metodo find()
    const incidencia = incidencias.find((item) => item.id === id);

    // Validacion si no fue encontrada
    if (!incidencia) {
        // Mensaje de error
        return res.status(404).json({ mensaje: "Incidencia no encontrada" })
    }

    // Retornamos las incidencias
    return res.status(200).json(incidencia);
};

/* -- ENDPOINT 4: Cambiar Estado de incidencia -- //
// PUT /Incidencias/:id/estado
// Parametro: estado */
const cambiarEstadoIncidencia = (req, res) => {
    // Extraemos el id para convertirlo
    const id = Number(req.params.id);
    // Definimos el estado
    const { estado } = req.body;

    // Validacion de campo
    if (!estado) {
        return res.status(400).json({ mensaje: "El campo es obligatorio" })
    }

    // Buscamos la incidencia por medio del id con find()
    const estadoLimpio = limpiarTexto(estado).toLowerCase();
    let nuevoEstado = "";

    // Validación de estados
    switch (estadoLimpio) {
        case "pendiente":
            nuevoEstado = "Pendiente";
            break;
        case "en proceso":
            nuevoEstado = "En Proceso";
            break;
        case "resuelta":
            nuevoEstado = "Resuelta";
            break;
        case "cancelada":
            nuevoEstado = "Cancelada";
            break;
        default:
            return res.status(400).json({
                mensaje: "Estado no válido. Opciones permitidas: Pendiente, En Proceso, Resuelta, Cancelada"
            });
    }
    // Mandamos el nuevo estado
    incidencia.estado = nuevoEstado;

    // Mensaje de exito
    return res.status(200).json({
        mensaje: "Estado de incidencia actualizado correctamente", incidencia
    })
};

/* -- ENDPOINT 5: Elimar Incidencia -- //
// DELETE /incidencia/:id */
const eliminarIncidencia = (req, res) => {
    // Obtenemos el parametro del ID y lo convertimos
    const id = Number(req.params.id);

    // Localizamos el indice mediante findIndex()
    const index = incidencias.findIndex((item) => item.id === id);

    // Si no existe
    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada." })
    }

    // Eliminamos el elemento con splice()
    incidencias.splice(index, 1);

    // Mensaje de exito
    return res.status(200).json({ mensaje: "Incidencia eliminada." });
};

/* -- ENDPOINT 6: Estadisticas  -- //
// GET / Estadisticas  
// Retorna: totalIncidencias, pendientes, enProceso, resueltas, canceladas */
const obtenerEstadisticas = (req, res) => {
    // Calculamos sin variables contadoras manuales usando reduce()
    const estadistica = incidencia.reduce(
        (acumulador, actual) => {
            acumulador.totalIncidencias++;
            switch (actual.estado) {
                case "Pendiente":
                    acumulador.pendientes++;
                    break;
                case "En Proceso":
                    acumulador.enProceso++;
                    break;
                case "Resuelta":
                    acumulador.resueltas++;
                    break;
                case "Cancelada":
                    acumulador.canceladas++;
                    break;
            }
            return acumulador;
        },
        {
            //Estadistica
            totalIncidencias: 0,
            pendientes: 0,
            enProceso: 0,
            resueltas: 0,
            canceladas: 0
        }
    );
        // Retornamos la estadistica
        return res.status(200).json(estadistica);
};

/* -- ENDPOINT 7: Clasificación Automática  -- //
// GET / Estadisticas/:id/clasificacion
// Parametros: id, clasificacions */
const obtenerClasificacion = (req, res) => {
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