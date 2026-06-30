const inquirer = require("inquirer");
const axios = require("axios");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const BASE_URL = "http://localhost:5000/api";

/* ===========================================
            Main Menu
=========================================== */

async function mainMenu() {

    while (true) {

        console.clear();

        console.log(
            chalk.cyan.bold(
                "\n========== QR CODE GENERATOR ==========\n"
            )
        );

        const { menu } = await inquirer.prompt([
            {
                type: "list",
                name: "menu",
                message: "Choose an option",
                choices: [
                    "Generate QR Code",
                    "List QR Codes",
                    "Scan QR Code",
                    "Delete QR Code",
                    "Download QR Code",
                    new inquirer.Separator(),
                    "Exit"
                ]
            }
        ]);

        switch (menu) {

            case "Generate QR Code":
                await generateQRCode();
                break;

            case "List QR Codes":
                await listQRCodes();
                break;

            case "Scan QR Code":
                await scanQRCode();
                break;

            case "Delete QR Code":
                await deleteQRCode();
                break;

            case "Download QR Code":
                await downloadQRCode();
                break;

            case "Exit":

                console.log(
                    chalk.green("\nGood Bye 👋\n")
                );

                process.exit();

        }

        await pause();

    }

}

/* ===========================================
            Generate QR Code
=========================================== */

async function generateQRCode() {

    try {

        const answers = await inquirer.prompt([

            {
                type: "input",
                name: "text",
                message: "Enter Text / URL :",

                validate(value) {

                    if (!value.trim()) {

                        return "Please enter text.";

                    }

                    return true;

                }

            },

            {
                type: "list",

                name: "expiry",

                message: "Select Expiry",

                choices: [

                    {
                        name: "5 Minutes",
                        value: "5m"
                    },

                    {
                        name: "1 Hour",
                        value: "1h"
                    },

                    {
                        name: "1 Day",
                        value: "1d"
                    }

                ]

            }

        ]);

        const response = await axios.post(

            `${BASE_URL}/generate`,

            answers

        );

        console.log();

        console.log(
            chalk.green("✔ QR Generated Successfully\n")
        );

        console.table([response.data.data]);

    }

    catch (error) {

        printError(error);

    }

}

/* ===========================================
            List QR Codes
=========================================== */

async function listQRCodes() {

    try {

        const response = await axios.get(

            `${BASE_URL}/list`

        );

        const qrList = response.data.data;

        console.log();

        if (qrList.length === 0) {

            console.log(

                chalk.yellow("No QR Codes Found.\n")

            );

            return;

        }

        console.table(qrList);

    }

    catch (error) {

        printError(error);

    }

}

/* ===========================================
            Scan QR Code
=========================================== */

async function scanQRCode() {

    try {

        const { imagePath } = await inquirer.prompt([
            {
                type: "input",
                name: "imagePath",
                message: "Enter QR Image Path:",

                validate(value) {

                    if (!value.trim()) {
                        return "Please enter image path.";
                    }

                    if (!fs.existsSync(value)) {
                        return "File does not exist.";
                    }

                    return true;

                }

            }
        ]);

        const form = new FormData();

        form.append(
            "image",
            fs.createReadStream(imagePath)
        );

        const response = await axios.post(

            `${BASE_URL}/scan`,

            form,

            {
                headers: form.getHeaders()
            }

        );

        console.log();

        console.log(
            chalk.green("✔ QR Scanned Successfully\n")
        );

        console.table([response.data]);

    }

    catch (error) {

        printError(error);

    }

}

/* ===========================================
            Delete QR Code
=========================================== */

async function deleteQRCode() {

    try {

        const response = await axios.get(
            `${BASE_URL}/list`
        );

        const qrList = response.data.data;

        if (qrList.length === 0) {

            console.log(
                chalk.yellow("\nNo QR Codes Available.\n")
            );

            return;

        }

        const { filename } = await inquirer.prompt([

            {

                type: "list",

                name: "filename",

                message: "Select QR Code to Delete",

                choices: qrList.map(qr => ({
                    name: qr.filename,
                    value: qr.filename
                }))

            }

        ]);

        const result = await axios.delete(

            `${BASE_URL}/delete/${filename}`

        );

        console.log();

        console.log(

            chalk.green(result.data.message)

        );

    }

    catch (error) {

        printError(error);

    }

}

/* ===========================================
            Pause
=========================================== */

async function pause() {

    await inquirer.prompt([

        {

            type: "input",

            name: "pause",

            message: "Press Enter to Continue..."

        }

    ]);

}

/* ===========================================
            Error Printer
=========================================== */

function printError(error) {

    console.log();

    if (error.response) {

        console.log(

            chalk.red(error.response.data.message)

        );

    }

    else {

        console.log(

            chalk.red(error.message)

        );

    }

}


/* ===========================================
            Download QR Code
=========================================== */

async function downloadQRCode() {

    try {

        // Get all QR Codes
        const response = await axios.get(
            `${BASE_URL}/list`
        );

        const qrList = response.data.data;

        if (qrList.length === 0) {

            console.log(
                chalk.yellow("\nNo QR Codes Available.\n")
            );

            return;

        }

        // Select QR
        const { filename } = await inquirer.prompt([
            {
                type: "list",
                name: "filename",
                message: "Select QR Code",
                choices: qrList.map(qr => ({
                    name: qr.filename,
                    value: qr.filename
                }))
            }
        ]);

        // Download request
        const downloadResponse = await axios({

            method: "GET",

            url: `${BASE_URL}/download/${filename}`,

            responseType: "stream"

        });

        // Downloads folder
        const downloadFolder = path.join(
            __dirname,
            "downloads"
        );

        if (!fs.existsSync(downloadFolder)) {

            fs.mkdirSync(downloadFolder);

        }

        const savePath = path.join(
            downloadFolder,
            filename
        );

        const writer = fs.createWriteStream(savePath);

        downloadResponse.data.pipe(writer);

        // Wait until download completes
        await new Promise((resolve, reject) => {

            writer.on("finish", resolve);

            writer.on("error", reject);

        });

        console.log();

        console.log(
            chalk.green("✔ QR Downloaded Successfully")
        );

        console.log(
            chalk.cyan(savePath)
        );

    }

    catch (error) {

        printError(error);

    }

}

/* ===========================================
            Start CLI
=========================================== */

mainMenu();