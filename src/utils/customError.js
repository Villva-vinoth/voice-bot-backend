class CustomError extends Error {
    constructor(message,statusCode=400,name='ValidationError') {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

module.exports = CustomError;       