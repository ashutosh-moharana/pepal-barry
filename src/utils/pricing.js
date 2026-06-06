/**
 * Calculates the effective price of a product after applying discounts.
 * Fixed discount price takes precedence over percentage discount.
 * 
 * @param {Object} product The product object
 * @returns {number} The effective price
 */
export const getEffectivePrice = (product) => {
    if (!product) return 0;
    
    if (product.discountPrice && product.discountPrice > 0) {
        return product.discountPrice;
    }
    
    if (product.discountPercent && product.discountPercent > 0) {
        return Math.round(product.price - (product.price * product.discountPercent) / 100);
    }
    
    return product.price || 0;
};

/**
 * Returns a formatted discount label for a product, if applicable.
 * 
 * @param {Object} product The product object
 * @returns {string|null} The discount label, or null if no discount applies
 */
export const getDiscountLabel = (product) => {
    if (!product) return null;
    
    if (product.discountPrice && product.discountPrice > 0) {
        const savings = (product.price || 0) - product.discountPrice;
        return savings > 0 ? `Save ₹${savings}` : null;
    }
    
    if (product.discountPercent && product.discountPercent > 0) {
        return `${product.discountPercent}% OFF`;
    }
    
    return null;
};
