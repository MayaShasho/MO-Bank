export default function formatBalance(balance) {
    return `$${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}