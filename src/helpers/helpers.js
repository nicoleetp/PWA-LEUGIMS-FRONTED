export function formatMoney(cantidad) {
    return cantidad.toLocaleString('en-PE', {
        style: 'currency',
        currency: 'PEN'
    });
}
