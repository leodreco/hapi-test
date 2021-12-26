class ValidationExeption extends Error {
    constructor(errors){
        super('La data enviada no cumple la validación');
        this.errors = errors.reduce((asd, error) => {
            asd[error.path] = error.message;
            return asd;
        }, {});
    }
}

module.exports = ValidationExeption;
