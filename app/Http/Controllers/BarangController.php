<?php

namespace App\Http\Controllers;

use App\Http\Requests\Barang\StoreBarangRequest;
use App\Http\Requests\Barang\UpdateBarangRequest;
use App\Models\Barang;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BarangController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Barang/Index', [
            'barangs' => Barang::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Barang/Create');
    }

    public function store(StoreBarangRequest $request): RedirectResponse
    {
        Barang::create($request->validated());

        return redirect()->route('barang.index')->with('success', 'Barang berhasil ditambahkan.');
    }

    public function edit(Barang $barang): Response
    {
        return Inertia::render('Barang/Edit', [
            'barang' => $barang,
        ]);
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

