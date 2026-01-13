// Filter.js
export function filterProducts(arrChecked, products, status) {
    return products.filter(product => {

        //Идет филтрация по нескольким параметрам

        //Извлекаем остатки товара и проверяем, имеется ли он хотя бы в одном месте
        // Проверяем наличие т.е переменная проверяет наличие товара в любом хранилище и присваивает ей значение true, если товар есть хотя бы в одном месте.
        const inStock = Object.values(product.availability).some(quantity => quantity > 0);

        //Проверяем, соответствует ли тип товара выбору пользователя 
        // Проверяем совпадение типов
        const matchesType =
            arrChecked.length === 0 || //если массив пустой значит пользователь не сделал никакого выбора
            product.type.some(type => arrChecked.includes(type));//Если массив не пустой, то проверяется, 
        // присутствует ли тип товара среди тех, что были отмечены пользователем.


        //Определяем, показывать ли все товары или только имеющиеся в наличии
        // Проверяем режим (все товары или только в наличии)
        let matchesStatus
        if (status === "all-item") {
            matchesStatus = true;
        } else {
            matchesStatus = inStock;
        }

        return matchesStatus && matchesType;
    });
}
