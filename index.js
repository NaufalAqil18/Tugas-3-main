const express = require("express");
const readline = require("readline-sync");
const DB = require("./db_operation");
const path = require("path"); 
const app = express();
const port = 3000;
const database = new DB("database.json");

app.use(express.json());

// Add static file middleware to serve files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Add root route to serve the HTML interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// ROUTES
// Menampilkan semua item
app.get("/items", (req, res) => {
    const items = database.lihatSemuaItem();
    res.json({ data: items, status: "success" });
});

// Menampilkan detail item berdasarkan ID
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = database.lihatSatuItem(id);
    if (item) {
        res.json({ data: item, status: "success" });
    } else {
        res.status(404).json({ message: "Item tidak ditemukan", status: "error" });
    }
});

// Menambahkan item baru
app.post("/items", (req, res) => {
    const { nama, harga, stok } = req.body;
    if (!nama || !harga || !stok) {
        return res.status(400).json({ message: "Data tidak lengkap", status: "error" });
    }
    const newItem = database.tambahItem(nama, harga, stok);
    res.status(201).json({ message: newItem, status: "success" });
});

// Mengupdate item berdasarkan ID
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, harga, stok } = req.body;
    const updatedItem = database.updateItem(id, nama, harga, stok);
    res.json({ message: updatedItem, status: "success" });
});

// Menghapus item berdasarkan ID
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletedItem = database.hapusItem(id);
    res.json({ message: deletedItem, status: "success" });
});

// MENU TERMINAL INTERAKTIF
function showMenu() {
    console.log("\nServer web sudah berjalan, akses di http://localhost:3000");
    console.log("Anda juga dapat menggunakan menu interaktif ini");
    
    while (true) {
        console.log("\n=== Menu Minimarket ===");
        console.log("1. Lihat Semua Produk");
        console.log("2. Lihat Produk Berdasarkan ID");
        console.log("3. Tambah Produk Baru");
        console.log("4. Update Produk");
        console.log("5. Hapus Produk");
        console.log("6. Keluar");
        
        let pilihan = readline.questionInt("\nPilih menu (1-6): ");
        
        if (pilihan === 1) {
            console.log("\n=== Daftar Produk ===");
            console.table(database.lihatSemuaItem());
        } else if (pilihan === 2) {
            let id = readline.questionInt("Masukkan ID produk: ");
            let item = database.lihatSatuItem(id);
            if (item) console.table(item);
        } else if (pilihan === 3) {
            let nama = readline.question("Masukkan nama produk: ");
            let harga = readline.questionInt("Masukkan harga produk: ");
            let stok = readline.questionInt("Masukkan stok produk: ");
            console.log(database.tambahItem(nama, harga, stok));
        } else if (pilihan === 4) {
            let id = readline.questionInt("Masukkan ID produk yang ingin diperbarui: ");
            let nama = readline.question("Nama baru (kosongkan jika tidak ingin mengubah): ");
            let harga = readline.questionInt("Harga baru (0 jika tidak ingin mengubah): ");
            let stok = readline.questionInt("Stok baru (0 jika tidak ingin mengubah): ");
            console.log(database.updateItem(id, nama || undefined, harga || undefined, stok || undefined));
        } else if (pilihan === 5) {
            let id = readline.questionInt("Masukkan ID produk yang ingin dihapus: ");
            console.log(database.hapusItem(id));
        } else if (pilihan === 6) {
            console.log("Terima kasih telah menggunakan aplikasi ini!");
            process.exit();
        } else {
            console.log("Pilihan tidak valid, coba lagi.");
        }
    }
}

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    showMenu(); // Menjalankan menu interaktif di terminal
});