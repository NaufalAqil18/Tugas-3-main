# Project 3 PPL

## Kelompok 4

1. Willy Jonathan Arsyad (2208107010037)
2. Muhammad Khalid Al Ghifari (2208107010044)
3. ⁠Naufal Aqil (2208107010043)

## Untuk menjalankan

Pertama, clone repository dari github pada directori yang anda inginkan

```bash
git clone https://github.com/NaufalAqil18/Tugas-3-main.git
```

Kemudian, masuk kedalam repository yang telah diclone

```bash
cd Tugas-3-main
```

Cukup jalankan code berikut pada terminal, di direktori project

```bash
node index.js
```

Dapat juga melihat item dalam bentuk json dengan mengganti route-nya

## Sistem Database Sederhana

Buatlah sistem database sederhana dengan menggunakan node js. sistem dapat memberikan data dan menambahkan data. database yang digunakan adalah JSON.

## Sistem API Sederhana

Buatlah API sederhana dengan menggunakan express. API dapat memberikan data dan menambahkan data ke dalam sistem database.

## Kriteria Tugas :

#### Wajib

1. Memiliki minimal 2 method `GET` dan 1 method `POST`
   contoh (only example):

```bash
"GET" /users
{
    data: [
        {
            name: "ardi",
            age: "16",
        },
        {
            name: "Fajar",
            age: "78",
        }
    ]
}
```

2. Bisa melihat semua daftar item dengan `GET`
3. Bisa melihat 1 item saja dengan `GET`
4. Bisa menambahkan item baru dengan `POST`
5. Untuk datanya memiliki ketentuan seperti berikut :
    - Menggunakan `JSON`
    - Memiliki Tema (seperti Komik, Character dan lain lain)
    - Data memiliki minimal 3 atribut

#### Nilai Plus

Nilai yang didapatkan jika berhasil mengerjakan yang `wajib` adalah 87, untuk mendapatkan nilai tambahan,

Kalian bebas berekspresi bagaimana pun dengan sistem tersebut, bisa menambahkan fungsi-fungsi baru akan mendapatkan `nilai +`, contoh fungsi-fungsi yang bisa ditambahkan :

-   mengupdate item
-   menghapus item
-   fungsi lainnya yang keren

## Waktu dan Tempat Pengumpulan

Tenggat waktu pengerjaan tugas adalah `h-1` masuk kelas
Tempat pengumpulan di `spreadsheet` kelompok
