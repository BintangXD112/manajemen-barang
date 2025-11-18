<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        $kategoris = [
            [
                'nama' => 'Elektronik',
                'deskripsi' => 'Barang-barang elektronik seperti laptop, smartphone, tablet, dan aksesoris elektronik lainnya',
            ],
            [
                'nama' => 'Pakaian',
                'deskripsi' => 'Pakaian pria, wanita, dan anak-anak termasuk aksesoris fashion',
            ],
            [
                'nama' => 'Makanan',
                'deskripsi' => 'Makanan siap saji, makanan ringan, dan bahan makanan',
            ],
            [
                'nama' => 'Minuman',
                'deskripsi' => 'Minuman ringan, minuman kemasan, dan minuman lainnya',
            ],
            [
                'nama' => 'Lainnya',
                'deskripsi' => 'Kategori untuk barang-barang yang tidak termasuk dalam kategori di atas',
            ],
        ];

        foreach ($kategoris as $kategori) {
            Kategori::create($kategori);
        }
    }
}

