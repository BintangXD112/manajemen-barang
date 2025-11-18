import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import { confirmDelete, showError, showSuccess, showValidationErrors } from '../../lib/sweetalert';

interface Kategori {
    id: number;
    nama: string;
    deskripsi: string | null;
    created_at: string;
    updated_at: string;
    barangs_count?: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: Kategori[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    kategoris: PaginatedData;
    filters: {
        search?: string;
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

export default function Index({ kategoris, filters, auth, flash }: Props) {
    // Validate and sanitize filter values
    const validSortOrder = filters.sort_order && ['asc', 'desc'].includes(filters.sort_order.toLowerCase()) 
        ? filters.sort_order.toLowerCase() 
        : 'desc';
    const validSortBy = filters.sort_by && ['created_at', 'nama'].includes(filters.sort_by)
        ? filters.sort_by
        : 'created_at';

    const { data, setData, get } = useForm({
        search: filters.search || '',
        sort_by: validSortBy,
        sort_order: validSortOrder,
    });

    const [showModal, setShowModal] = useState(false);
    const [editingKategori, setEditingKategori] = useState<Kategori | null>(null);
    const isInitialMount = useRef(true);

    const form = useForm({
        nama: '',
        deskripsi: '',
    });

    // Debounced search
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (data.search !== (filters.search || '')) {
                get('/kategori', {
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [data.search]);

    // Handle sort changes immediately
    useEffect(() => {
        // Skip initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const sortChanged = data.sort_by !== (filters.sort_by || 'created_at') || data.sort_order !== (filters.sort_order || 'desc');

        if (sortChanged) {
            get('/kategori', {
                preserveState: true,
                preserveScroll: true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.sort_by, data.sort_order]);

    useEffect(() => {
        if (flash?.success) {
            showSuccess(flash.success);
        }
        if (flash?.error) {
            showError(flash.error);
        }
    }, [flash]);

    const handleSort = (field: string) => {
        const newOrder = data.sort_by === field && data.sort_order === 'asc' ? 'desc' : 'asc';
        setData({
            ...data,
            sort_by: field,
            sort_order: newOrder,
        });
        get('/kategori', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openCreateModal = () => {
        form.reset();
        setEditingKategori(null);
        setShowModal(true);
    };

    const openEditModal = (kategori: Kategori) => {
        form.setData({
            nama: kategori.nama,
            deskripsi: kategori.deskripsi || '',
        });
        setEditingKategori(kategori);
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingKategori) {
            form.put(`/kategori/${editingKategori.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    showSuccess('Kategori berhasil diperbarui.');
                },
                onError: (errors) => {
                    if (Object.keys(errors).length > 0) {
                        showValidationErrors(errors);
                    } else {
                        showError('Gagal memperbarui kategori.');
                    }
                },
            });
        } else {
            form.post('/kategori', {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    showSuccess('Kategori berhasil ditambahkan.');
                },
                onError: (errors) => {
                    if (Object.keys(errors).length > 0) {
                        showValidationErrors(errors);
                    } else {
                        showError('Gagal menambahkan kategori.');
                    }
                },
            });
        }
    };

    const handleDelete = async (id: number, nama: string) => {
        const result = await confirmDelete(`Apakah Anda yakin ingin menghapus kategori "${nama}"?`);
        if (result.isConfirmed) {
            router.delete(`/kategori/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    showSuccess('Kategori berhasil dihapus.');
                },
                onError: () => {
                    showError('Gagal menghapus kategori.');
                },
            });
        }
    };

    const clearFilters = () => {
        setData({
            search: '',
            sort_by: 'created_at',
            sort_order: 'desc',
        });
        router.get('/kategori', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <Head title="Kelola Kategori" />
            <div className="py-6">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                            <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kategori</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Kelola kategori barang</p>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total: <span className="font-semibold text-gray-700 dark:text-gray-300">{kategoris.total}</span> kategori
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Kategori</span>
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <label htmlFor="search" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Cari Kategori
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
                                    placeholder="Cari nama atau deskripsi kategori..."
                                />
                            </div>
                        </div>

                        {/* Sort */}
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
                                    get('/kategori', {
                                        preserveState: true,
                                        preserveScroll: true,
                                    });
                                }}
                                className="block w-full rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="created_at_desc">Terbaru</option>
                                <option value="created_at_asc">Terlama</option>
                                <option value="nama_asc">Nama A-Z</option>
                                <option value="nama_desc">Nama Z-A</option>
                            </select>
                        </div>
                    </div>

                    {data.search && (
                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={clearFilters}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                Hapus Filter
                            </button>
                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                Pencarian: {data.search}
                            </span>
                        </div>
                    )}
                </div>

                {/* Table */}
                {kategoris.data.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Tidak ada kategori</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {data.search
                                ? 'Tidak ada kategori yang sesuai dengan pencarian Anda.'
                                : 'Mulai dengan menambahkan kategori pertama Anda.'}
                        </p>
                        {!data.search && (
                            <button
                                onClick={openCreateModal}
                                className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                            >
                                Tambah Kategori
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
                                                    Nama Kategori
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                                Deskripsi
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                                Jumlah Barang
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Aksi</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {kategoris.data.map((kategori) => (
                                            <tr key={kategori.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{kategori.nama}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {kategori.deskripsi || <span className="text-gray-400">-</span>}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                                        {kategori.barangs_count || 0} barang
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => openEditModal(kategori)}
                                                            className="text-indigo-600 transition-colors hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(kategori.id, kategori.nama)}
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

                        {/* Pagination */}
                        {kategoris.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan <span className="font-medium">{kategoris.data.length}</span> dari{' '}
                                    <span className="font-medium">{kategoris.total}</span> kategori
                                </div>
                                <div className="flex gap-2">
                                    {kategoris.links.map((link, index) => {
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

            {/* Modal Create/Edit */}
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    form.clearErrors();
                }}
                title={editingKategori ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="modal-nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nama Kategori <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="modal-nama"
                            type="text"
                            value={form.data.nama}
                            onChange={(e) => form.setData('nama', e.target.value)}
                            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${
                                form.errors.nama ? 'border-red-500' : ''
                            }`}
                            placeholder="Contoh: Elektronik, Pakaian, Makanan"
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
                            placeholder="Deskripsi kategori (opsional)"
                        />
                        {form.errors.deskripsi && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.deskripsi}</p>
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
                            {form.processing ? 'Menyimpan...' : editingKategori ? 'Simpan Perubahan' : 'Simpan Kategori'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
}

