<?php

namespace App\Http\Controllers;

use App\Http\Requests\Barang\StoreBarangRequest;
use App\Http\Requests\Barang\UpdateBarangRequest;
use App\Models\Barang;
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
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(nama) LIKE ?', ['%'.strtolower($search).'%'])
                    ->orWhereRaw('LOWER(deskripsi) LIKE ?', ['%'.strtolower($search).'%'])
                    ->orWhereRaw('LOWER(kategori) LIKE ?', ['%'.strtolower($search).'%']);
            });
        }

        // Filter by category
        if ($request->has('kategori') && $request->kategori) {
            $query->where('kategori', $request->kategori);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $barangs = $query->paginate(10)->withQueryString();

        // Get unique categories for filter
        $kategoris = Barang::whereNotNull('kategori')
            ->distinct()
            ->pluck('kategori')
            ->sort()
            ->values();

        return Inertia::render('Barang/Index', [
            'barangs' => $barangs,
            'kategoris' => $kategoris,
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

