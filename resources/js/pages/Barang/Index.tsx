import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import { confirmDelete, showError, showSuccess, showValidationErrors } from '../../lib/sweetalert';

interface Kategori {
    id: number;
    nama: string;
}

interface Barang {
    id: number;
    nama: string;
    deskripsi: string | null;
    stok: number;
    harga: number;
    kategori: Kategori | null;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: Barang[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface KategoriDropdown {
    id: number;
    nama: string;
}

interface Props {
    barangs: PaginatedData;
    kategoris: string[];
    kategorisDropdown: KategoriDropdown[];
    filters: {
        search?: string;
        kategori?: string;
        sort_by?: string;
        sort_order?: string;
    };
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index({ barangs, kategoris, kategorisDropdown, filters, auth, flash }: Props) {
    const validSortOrder = filters.sort_order && ['asc', 'desc'].includes(filters.sort_order.toLowerCase()) 
        ? filters.sort_order.toLowerCase() 
        : 'desc';
    const validSortBy = filters.sort_by && ['created_at', 'nama', 'harga', 'stok', 'kategori'].includes(filters.sort_by)
        ? filters.sort_by
        : 'created_at';

    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        kategori: filters.kategori || '',
        sort_by: validSortBy,
        sort_order: validSortOrder,
    });

    const [showModal, setShowModal] = useState(false);
    const [editingBarang, setEditingBarang] = useState<Barang | null>(null);
    const isInitialMount = useRef(true);

    const form = useForm({
        nama: '',
        deskripsi: '',
        stok: 0,
        harga: 0,
        kategori_id: null as number | null,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (data.search !== (filters.search || '')) {
                get('/barang', {
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [data.search]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const kategoriChanged = data.kategori !== (filters.kategori || '');
        const sortChanged = data.sort_by !== (filters.sort_by || 'created_at') || data.sort_order !== (filters.sort_order || 'desc');

        if (kategoriChanged || sortChanged) {
            get('/barang', {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [data.kategori, data.sort_by, data.sort_order]);

    useEffect(() => {
        if (flash?.success) {
            showSuccess(flash.success);
        }
        if (flash?.error) {
            showError(flash.error);
        }
    }, [flash]);

    const handleFilter = () => {
        get('/barang', {
            data: {
                search: data.search || null,
                kategori: data.kategori || null,
                sort_by: data.sort_by,
                sort_order: data.sort_order,
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (field: string) => {
        const newOrder = data.sort_by === field && data.sort_order === 'asc' ? 'desc' : 'asc';
        setData({
            ...data,
            sort_by: field,
            sort_order: newOrder,
        });
        get('/barang', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openCreateModal = () => {
        form.reset();
        setEditingBarang(null);
        setShowModal(true);
    };

    const openEditModal = (barang: Barang) => {
        form.setData({
            nama: barang.nama,
            deskripsi: barang.deskripsi || '',
            stok: barang.stok,
            harga: barang.harga,
            kategori_id: barang.kategori?.id || null,
        });
        setEditingBarang(barang);
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBarang) {
            form.put(`/barang/${editingBarang.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    showSuccess('Barang berhasil diperbarui.');
                },
                onError: (errors) => {
                    if (Object.keys(errors).length > 0) {
                        showValidationErrors(errors);
                    } else {
                        showError('Gagal memperbarui barang.');
                    }
                },
            });
        } else {
            form.post('/barang', {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    showSuccess('Barang berhasil ditambahkan.');
                },
                onError: (errors) => {
                    if (Object.keys(errors).length > 0) {
                        showValidationErrors(errors);
                    } else {
                        showError('Gagal menambahkan barang.');
                    }
                },
            });
        }
    };

    const handleDelete = async (id: number, nama: string) => {
        const result = await confirmDelete(`Apakah Anda yakin ingin menghapus "${nama}"?`);
        if (result.isConfirmed) {
            router.delete(`/barang/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    showSuccess('Barang berhasil dihapus.');
                },
                onError: () => {
                    showError('Gagal menghapus barang.');
                },
            });
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const clearFilters = () => {
        setData({
            search: '',
            kategori: '',
            sort_by: 'created_at',
            sort_order: 'desc',
        });
        router.get('/barang', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <Head title="Daftar Barang" />
            <div className="py-6">
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
                            <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Barang</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Kelola daftar barang dan inventori</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total: <span className="font-semibold text-gray-700 dark:text-gray-300">{barangs.total}</span> barang
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Barang</span>
                    </button>
                </div>

                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <label htmlFor="search" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Cari Barang
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    id="search"
                                    type="text"
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 pl-10 pr-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Cari nama, deskripsi, atau kategori..."
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="kategori" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Kategori
                            </label>
                            <select
                                id="kategori"
                                value={data.kategori}
                                onChange={(e) => {
                                    setData('kategori', e.target.value);
                                }}
                                className="block w-full rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Semua Kategori</option>
                                {kategoris.map((kat) => (
                                    <option key={kat} value={kat}>
                                        {kat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sort_by" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Urutkan
                            </label>
                            <select
                                id="sort_by"
                                value={`${data.sort_by}_${data.sort_order}`}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split('_');
                                    setData({ sort_by: field, sort_order: order });
                                }}
                                className="block w-full rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="created_at_desc">Terbaru</option>
                                <option value="created_at_asc">Terlama</option>
                                <option value="nama_asc">Nama A-Z</option>
                                <option value="nama_desc">Nama Z-A</option>
                                <option value="harga_asc">Harga Terendah</option>
                                <option value="harga_desc">Harga Tertinggi</option>
                                <option value="stok_asc">Stok Terendah</option>
                                <option value="stok_desc">Stok Tertinggi</option>
                            </select>
                        </div>
                    </div>

                    {(data.search || data.kategori) && (
                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={clearFilters}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                Hapus Filter
                            </button>
                            {data.search && (
                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                    Pencarian: {data.search}
                                </span>
                            )}
                            {data.kategori && (
                                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                    Kategori: {data.kategori}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {barangs.data.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Tidak ada barang</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {data.search || data.kategori
                                ? 'Tidak ada barang yang sesuai dengan filter Anda.'
                                : 'Mulai dengan menambahkan barang pertama Anda.'}
                        </p>
                        {!data.search && !data.kategori && (
                            <button
                                onClick={openCreateModal}
                                className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                            >
                                Tambah Barang
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                                onClick={() => handleSort('nama')}
                                            >
                                                <div className="flex items-center gap-2">
                                                    Nama
                                                    {data.sort_by === 'nama' && (
                                                        <svg
                                                            className={`h-4 w-4 ${data.sort_order === 'asc' ? '' : 'rotate-180'}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                                            >
                                                Kategori
                                            </th>
                                            <th
                                                scope="col"
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                                onClick={() => handleSort('stok')}
                                            >
                                                <div className="flex items-center gap-2">
                                                    Stok
                                                    {data.sort_by === 'stok' && (
                                                        <svg
                                                            className={`h-4 w-4 ${data.sort_order === 'asc' ? '' : 'rotate-180'}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                                onClick={() => handleSort('harga')}
                                            >
                                                <div className="flex items-center gap-2">
                                                    Harga
                                                    {data.sort_by === 'harga' && (
                                                        <svg
                                                            className={`h-4 w-4 ${data.sort_order === 'asc' ? '' : 'rotate-180'}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Aksi</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {barangs.data.map((barang) => (
                                            <tr key={barang.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{barang.nama}</div>
                                                    {barang.deskripsi && (
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                                            {barang.deskripsi}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {barang.kategori ? (
                                                        <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                                            {barang.kategori.nama}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            barang.stok > 10
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : barang.stok > 0
                                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}
                                                    >
                                                        {barang.stok}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                    {formatCurrency(barang.harga)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => openEditModal(barang)}
                                                            className="text-indigo-600 transition-colors hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(barang.id, barang.nama)}
                                                            className="text-red-600 transition-colors hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {barangs.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan <span className="font-medium">{barangs.data.length}</span> dari{' '}
                                    <span className="font-medium">{barangs.total}</span> barang
                                </div>
                                <div className="flex gap-2">
                                    {barangs.links.map((link, index) => {
                                        if (link.url === null) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }

                                        const isActive = link.active;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    router.get(link.url!, {}, { preserveState: true, preserveScroll: true });
                                                }}
                                                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:border-indigo-400 dark:bg-indigo-900 dark:text-indigo-300'
                                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    form.clearErrors();
                }}
                title={editingBarang ? 'Edit Barang' : 'Tambah Barang Baru'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="modal-nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nama Barang <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="modal-nama"
                            type="text"
                            value={form.data.nama}
                            onChange={(e) => form.setData('nama', e.target.value)}
                            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${
                                form.errors.nama ? 'border-red-500' : ''
                            }`}
                            placeholder="Contoh: Laptop ASUS ROG"
                            required
                        />
                        {form.errors.nama && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.nama}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="modal-deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Deskripsi
                        </label>
                        <textarea
                            id="modal-deskripsi"
                            value={form.data.deskripsi}
                            onChange={(e) => form.setData('deskripsi', e.target.value)}
                            rows={3}
                            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${
                                form.errors.deskripsi ? 'border-red-500' : ''
                            }`}
                            placeholder="Deskripsi lengkap tentang barang..."
                        />
                        {form.errors.deskripsi && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.deskripsi}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="modal-stok" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Stok <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="modal-stok"
                                type="text"
                                inputMode="numeric"
                                value={form.data.stok === 0 ? '' : form.data.stok.toString()}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    if (value.length > 1 && value.startsWith('0') && value !== '0') {
                                        value = value.replace(/^0+/, '');
                                    }
                                    if (value === '') {
                                        form.setData('stok', 0);
                                    } else {
                                        const numValue = parseInt(value, 10);
                                        if (!isNaN(numValue) && numValue >= 0) {
                                            form.setData('stok', numValue);
                                        }
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        form.setData('stok', 0);
                                    }
                                }}
                                className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${
                                    form.errors.stok ? 'border-red-500' : ''
                                }`}
                                required
                            />
                            {form.errors.stok && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.stok}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="modal-harga" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Harga <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">Rp</span>
                                </div>
                                <input
                                    id="modal-harga"
                                    type="text"
                                    inputMode="numeric"
                                    value={form.data.harga === 0 ? '' : form.data.harga.toString()}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (value.length > 1 && value.startsWith('0') && value !== '0') {
                                            value = value.replace(/^0+/, '');
                                        }
                                        if (value === '') {
                                            form.setData('harga', 0);
                                        } else {
                                            const numValue = parseFloat(value);
                                            if (!isNaN(numValue) && numValue >= 0) {
                                                form.setData('harga', numValue);
                                            }
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (e.target.value === '') {
                                            form.setData('harga', 0);
                                        }
                                    }}
                                    className={`block w-full rounded-lg border-gray-300 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${
                                        form.errors.harga ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                            </div>
                            {form.errors.harga && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.harga}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="modal-kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Kategori
                        </label>
                        <select
                            id="modal-kategori"
                            value={form.data.kategori_id || ''}
                            onChange={(e) => form.setData('kategori_id', e.target.value ? parseInt(e.target.value) : null)}
                            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${
                                form.errors.kategori_id ? 'border-red-500' : ''
                            }`}
                        >
                            <option value="">Pilih Kategori</option>
                            {kategorisDropdown.map((kat) => (
                                <option key={kat.id} value={kat.id}>
                                    {kat.nama}
                                </option>
                            ))}
                        </select>
                        {form.errors.kategori_id && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.kategori_id}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                                form.clearErrors();
                            }}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                            {form.processing ? 'Menyimpan...' : editingBarang ? 'Simpan Perubahan' : 'Simpan Barang'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
}
