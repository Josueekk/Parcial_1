/**
 * Limpia y normaliza cadenas de texto.
 * Valida que el dato sea un string y elimina espacios en blanco al inicio y al final con trim().
 */
const limpiarTexto = (texto) => {
    if (typeof texto === 'string') {
        return texto.trim();
    }
    return '';
};

/*
Obtiene el valor de la prioridad, normaliza su formato y verifica cual condicion cumple por medio de un switch
*/ 
const verificarPrioridad = (prioridad) =>{

    const prioridadFinal = prioridad.toString().toLowerCase().trim()

    switch (prioridadFinal) {
        case 'baja':
            return 'Baja'
        case 'media':
            return 'Media'
        case 'alta':
            return 'Alta'       
        default:
            return null
            
    }
};

/*
Obtiene el valor del estado, normaliza su formato y verifica cual condicion cumple por medio de un switch
*/
const verificarEstadoIncidencia = (estado) =>{

    const estadoFinal = estado.toString().toLowerCase().trim()

    switch (estadoFinal) {
        case 'pendiente':
            return 'Pendiente';
        case 'en proceso':
            return 'En Proceso';
        case 'resuelta':
            return 'Resuelta';
        case 'cancelada':
            return 'Cancelada';
        default:
            return null;
    }
};

/*
Obtiene el valor de la prioridad, normaliza su formato y verifica cual condicion cumple por medio de un switch. Luego retorna el valor de la clasificacion
*/
const verificarClasificacionIncidencia = (prioridad) =>{

    const clasificacionFinal = prioridad.toString().toLowerCase().trim()

    switch (clasificacionFinal) {
        case 'alta':
            return 'Crítica';
        case 'media':
            return 'Importante';
        case 'baja':
            return 'Normal';
            default:
                return 'No clasificada';
    }
};

module.exports = {
    limpiarTexto,
    verificarPrioridad,
    verificarEstadoIncidencia,
    verificarClasificacionIncidencia
};