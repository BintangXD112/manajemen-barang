<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    public function run(): void
    {
        $elektronik = \App\Models\Kategori::where('nama', 'Elektronik')->first();
        $pakaian = \App\Models\Kategori::where('nama', 'Pakaian')->first();
        $makanan = \App\Models\Kategori::where('nama', 'Makanan')->first();
        $minuman = \App\Models\Kategori::where('nama', 'Minuman')->first();
        $lainnya = \App\Models\Kategori::where('nama', 'Lainnya')->first();

        $barangs = [
            [
                'nama' => 'Laptop ASUS ROG Strix G15',
                'deskripsi' => 'Laptop gaming dengan processor AMD Ryzen 9 dan RTX 3060, RAM 16GB, SSD 512GB',
                'stok' => 15,
                'harga' => 15999000,
                'kategori_id' => $elektronik?->id,
            ],
            [
                'nama' => 'iPhone 15 Pro Max',
                'deskripsi' => 'Smartphone flagship Apple dengan chip A17 Pro, kamera 48MP, storage 256GB',
                'stok' => 8,
                'harga' => 19999000,
                'kategori_id' => $elektronik?->id,
            ],
            [
                'nama' => 'Samsung Galaxy S24 Ultra',
                'deskripsi' => 'Smartphone premium dengan S Pen, kamera 200MP, layar AMOLED 6.8 inch',
                'stok' => 12,
                'harga' => 17999000,
                'kategori_id' => $elektronik?->id,
            ],
            [
                'nama' => 'AirPods Pro 2',
                'deskripsi' => 'Wireless earbuds dengan Active Noise Cancellation dan Spatial Audio',
                'stok' => 25,
                'harga' => 3999000,
                'kategori_id' => $elektronik?->id,
            ],
            [
                'nama' => 'iPad Air 5',
                'deskripsi' => 'Tablet Apple dengan chip M1, layar 10.9 inch, storage 64GB',
                'stok' => 10,
                'harga' => 8999000,
                'kategori_id' => $elektronik?->id,
            ],
            [
                'nama' => 'Smart TV LG 55 inch',
                'deskripsi' => 'TV LED 4K UHD dengan WebOS, HDR10, dan Dolby Vision',
                'stok' => 6,
                'harga' => 8999000,
                'kategori_id' => $elektronik?->id,
            ],
            [
                'nama' => 'Kemeja Formal Putih',
                'deskripsi' => 'Kemeja formal pria bahan katun premium, ukuran L',
                'stok' => 30,
                'harga' => 299000,
                'kategori_id' => $pakaian?->id,
            ],
            [
                'nama' => 'Jeans Slim Fit',
                'deskripsi' => 'Celana jeans pria model slim fit, bahan denim berkualitas',
                'stok' => 45,
                'harga' => 499000,
                'kategori_id' => $pakaian?->id,
            ],
            [
                'nama' => 'Dress Wanita Elegan',
                'deskripsi' => 'Dress wanita untuk acara formal, berbagai ukuran tersedia',
                'stok' => 20,
                'harga' => 599000,
                'kategori_id' => $pakaian?->id,
            ],
            [
                'nama' => 'Jaket Hoodie',
                'deskripsi' => 'Jaket hoodie unisex dengan bahan fleece, berbagai warna',
                'stok' => 35,
                'harga' => 399000,
                'kategori_id' => $pakaian?->id,
            ],
            [
                'nama' => 'Sepatu Sneakers',
                'deskripsi' => 'Sepatu sneakers casual dengan sol karet, nyaman untuk sehari-hari',
                'stok' => 50,
                'harga' => 699000,
                'kategori_id' => $pakaian?->id,
            ],
            [
                'nama' => 'Nasi Goreng Spesial',
                'deskripsi' => 'Nasi goreng dengan telur, ayam, dan sayuran, porsi jumbo',
                'stok' => 100,
                'harga' => 25000,
                'kategori_id' => $makanan?->id,
            ],
            [
                'nama' => 'Rendang Padang',
                'deskripsi' => 'Rendang daging sapi asli Padang, bumbu rempah lengkap',
                'stok' => 80,
                'harga' => 35000,
                'kategori_id' => $makanan?->id,
            ],
            [
                'nama' => 'Gado-gado',
                'deskripsi' => 'Salad sayuran dengan bumbu kacang, khas Betawi',
                'stok' => 60,
                'harga' => 20000,
                'kategori_id' => $makanan?->id,
            ],
            [
                'nama' => 'Sate Ayam',
                'deskripsi' => 'Sate ayam dengan bumbu kacang, 10 tusuk per porsi',
                'stok' => 90,
                'harga' => 30000,
                'kategori_id' => $makanan?->id,
            ],
            [
                'nama' => 'Bakso Malang',
                'deskripsi' => 'Bakso daging sapi dengan mie dan tahu, kuah kaldu sapi',
                'stok' => 70,
                'harga' => 25000,
                'kategori_id' => $makanan?->id,
            ],
            [
                'nama' => 'Es Teh Manis',
                'deskripsi' => 'Es teh manis segar, ukuran jumbo',
                'stok' => 150,
                'harga' => 8000,
                'kategori_id' => $minuman?->id,
            ],
            [
                'nama' => 'Jus Alpukat',
                'deskripsi' => 'Jus alpukat segar dengan susu kental manis',
                'stok' => 40,
                'harga' => 15000,
                'kategori_id' => $minuman?->id,
            ],
            [
                'nama' => 'Kopi Latte',
                'deskripsi' => 'Kopi espresso dengan susu steamed, ukuran regular',
                'stok' => 60,
                'harga' => 20000,
                'kategori_id' => $minuman?->id,
            ],
            [
                'nama' => 'Es Jeruk',
                'deskripsi' => 'Es jeruk peras segar, tanpa gula tambahan',
                'stok' => 55,
                'harga' => 12000,
                'kategori_id' => $minuman?->id,
            ],
            [
                'nama' => 'Milkshake Coklat',
                'deskripsi' => 'Milkshake coklat dengan whipped cream dan topping',
                'stok' => 30,
                'harga' => 18000,
                'kategori_id' => $minuman?->id,
            ],
            [
                'nama' => 'Buku Tulis',
                'deskripsi' => 'Buku tulis A4, 100 lembar, kertas HVS',
                'stok' => 200,
                'harga' => 15000,
                'kategori_id' => $lainnya?->id,
            ],
            [
                'nama' => 'Pulpen Pilot',
                'deskripsi' => 'Pulpen ballpoint dengan tinta hitam, pak isi 3',
                'stok' => 150,
                'harga' => 25000,
                'kategori_id' => $lainnya?->id,
            ],
            [
                'nama' => 'Tas Ransel',
                'deskripsi' => 'Tas ransel dengan banyak kompartemen, bahan tahan air',
                'stok' => 25,
                'harga' => 299000,
                'kategori_id' => $lainnya?->id,
            ],
            [
                'nama' => 'Mouse Wireless',
                'deskripsi' => 'Mouse wireless ergonomis, baterai tahan lama',
                'stok' => 40,
                'harga' => 199000,
                'kategori_id' => $lainnya?->id,
            ],
            [
                'nama' => 'Keyboard Mechanical',
                'deskripsi' => 'Keyboard mechanical RGB, switch blue, full layout',
                'stok' => 15,
                'harga' => 899000,
                'kategori_id' => $lainnya?->id,
            ],
        ];

        foreach ($barangs as $barang) {
            Barang::create($barang);
        }
    }
}


