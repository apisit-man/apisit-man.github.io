const defaultAdminApiUrl = 'https://script.google.com/macros/s/AKfycbxStfrEAiV-lCDy4nqZBLPtH8b0O5K2C7XMb53AQ58zul9Aqkw0vjIEbLGzy918iamwew/exec';
const isLocalAdminDevelopment = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const localAdminApiUrl = isLocalAdminDevelopment
    ? new URLSearchParams(window.location.search).get('adminApiUrl')
    : '';

window.ADMIN_CONFIG = {
    apiUrl: localAdminApiUrl || defaultAdminApiUrl,
    promptApiUrl: 'https://script.google.com/macros/s/AKfycbwWYZ_ho5Wsqp0YqkvtMLHHvMeSCkBL0MV-2hbV5zwd8M_aOfMGSxq8piRKWd6R4WrLyQ/exec'
};
