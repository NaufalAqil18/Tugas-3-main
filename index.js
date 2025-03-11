const http = require("http");

const routes = {
    "/": "Selamat datang di halaman utama!",
    // "/about": "Ini adalah halaman Tentang Kami.",
    // "/contact": "Hubungi kami di contact@website.com",
    "/api/data": JSON.stringify({
        message: "Hello, ini data API!",
        status: "success",
    }),
};

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": req.url.startsWith("/api")
            ? "application/json"
            : "text/plain",
    });
    res.end(routes[req.url] || "404 - Halaman tidak ditemukan");
});

server.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
