import { Head, Link } from '@inertiajs/react';
import Layout from '../components/Layout';

interface Kategori {
    id: number;
    nama: string;
}

interface Barang {
    id: number;
    nama: string;
    stok: number;
    harga: number;
    kategori: Kategori | null;
    created_at: string;
}

interface KategoriPopuler {
    id: number;
    nama: string;
    barang_count: number;
}

interface Props {
    stats: {
        total_barang: number;
        total_kategori: number;
        total_stok: number;
        total_nilai: number;
    };
    barang_terbaru: Barang[];
    kategori_populer: KategoriPopuler[];
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
}

export default function Dashboard({ stats, barang_terbaru, kategori_populer, auth }: Props) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <Layout>
            <Head title="Dashboard" />
            <div className="py-6">
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
                            <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Ringkasan data dan statistik aplikasi</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Barang</dt>
                                        <dd className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_barang}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <Link href="/barang" className="font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-400">
                                    Lihat semua →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Kategori</dt>
                                        <dd className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_kategori}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <Link href="/kategori" className="font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-400">
                                    Lihat semua →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Stok</dt>
                                        <dd className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_stok.toLocaleString('id-ID')}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Nilai</dt>
                                        <dd className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(stats.total_nilai)}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="border-b border-gray-200 bg-white px-4 py-5 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Barang Terbaru</h3>
                                <Link href="/barang" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">
                                    Lihat semua →
                                </Link>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {barang_terbaru.length === 0 ? (
                                <div className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-6">
                                    Belum ada barang
                                </div>
                            ) : (
                                barang_terbaru.map((barang) => (
                                    <div key={barang.id} className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{barang.nama}</p>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    {barang.kategori && (
                                                        <span className="inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                                            {barang.kategori.nama}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="ml-4 text-right">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(barang.harga)}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Stok: {barang.stok}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="border-b border-gray-200 bg-white px-4 py-5 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Kategori Populer</h3>
                                <Link href="/kategori" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">
                                    Lihat semua →
                                </Link>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {kategori_populer.length === 0 ? (
                                <div className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-6">
                                    Belum ada kategori
                                </div>
                            ) : (
                                kategori_populer.map((kategori) => (
                                    <div key={kategori.id} className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{kategori.nama}</p>
                                            </div>
                                            <div className="ml-4">
                                                <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                    {kategori.barang_count} barang
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

