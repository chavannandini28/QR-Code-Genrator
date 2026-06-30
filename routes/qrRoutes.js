const express = require("express");
const multer = require("multer");
const path = require("path");

const {
    generateQRCode,
    listQRCodes,
    scanQRCode,
    deleteQRCode,
    downloadQRCode
} = require("../controllers/qrController");

const router = express.Router();

/* ======================================
            Multer Configuration
====================================== */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PNG, JPG and JPEG images are allowed."));
    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }

});

/* ======================================
                Routes
====================================== */

/**
 * Generate QR Code
 * POST /api/generate
 */
router.post("/generate", generateQRCode);

/**
 * List All QR Codes
 * GET /api/list
 */
router.get("/list", listQRCodes);

/**
 * Scan QR Code
 * POST /api/scan
 */
router.post(
    "/scan",
    upload.single("image"),
    scanQRCode
);

/**
 * Delete QR Code
 * DELETE /api/delete/:filename
 */
router.delete(
    "/delete/:filename",
    deleteQRCode
);

/**
 * Download QR Code
 * GET /api/download/:filename
 */
router.get(
    "/download/:filename",
    downloadQRCode
);

/* ======================================
            Multer Error Handler
====================================== */

router.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    if (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    next();

});

module.exports = router;