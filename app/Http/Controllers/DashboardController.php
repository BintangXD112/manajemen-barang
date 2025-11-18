<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Kategori;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalBarang = Barang::count();
        $totalKategori = Kategori::count();
        $totalStok = Barang::sum('stok');
        $totalNilai = Barang::sum(DB::raw('stok * harga'));

        $barangTerbaru = Barang::latest()->limit(5)->get();
        $kategoriPopuler = Kategori::withCount('barangs')
            ->orderBy('barangs_count', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_barang' => $totalBarang,
                'total_kategori' => $totalKategori,
                'total_stok' => $totalStok,
                'total_nilai' => $totalNilai,
            ],
            'barang_terbaru' => $barangTerbaru,
            'kategori_populer' => $kategoriPopuler,
        ]);
    }
}

