import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Barang {
    id: number;
    nama: string;
    deskripsi: string | null;
    stok: number;
    harga: number;
    kategori: string | null;
}

interface Props {
    barang: Barang;
}

export default function Edit({ barang }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama: barang.nama,
        deskripsi: barang.deskripsi || '',
        stok: barang.stok,
        harga: barang.harga,
        kategori: barang.kategori || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/barang/${barang.id}`);
    };

    return (
        <>
            <Head title="Edit Barang" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link
                                href="/barang"
                                className="flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali ke Daftar Barang
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Barang</h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Ubah informasi barang yang dipilih</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nama Barang <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="nama"
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    required
                                />
                                {errors.nama && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nama}</p>}
                            </div>

                            <div>
                                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Deskripsi
                                </label>
                                <textarea
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                />
                                {errors.deskripsi && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deskripsi}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="stok" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Stok <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="stok"
                                        type="number"
                                        min="0"
                                        value={data.stok}
                                        onChange={(e) => setData('stok', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                        required
                                    />
                                    {errors.stok && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.stok}</p>}
                                </div>

                                <div>
                                    <label htmlFor="harga" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Harga <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">Rp</span>
                                        </div>
                                        <input
                                            id="harga"
                                            type="number"
                                            min="0"
                                            step="100"
                                            value={data.harga}
                                            onChange={(e) => setData('harga', parseFloat(e.target.value) || 0)}
                                            className="block w-full rounded-lg border-gray-300 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                            required
                                        />
                                    </div>
                                    {errors.harga && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.harga}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Kategori
                                </label>
                                <input
                                    id="kategori"
                                    type="text"
                                    value={data.kategori}
                                    onChange={(e) => setData('kategori', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                />
                                {errors.kategori && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.kategori}</p>}
                            </div>

                            <div className="flex justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                                <Link
                                    href="/barang"
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Menyimpan...
                                        </span>
                                    ) : (
                                        'Simpan Perubahan'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
