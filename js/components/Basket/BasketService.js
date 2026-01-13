//чистая логика и состояние
class BasketService {
    constructor() {
        //создаем ссылку на свойство объекта = создает новый объект
        this.items = new Map();
    }

    add(product) {
        const id = Number(product.id);//берем id продукта и приводим к числу
        const existing = this.items.get(id);//возвращает значение, которое хранится под ключом id в Map.
        if (existing) {//это условие, которое проверяет, существует ли уже товар с таким id в корзине.
            //увеличиваем количество существующего(одинакого) товара
            existing.qty += 1; //qty — это счётчик количества одинаковых товаров
        } else {
            this.items.set(id, { product, qty: 1 }); //добавляем один экземпляр товара
        }
    }

    // Удаляем товар по ключу
    remove(id) {
        this.items.delete(Number(id));
    }

    //Устанавливаем количество товаров
    setQty(id, qty) {
        id = Number(id);
        qty = Number(qty);
        if (!this.items.has(id)) return; //проверяет, есть ли товар с таким id в Map.

        //если пользователь уменьшил количество до 0, товар исчезает из корзины
        if (qty <= 0) {
            this.items.delete(id);
        } else {
            //обновляем количество товара
            this.items.get(id).qty = qty;
        }
    }

    //Получаем все товары из корзины в удобном виде.
    getItems() {
        // Возвращаем массив элементов { id, product, qty }
        return Array.from(this.items.entries()).map(([id, { product, qty }]) => ({
            id: Number(id),
            product,
            qty
        }));
    }

    getTotals() {
        // Общая сумма (используем unit price * qty)
        let total = 0;//хранит накопленную сумму всех товаров

        //перебираем значения Map т.е значения this.items т.е проходимся по товарам в корзине
        for (const { product, qty } of this.items.values()) {
            //На каждой итерации цикла добавляем к total стоимость текущего товара .
            total += (Number(product.price.new) || 0) * qty;//(цена × количество)
        }
        return total; //итоговая цена всех продуктов в корзине
    }

    //Узнаем сколько всего товаров находится в корзине, без учёта их уникальности
    getCount() {
        let count = 0;//общее количество товаров в корзине
        for (const { qty } of this.items.values())//Перебираем все значения Map (каждый объект { product, qty })
             count += qty;//Суммируем qty всех товаров.
        return count;
    }

    //Проверка есть ли товар в корзине
    isEmpty() {
        return this.items.size === 0; //Метод сразу возвращает булево значение: true или false.Есть в корзине что то или нет
    }

    //Чистим корзину
    clear() {
        this.items.clear();
    }
}

export const basketService = new BasketService();
