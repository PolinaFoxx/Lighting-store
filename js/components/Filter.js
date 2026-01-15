export function filterProducts(arrChecked, products, status) {
    return products.filter(product => {

        const inStock = Object.values(product.availability).some(quantity => quantity > 0);

        const matchesType =
            arrChecked.length === 0 ||
            product.type.some(type => arrChecked.includes(type));

        let matchesStatus
        if (status === "all-item") {
            matchesStatus = true;
        } else {
            matchesStatus = inStock;
        }

        return matchesStatus && matchesType;
    });
}
