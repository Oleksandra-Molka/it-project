export function calculateTotal(price, quantity, discountPercentage = 0) {
    if (price < 0 || quantity < 0) return 0;
    if (discountPercentage < 0 || discountPercentage > 100) return 0;
    
    const subtotal = price * quantity;
    const discountAmount = subtotal * (discountPercentage / 100);
    return subtotal - discountAmount;
}