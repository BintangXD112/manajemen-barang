<?php

namespace Database\Factories;

use App\Models\Barang;
use App\Models\Kategori;
use Illuminate\Database\Eloquent\Factories\Factory;

class BarangFactory extends Factory
{
    protected $model = Barang::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->words(2, true),
            'deskripsi' => fake()->sentence(),
            'stok' => fake()->numberBetween(0, 100),
            'harga' => fake()->randomFloat(2, 1000, 100000),
            'kategori_id' => Kategori::inRandomOrder()->first()?->id,
        ];
    }
}


