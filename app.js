const express = require("express");
const path = require("path");
const fs = require("fs-extra");

const qrRoutes = require("./routes/qrRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Create folders automatically if they don't exist */
const folders = [
    "uploads",
    "qrcodes",
    "data"
];

folders.forEach(folder => {
    const folderPath = path.join(__dirname, folder);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
});

/* Serve QR Images */
app.use("/qrcodes", express.static(path.join(__dirname, "qrcodes")));

/* Home Route */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Advanced Node.js QR Code Generator API",
        version: "1.0.0"
    });
});

/* API Routes */
app.use("/api", qrRoutes);

// Invalid Route
app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

// Global Error Handler
app.use(errorHandler);

module.exports = app;