export function quantityGoods(products) {
    const checkboxes = document.querySelectorAll('.custom-checkbox__field');

    const typeCount = {};

    products.forEach(product => {
        product.type.forEach(type => {
            if (type in typeCount) {
                typeCount[type]++;
            } else {
                typeCount[type] = 1;
            }
        });
    });

    checkboxes.forEach(checkbox => {
        const type = checkbox.value;
        const countElement = checkbox.parentElement.querySelector('.custom-checkbox__count');
        if (countElement) {
            countElement.textContent = typeCount[type] || 0;
        }
    });
}