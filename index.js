const express = require("express");
const DB = require("./db_operation");

const app = express();
const database = new DB("database.json");

app.use(express.json()); // Middleware untuk membaca JSON dari request

// Route: Mendapatkan semua item
app.get("/items", (req, res) => {
    res.json({
        data: database.lihatSemuaItem(),
        status: "success",
    });
});

// Route: Mendapatkan satu item berdasarkan ID
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = database.lihatSatuItem(id);
    
    if (item) {
        res.json({ data: item, status: "success" });
    } else {
        res.status(404).json({ message: "Item tidak ditemukan", status: "error" });
    }
});

// Route: Menambahkan item baru
app.post("/items", (req, res) => {
    const { nama, harga, stok } = req.body;

    if (!nama || !harga || !stok) {
        return res.status(400).json({ message: "Data tidak lengkap", status: "error" });
    }

    const newItem = database.tambahItem(nama, harga, stok);
    res.status(201).json({ data: newItem, status: "success" });
});

// Route: Mengupdate item berdasarkan ID
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, harga, stok } = req.body;

    if (!nama || !harga || !stok) {
        return res.status(400).json({ message: "Data tidak lengkap", status: "error" });
    }

    const updatedItem = database.editItem(id, nama, harga, stok);

    if (updatedItem) {
        res.json({ data: updatedItem, status: "success" });
    } else {
        res.status(404).json({ message: "Item tidak ditemukan", status: "error" });
    }
});

// Route: Menghapus item berdasarkan ID
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const isDeleted = database.hapusItem(id);

    if (isDeleted) {
        res.json({ message: "Item berhasil dihapus", status: "success" });
    } else {
        res.status(404).json({ message: "Item tidak ditemukan", status: "error" });
    }
});

// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
