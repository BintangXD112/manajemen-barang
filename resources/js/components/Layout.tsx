import { Link, router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface LayoutProps {
    children: ReactNode;
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
}

export default function Layout({ children, auth }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Sidebar */}
            <aside
                className={`hidden border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 lg:block ${
                    sidebarOpen ? 'w-64' : 'w-20'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo/Brand */}
                    <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            {sidebarOpen && (
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        📦 Manajemen Barang
                                    </h1>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Sistem Inventori</p>
                                </div>
                            )}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="ml-auto rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                title={sidebarOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
                            >
                                <svg
                                    className={`h-5 w-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        <Link
                            href="/barang"
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
                                !sidebarOpen ? 'justify-center' : ''
                            }`}
                            title="Daftar Barang"
                        >
                            <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            {sidebarOpen && <span>Daftar Barang</span>}
                        </Link>
                    </nav>

                    {/* User Info */}
                    <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                        {sidebarOpen ? (
                            <>
                                <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{auth.user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{auth.user.email}</p>
                                </div>
                                <button
                                    onClick={() => router.post('/logout')}
                                    className="flex w-full items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Keluar
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => router.post('/logout')}
                                className="flex w-full items-center justify-center rounded-lg bg-red-50 p-2 text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                                title="Keluar"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Mobile Header */}
                <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80 lg:hidden">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">📦 Manajemen Barang</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{auth.user.name}</span>
                            <button
                                onClick={() => router.post('/logout')}
                                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
