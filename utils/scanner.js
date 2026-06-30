const Jimp = require("jimp");
const QrCode = require("qrcode-reader");

/**
 * Scan QR Code from Image
 * @param {string} imagePath
 * @returns {Promise<string>}
 */

const scanQR = (imagePath) => {

    return new Promise(async (resolve, reject) => {

        try {

            // Read image
            const image = await Jimp.read(imagePath);

            const qr = new QrCode();

            qr.callback = (err, value) => {

                if (err) {
                    return reject(new Error("Unable to decode QR Code."));
                }

                if (!value) {
                    return reject(new Error("QR Code not found."));
                }

                resolve(value.result);

            };

            qr.decode(image.bitmap);

        } catch (error) {

            reject(error);

        }

    });

};

module.exports = scanQR;