<?php

namespace App\Http\Requests\Barang;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBarangRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],
            'stok' => ['required', 'integer', 'min:0'],
            'harga' => ['required', 'numeric', 'min:0'],
            'kategori_id' => ['nullable', 'integer', 'exists:kategoris,id'],
            'kategori' => ['nullable', 'string', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        // Convert kategori_id to kategori name if provided
        if ($this->has('kategori_id') && $this->kategori_id !== null && $this->kategori_id !== '') {
            $kategori = \App\Models\Kategori::find($this->kategori_id);
            if ($kategori) {
                $this->merge(['kategori' => $kategori->nama]);
            } else {
                $this->merge(['kategori' => null]);
            }
        } else {
            // If no kategori_id, set kategori to null
            $this->merge(['kategori' => null]);
        }
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama barang wajib diisi.',
            'stok.required' => 'Stok wajib diisi.',
            'stok.integer' => 'Stok harus berupa angka.',
            'stok.min' => 'Stok tidak boleh negatif.',
            'harga.required' => 'Harga wajib diisi.',
            'harga.numeric' => 'Harga harus berupa angka.',
            'harga.min' => 'Harga tidak boleh negatif.',
        ];
    }
}


