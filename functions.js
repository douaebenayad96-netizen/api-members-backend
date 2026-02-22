// Fonction de succès
const success = (result) => {
    return {
        status: 'success',
        result: result,
        timestamp: new Date().toISOString()
    };
};

// Fonction d'erreur
const error = (message, code = 400) => {
    return {
        status: 'error',
        message: message,
        code: code,
        timestamp: new Date().toISOString()
    };
};

module.exports = { success, error };