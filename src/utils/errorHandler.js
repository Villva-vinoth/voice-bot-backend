const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    console.log("err", err.message);
    res.status(status).json({
        success: false,
        error: err.name || "InternalServerError",
        message: err.message || "Something went wrong",
    });
};

module.exports = { errorHandler };