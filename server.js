const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log(`🚀 Server is running on Port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("=================================");
});