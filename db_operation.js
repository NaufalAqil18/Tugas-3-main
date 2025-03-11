const fs = require("fs");
const readline = require("readline-sync");

module.exports = class DB {
    constructor(database) {
        this.database = database;
    }

    // Membaca database JSON
    readDatabase() {
        try {
            const data = fs.readFileSync(this.database, "utf8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Menulis ke database JSON
    writeDatabase(data) {
        fs.writeFileSync(this.database, JSON.stringify(data, null, 2), "utf8");
    }

    // Menampilkan semua item
    lihatSemuaItem() {
        // const items = readDatabase();
        // console.log("\n=== Daftar Produk Minimarket ===");
        // items.forEach((item) => {
        //     console.log(
        //         `${item.id}. ${item.nama} - Rp${item.harga} (Stok: ${item.stok})`
        //     );
        // });

        return this.readDatabase();
    }

    // Menampilkan detail satu item
    lihatSatuItem(id) {
        const items = this.readDatabase();
        // const id = readline.questionInt("Masukkan ID produk: ");
        // id = int(id)
        const item = items.find((i) => i.id === id);

        // console.log(typeof id);

        if (item) {
            console.log(
                `\n=== Detail Produk ===\nID: ${item.id}\nNama: ${item.nama}\nHarga: Rp${item.harga}\nStok: ${item.stok}`
            );
            return item;
        } else {
            console.log("Produk tidak ditemukan.");
            return null;
        }
    }

    // Menambahkan item baru
    tambahItem(nama, harga, stok) {
        const items = this.readDatabase();

        const newItem = {
            id: items.length ? items[items.length - 1].id + 1 : 1,
            nama,
            harga,
            stok,
        };

        items.push(newItem);
        this.writeDatabase(items);
        console.log("Produk berhasil ditambahkan!");
        return newItem.nama + " berhasil ditambahkan!";
    }

    // Mengupdate item
    updateItem(id, namaBaru, hargaBaru, stokBaru) {
        const items = this.readDatabase();
        const index = items.findIndex((i) => i.id === id);

        if (index !== -1) {
            items[index] = {
                id,
                nama: namaBaru || items[index].nama,
                harga: hargaBaru || items[index].harga,
                stok: stokBaru || items[index].stok,
            };

            this.writeDatabase(items);
            console.log("Produk berhasil diperbarui!");
            return items[index].nama + " berhasil diperbarui!";
        } else {
            console.log("Produk tidak ditemukan.");
            return "Produk tidak ditemukan.";
        }
    }

    // Menghapus item
    hapusItem(id) {
        const items = this.readDatabase();
        const itemDihapus = items.find((i) => i.id === id);
        const newItems = items.filter((i) => i.id !== id);

        if (newItems.length !== items.length) {
            this.writeDatabase(newItems);
            console.log("Produk berhasil dihapus!");
            return itemDihapus.nama + " berhasil dihapus!";
        } else {
            console.log("Produk tidak ditemukan.");
            return "Produk tidak ditemukan.";
        }
    }
};
