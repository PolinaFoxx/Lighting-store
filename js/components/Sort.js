export function sortProducts(products, typeSort) {
    // Копируем массив, чтобы не изменять оригинал
    const sortedProducts = [...products];

    switch (typeSort) {
        case "price-min":
            sortedProducts.sort((a, b) => a.price.new - b.price.new);
            break;
        case "price-max":
            sortedProducts.sort((a, b) => b.price.new - a.price.new);
            break;
        case "rating-max":
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    return sortedProducts;
}