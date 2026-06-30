# 🚀 Advanced Node.js QR Code Generator & Scanner

An Advanced Node.js application built with **Express.js** that allows users to:

- ✅ Generate QR Codes
- ✅ Scan QR Codes
- ✅ Download QR Codes
- ✅ Delete QR Codes
- ✅ Store QR Metadata
- ✅ Manage QR Expiry
- ✅ Use both REST API and Command Line Interface (CLI)

---

# 📌 Features

- Generate QR Codes from Text or URLs
- Scan QR Codes from Images
- Download Generated QR Codes
- Delete QR Codes
- QR Code Expiry
- Metadata Storage (JSON)
- REST API
- Interactive CLI
- File Upload Support
- Global Error Handling
- MVC Folder Structure

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- Axios
- Inquirer
- Chalk
- Multer
- QRCode
- Jimp
- QRCode-Reader
- UUID
- fs-extra

---

# 📂 Project Structure

```
QR-Code-Generator
│
├── controllers
│   └── qrController.js
│
├── data
│   └── metadata.json
│
├── downloads
│
├── middleware
│   └── errorHandler.js
│
├── qrcodes
│
├── routes
│   └── qrRoutes.js
│
├── uploads
│
├── utils
│   ├── expiry.js
│   └── scanner.js
│
├── app.js
├── cli.js
├── package.json
├── server.js
├── README.md
└── .gitignore
```

---

# 📥 Clone the Repository

```bash
git clone https://github.com/Bhush8766/advanced-nodejs-qr-generator.git
```

Go inside the project.

```bash
cd advanced-nodejs-qr-generator
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🔄 Clean Installation (Recommended)

If you already installed packages and want a fresh setup.

## Windows CMD

```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

## Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

## Git Bash / Linux / macOS

```bash
rm -rf node_modules package-lock.json
npm install
```

---

# 📦 Install Required Packages Individually

```bash
npm install express
npm install axios
npm install chalk@4
npm install form-data
npm install fs-extra
npm install inquirer@8.2.6
npm install jimp@0.22.12
npm install multer
npm install qrcode
npm install qrcode-reader
npm install uuid
```

Install development dependency:

```bash
npm install --save-dev nodemon
```

---

# ▶️ Start the Server

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# 🖥️ Start CLI

Open another terminal.

```bash
npm run cli
```

---

# 📡 REST API

## Generate QR Code

### POST

```
/api/generate
```

Body

```json
{
    "text":"https://google.com",
    "expiry":"1d"
}
```

---

## List QR Codes

### GET

```
/api/list
```

---

## Scan QR Code

### POST

```
/api/scan
```

Body

```
Form Data

image : qr-image.png
```

---

## Delete QR Code

### DELETE

```
/api/delete/:filename
```

Example

```
/api/delete/abc123.png
```

---

## Download QR Code

### GET

```
/api/download/:filename
```

Example

```
/api/download/abc123.png
```

---

# ⏳ QR Expiry Options

| Option | Description |
|----------|-------------|
| 5m | 5 Minutes |
| 1h | 1 Hour |
| 1d | 1 Day |
| YYYY-MM-DD | Custom Date |

Example

```json
{
    "expiry":"2026-12-31"
}
```

---

# 💻 CLI Menu

```
Generate QR Code

List QR Codes

Scan QR Code

Delete QR Code

Download QR Code

Exit
```

Run CLI

```bash
npm run cli
```

---

# 📁 Generated Files

QR Images

```
qrcodes/
```

Uploaded Images

```
uploads/
```

Downloaded Images

```
downloads/
```

Metadata

```
data/metadata.json
```

---

# 📄 Sample Metadata

```json
[
  {
    "id":"6b45bc6a",
    "text":"https://google.com",
    "filename":"6b45bc6a.png",
    "createdAt":"2026-06-30T12:20:30.000Z",
    "expiry":"2026-07-01T12:20:30.000Z"
  }
]
```

---

# 🧪 Testing

You can test using

- Postman
- Thunder Client
- REST Client
- CLI

---

# ❌ Error Handling

Application handles

- Invalid Request
- Invalid JSON
- Invalid Image
- QR Decode Failure
- Missing File
- File Size Limit
- Expired QR
- Server Errors

---

# 📋 Useful Commands

Check Node Version

```bash
node -v
```

Check npm Version

```bash
npm -v
```

List Installed Packages

```bash
npm list
```

Check Inquirer Version

```bash
npm list inquirer
```

Check Jimp Version

```bash
npm list jimp
```

Install Missing Packages

```bash
npm install
```

Run Server

```bash
npm run dev
```

Run CLI

```bash
npm run cli
```

Stop Server

```
Ctrl + C
```

---

# 📌 Future Enhancements

- MongoDB Support
- JWT Authentication
- QR Analytics
- Custom QR Colors
- Logo in QR
- Email QR
- PDF Export
- Docker Support
- Cloud Storage

---

# 👨‍💻 Author

**Nandini Chavan**

GitHub: https://github.com/chavannandini28

LinkedIn: https://www.linkedin.com/in/nandini-chavan-b4788727b?utm_source=share_via&utm_content=profile&utm_medium=member_android

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

Happy Coding! 🚀
