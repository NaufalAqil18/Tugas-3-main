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
        const items = readDatabase();

        // const nama = readline.question("Masukkan nama produk: ");
        // const harga = readline.questionInt("Masukkan harga produk: ");
        // const stok = readline.questionInt("Masukkan jumlah stok: ");

        const newItem = {
            id: items.length ? items[items.length - 1].id + 1 : 1,
            nama,
            harga,
            stok,
        };

        items.push(newItem);
        writeDatabase(items);
        console.log("Produk berhasil ditambahkan!");
        return newItem.nama + " berhasil ditambahkan!";
    }

    // Mengupdate item
    updateItem(id) {
        const items = readDatabase();
        // const id = readline.questionInt(
        //     "Masukkan ID produk yang ingin diperbarui: "
        // );
        const index = items.findIndex((i) => i.id === id);

        if (index !== -1) {
            const nama =
                readline.question(`Nama baru (${items[index].nama}): `) ||
                items[index].nama;
            const harga =
                readline.questionInt(`Harga baru (${items[index].harga}): `) ||
                items[index].harga;
            const stok =
                readline.questionInt(`Stok baru (${items[index].stok}): `) ||
                items[index].stok;

            items[index] = { id, nama, harga, stok };
            writeDatabase(items);

            console.log("Produk berhasil diperbarui!");
            return items[index].nama + " berhasil diperbarui!";
        } else {
            console.log("Produk tidak ditemukan.");

            return "Produk tidak ditemukan.";
        }
    }

    // Menghapus item
    hapusItem(id) {
        const items = readDatabase();
        // const id = readline.questionInt(
        //     "Masukkan ID produk yang ingin dihapus: "
        // );
        const newItems = items.filter((i) => i.id !== id);
        const deleteItem = items.find((i) => i.id === id);

        if (newItems.length !== items.length) {
            writeDatabase(newItems);
            console.log("Produk berhasil dihapus!");

            return deleteItem + " berhasil dihapus!";
        } else {
            console.log("Produk tidak ditemukan.");

            return deleteItem + " tidak ditemukan";
        }
    }
};
