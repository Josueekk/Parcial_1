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

module.exports = {
    limpiarTexto
};