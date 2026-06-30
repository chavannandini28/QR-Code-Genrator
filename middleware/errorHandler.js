const multer = require("multer");

const errorHandler = (err, req, res, next) => {

    console.error("\n========== ERROR ==========");
    console.error(err);
    console.error("===========================\n");

    // Multer Errors
    if (err instanceof multer.MulterError) {

        return res.status(400).json({
            success: false,
            error: "File Upload Error",
            message: err.message
        });

    }

    // Invalid File Type
    if (err.message === "Only PNG, JPG and JPEG images are allowed.") {

        return res.status(400).json({
            success: false,
            error: "Invalid File",
            message: err.message
        });

    }

    // File Not Found
    if (err.code === "ENOENT") {

        return res.status(404).json({
            success: false,
            error: "File Not Found",
            message: err.message
        });

    }

    // JSON Parse Error
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {

        return res.status(400).json({
            success: false,
            error: "Invalid JSON",
            message: "Request body contains invalid JSON."
        });

    }

    // Default Error
    res.status(err.status || 500).json({

        success: false,

        error: err.name || "Server Error",

        message: err.message || "Something went wrong.",

        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined

    });

};

module.exports = errorHandler;