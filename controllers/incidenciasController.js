const { limpiarTexto, verificarPrioridad, verificarEstadoIncidencia, verificarClasificacionIncidencia } = require('../utils/helpers');
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

    // Limpieza de espacios y validación de cadenas vacías con trim()
    const empLimpio = limpiarTexto(empleado);
    const areaLimpia = limpiarTexto(area);
    const descLimpia = limpiarTexto(descripcion);
    

    if (!empLimpio || !areaLimpia || !descLimpia) {
        return res.status(400).json({ mensaje: "No se permiten campos con cadenas vacías" });
    }

    const prioridadValida = verificarPrioridad(prioridad)
    // Validación de prioridad por medio de helper
    if (!prioridadValida) {
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

    //* Para cambiar el metodo de busqueda cambiamos Number(req.params.id) y agregamos el parametro que vayamos a buscar
    //en caso de cambiar el nombre de la constante, tambien hay que cambiar ese nombre en la ruta de ObtenerporId y hay que cambiarlo 
    //en incidencias.find tambien
    const id = Number(req.params.id); 
    // Buscamos el elemento con el metodo find()
    const incidencia = incidencias.find((item) => item.id === id); //aqui cambiamos el item.id por el parametro a buscar


    //buscar por nombre
    //const nombreB = req.params.empleado; 
    //const nombre = nombreB.toLowerCase().trim();
    //const incidencia = incidencias.filter((item) => {return item.empleado.toLowerCase.includes(nombre)});

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
    const incidencia = incidencias.find((item) => item.id === id);

    // Validacion si no fue encontrada
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" })
    }

    const estadoValidado = verificarEstadoIncidencia(estado);
    

    if (!estadoValidado) {
        return res.status(400).json({
                mensaje: "Estado no válido. Opciones permitidas: Pendiente, En Proceso, Resuelta, Cancelada"
            });
    }

    // Validación de estados
    
    // Mandamos el nuevo estado
    incidencia.estado = estadoValidado;

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
    const estadistica = incidencias.reduce(
        (acumulador, actual) => {
            //El callback que recibe la funcion reduce. Indica qué queremos que ocurra con cada elemento del arreglo
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
        //valor actual que recibe la funcion reduce. Punto de partida
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
    const id = Number(req.params.id);
    // Buscamos la incidencia por medio del id con find()
    const incidencia = incidencias.find((item) => item.id === id);

    // Validacion si no fue encontrada
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" })
    }

    const clasificacion = verificarClasificacionIncidencia(incidencia.prioridad)
    
    
    //Si piden clasificacion como mayusculas agregar toUpperCase() a la clasificacion
    // FORMATO DE SALIDA
    return res.status(200).json({
        id: incidencia.id,
        clasificacion: clasificacion 
    });
};

// Exportamos todos los métodos para ser consumidos en el archivo de rutas
module.exports = {
    crearIncidencia,
    obtenerIncidencias,
    obtenerIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
};