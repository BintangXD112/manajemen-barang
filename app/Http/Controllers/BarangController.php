<?php

namespace App\Http\Controllers;

use App\Http\Requests\Barang\StoreBarangRequest;
use App\Http\Requests\Barang\UpdateBarangRequest;
use App\Models\Barang;
use App\Models\Kategori;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BarangController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Barang::with('kategori');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(nama) LIKE ?', ['%'.strtolower($search).'%'])
                    ->orWhereRaw('LOWER(deskripsi) LIKE ?', ['%'.strtolower($search).'%'])
                    ->orWhereHas('kategori', function ($q) use ($search) {
                        $q->whereRaw('LOWER(nama) LIKE ?', ['%'.strtolower($search).'%']);
                    });
            });
        }

        if ($request->filled('kategori')) {
            $query->whereHas('kategori', function ($q) use ($request) {
                $q->where('nama', $request->kategori);
            });
        }

        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        $sortOrder = in_array(strtolower($sortOrder), ['asc', 'desc']) ? strtolower($sortOrder) : 'desc';
        
        $allowedSortColumns = ['created_at', 'nama', 'harga', 'stok'];
        $sortBy = in_array($sortBy, $allowedSortColumns) ? $sortBy : 'created_at';
        
        if ($sortBy === 'kategori') {
            $query->leftJoin('kategori', 'barang.kategori_id', '=', 'kategori.id')
                ->orderBy('kategori.nama', $sortOrder)
                ->select('barang.*');
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $barangs = $query->paginate(10)->withQueryString();

        $kategorisFilter = Kategori::whereHas('barang')
            ->orderBy('nama')
            ->pluck('nama')
            ->values();

        $kategorisDropdown = Kategori::orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('Barang/Index', [
            'barangs' => $barangs,
            'kategoris' => $kategorisFilter,
            'kategorisDropdown' => $kategorisDropdown,
            'filters' => $request->only(['search', 'kategori', 'sort_by', 'sort_order']),
        ]);
    }

    public function store(StoreBarangRequest $request): RedirectResponse
    {
        Barang::create($request->validated());

        return redirect()->route('barang.index')->with('success', 'Barang berhasil ditambahkan.');
    }

    public function update(UpdateBarangRequest $request, Barang $barang): RedirectResponse
    {
        $barang->update($request->validated());

        return redirect()->route('barang.index')->with('success', 'Barang berhasil diperbarui.');
    }

    public function destroy(Barang $barang): RedirectResponse
    {
        $barang->delete();

        return redirect()->route('barang.index')->with('success', 'Barang berhasil dihapus.');
    }
}

