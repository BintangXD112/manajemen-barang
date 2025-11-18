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
        $query = Barang::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(nama) LIKE ?', ['%'.strtolower($search).'%'])
                    ->orWhereRaw('LOWER(deskripsi) LIKE ?', ['%'.strtolower($search).'%'])
                    ->orWhereRaw('LOWER(kategori) LIKE ?', ['%'.strtolower($search).'%']);
            });
        }

        // Filter by category
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        // Validate sort order
        $sortOrder = in_array(strtolower($sortOrder), ['asc', 'desc']) ? strtolower($sortOrder) : 'desc';
        
        // Validate sort by - only allow specific columns
        $allowedSortColumns = ['created_at', 'nama', 'harga', 'stok', 'kategori'];
        $sortBy = in_array($sortBy, $allowedSortColumns) ? $sortBy : 'created_at';
        
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $barangs = $query->paginate(10)->withQueryString();

        // Get unique categories for filter from barangs
        $kategorisFilter = Barang::whereNotNull('kategori')
            ->distinct()
            ->pluck('kategori')
            ->sort()
            ->values();

        // Get all kategoris from kategoris table for dropdown
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
        $validated = $request->validated();
        // Remove kategori_id from validated data as we use kategori (name) instead
        unset($validated['kategori_id']);
        Barang::create($validated);

        return redirect()->route('barang.index')->with('success', 'Barang berhasil ditambahkan.');
    }

    public function update(UpdateBarangRequest $request, Barang $barang): RedirectResponse
    {
        $validated = $request->validated();
        // Remove kategori_id from validated data as we use kategori (name) instead
        unset($validated['kategori_id']);
        $barang->update($validated);

        return redirect()->route('barang.index')->with('success', 'Barang berhasil diperbarui.');
    }

    public function destroy(Barang $barang): RedirectResponse
    {
        $barang->delete();

        return redirect()->route('barang.index')->with('success', 'Barang berhasil dihapus.');
    }
}

