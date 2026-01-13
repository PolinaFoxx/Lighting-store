//Кэшируем DOM элименты
const DOM = {
    basket: document.querySelector('.basket'),
    list: document.querySelector('.basket__list'),
    totalBlock: document.querySelector('.basket__total'),
    totalPrice: document.querySelector('.basket__total-price'),
    emptyBlock: document.querySelector('.basket__empty-block'),
    orderLink: document.querySelector('.basket__link'),
    headerCounter: document.querySelector('.header__user-count'),
};

const formatter = new Intl.NumberFormat('ru-RU');
//Создаем объект с методами 
export const basketView = {
    // Рендер всей корзины по данным items = [{id, product, qty}]
    //Метод рендер
    render(items = []) {
        //тело метода
        if (!DOM.list) return;

        //необходимо при каждом обновлении корзины не дублировались товары, а рисовался актуальный список.
        DOM.list.innerHTML = '';

        items.forEach(({ id, product, qty }) => {
            const li = document.createElement('li');
            li.classList.add('basket__item')
            li.dataset.id = id;
            li.innerHTML = `
        <div class="basket__img">
          <img src="images/${product.image}" alt="${product.name}" height="60" width="60">
        </div>
        <span class="basket__name">${product.name}</span>
        <span class="basket__price" data-unit-price="${product.price.new}">${product.price.new} руб.</span>
            
        <div class="basket__counter">
          <button class="basket__counter-btn basket__counter-minus" data-action="minus" ${qty <= 1 ? 'disabled' : ''}>-</button>
          <div class="basket__counter-value">${qty}</div>
                <button class="basket__counter-btn basket__counter-plus" data-action="plus">+</button>


        <button class="basket__item-close" type="button" data-action="remove" aria-label="Удалить товар">
          <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
        </div>

      `;
            DOM.list.appendChild(li);
        });
    },

    updateTotals(total) {
        if (!DOM.totalPrice) return;
        DOM.totalPrice.textContent = formatter.format(total);
    },

    updateCounter(count) {
        if (!DOM.headerCounter) return;
        DOM.headerCounter.textContent = count;
    },

    toggleEmpty(isEmpty) {
        if (!DOM.emptyBlock || !DOM.orderLink || !DOM.totalBlock) return;
        // Если корзина пустая -> показать emptyBlock (удалить класс 'close'), скрыть total и orderLink
        DOM.emptyBlock.classList.toggle('close', !isEmpty);
        DOM.orderLink.classList.toggle('open', !isEmpty);
        DOM.totalBlock.classList.toggle('open', !isEmpty);
    },

    toggleBasket() {
        if (!DOM.basket) return;
        DOM.basket.classList.toggle('basket--active');
    },

    closeBasket() {
        if (!DOM.basket) return;
        DOM.basket.classList.remove('basket--active');
    },

    getDOM() {
        return DOM;
    }
};
