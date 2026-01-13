export function quantityGoods(products) {
    const checkboxes = document.querySelectorAll('.custom-checkbox__field');

    //объект для хранения количества товаров по типам
    const typeCount = {};

    //Подсчет количества товаров для каждого типа
    products.forEach(product => {
        // product.type — это массив,проходимся по массиву по каждому типу
        product.type.forEach(type => {
            if (type in typeCount) {
                typeCount[type]++;
            } else {
                typeCount[type] = 1;
            }
        });
    });

    // Обновляем количество товаров рядом с каждым чекбоксом
    checkboxes.forEach(checkbox => {
        const type = checkbox.value;
        const countElement = checkbox.parentElement.querySelector('.custom-checkbox__count');
        if (countElement) {
            countElement.textContent = typeCount[type] || 0;
        }
    });
}