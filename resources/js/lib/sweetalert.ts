import Swal from 'sweetalert2';

export const showSuccess = (message: string) => {
    return Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};

export const showError = (message: string) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
    });
};

export const showWarning = (message: string) => {
    return Swal.fire({
        icon: 'warning',
        title: 'Peringatan!',
        text: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};

export const showInfo = (message: string) => {
    return Swal.fire({
        icon: 'info',
        title: 'Info',
        text: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};

export const confirmDelete = (message: string = 'Apakah Anda yakin ingin menghapus?') => {
    return Swal.fire({
        title: 'Konfirmasi Hapus',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
        reverseButtons: true,
    });
};

export const showValidationErrors = (errors: Record<string, string[]>) => {
    const errorMessages = Object.values(errors).flat().join('<br>');
    return Swal.fire({
        icon: 'error',
        title: 'Validasi Gagal',
        html: errorMessages,
        confirmButtonText: 'OK',
    });
};

