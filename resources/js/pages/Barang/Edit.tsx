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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <nav className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <Link href="/barang" className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    ← Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Edit Barang</h2>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nama Barang *
                                </label>
                                <input
                                    id="nama"
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
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
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                />
                                {errors.deskripsi && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deskripsi}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="stok" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Stok *
                                    </label>
                                    <input
                                        id="stok"
                                        type="number"
                                        min="0"
                                        value={data.stok}
                                        onChange={(e) => setData('stok', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                        required
                                    />
                                    {errors.stok && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.stok}</p>}
                                </div>

                                <div>
                                    <label htmlFor="harga" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Harga *
                                    </label>
                                    <input
                                        id="harga"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.harga}
                                        onChange={(e) => setData('harga', parseFloat(e.target.value) || 0)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                        required
                                    />
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                                />
                                {errors.kategori && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.kategori}</p>}
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link
                                    href="/barang"
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}

