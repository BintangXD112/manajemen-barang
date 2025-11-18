<?php

namespace App\Http\Controllers;

use App\Http\Requests\Kategori\StoreKategoriRequest;
use App\Http\Requests\Kategori\UpdateKategoriRequest;
use App\Models\Kategori;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KategoriController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Kategori::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(nama) LIKE ?', ['%'.strtolower($search).'%'])
                    ->orWhereRaw('LOWER(deskripsi) LIKE ?', ['%'.strtolower($search).'%']);
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        // Validate sort order
        $sortOrder = in_array(strtolower($sortOrder), ['asc', 'desc']) ? strtolower($sortOrder) : 'desc';
        
        // Validate sort by - only allow specific columns
        $allowedSortColumns = ['created_at', 'nama'];
        $sortBy = in_array($sortBy, $allowedSortColumns) ? $sortBy : 'created_at';
        
        $query->orderBy($sortBy, $sortOrder);

        // Pagination with count
        $kategoris = $query->withCount('barangs')->paginate(10)->withQueryString();

        return Inertia::render('Kategori/Index', [
            'kategoris' => $kategoris,
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }

    public function store(StoreKategoriRequest $request): RedirectResponse
    {
        Kategori::create($request->validated());

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(UpdateKategoriRequest $request, Kategori $kategori): RedirectResponse
    {
        $kategori->update($request->validated());

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Kategori $kategori): RedirectResponse
    {
        // Check if kategori has barangs
        if ($kategori->barangs()->count() > 0) {
            return redirect()->route('kategori.index')->with('error', 'Kategori tidak dapat dihapus karena masih memiliki barang.');
        }

        $kategori->delete();

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil dihapus.');
    }
}

