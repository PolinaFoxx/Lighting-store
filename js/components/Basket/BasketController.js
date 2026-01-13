// components/BasketController.js
import { basketService } from './BasketService.js';
import { basketView } from './BasketView.js';

let isToggleBound = false;//этот флаг отвечает за то, навешены ли уже обработчики открытия/закрытия корзины или нет. False значит что нет
let isInitialized = false;//инициализация контроллера
let productsCache = []; //Это локальный массив в контроллере, где хранится список всех товаров, которые доступны на странице и которые можно добавлять в корзину

// Один раз навесим обработчики открытия/закрытия корзины
export function setupToggleOnly() {
    if (isToggleBound) return;
    //Устанавливаем флаг true, чтобы при следующих вызовах этой функции больше не навешивать обработчики.
    isToggleBound = true;

    const DOM = basketView.getDOM();//В переменную DOM сохраняем ссылку на уже существующие элементы
    const headerUserBtn = document.querySelector('.header__user-btn');

    if (headerUserBtn) {
        headerUserBtn.addEventListener('click', (e) => {
            e.preventDefault();
            basketView.toggleBasket();//вызываем метод из basketView, который открывает корзину, если она закрыта, или закрывает, если открыта.
        });
    }

    //Слушаем документ,клик.
    document.addEventListener('click', (e) => {
        if (!DOM.basket) return;
        const isClickInsideBasket = DOM.basket.contains(e.target);//кликнули ли мы внутри корзины.
        const isClickOnBtn = headerUserBtn && headerUserBtn.contains(e.target);
            const isClickOnAddToBasketBtn = e.target.closest('.product-card__link');

        // если клик вне корзины и не на кнопке — закрываем
        if (DOM.basket.classList.contains('basket--active') && !isClickInsideBasket && !isClickOnBtn && !isClickOnAddToBasketBtn) {
            basketView.closeBasket();
        }
    });
}

export function init(products) {
    // Инициализация контроллера
    if (isInitialized) {
        console.log();
        // просто обновим кэш продуктов и отрисуем текущее состояние
        productsCache = products;
        updateView();
        return;
    }
    isInitialized = true;
    productsCache = products;//в productsCache записываем массив с товарами

    // Гарантируем, что toggle обработчики есть
    setupToggleOnly();

    const DOM = basketView.getDOM();

    // Добавление товара из каталога (делегирование)
    ['.catalog__list', '.day-products__list'].forEach(selector => {
        const list = document.querySelector(selector);
        if (!list) return;

        list.addEventListener('click', (e) => {
            const btn = e.target.closest('.product-card__link.btn--icon');
            if (!btn) return;
            e.preventDefault();

            const id = Number(btn.dataset.id);
            const product = productsCache.find(p => Number(p.id) === id);
            if (!product) return;

            basketService.add(product);
            updateView();
        });
    });

    // Обработка кнопок внутри корзины (plus/minus/remove)
    if (DOM.list) {
        DOM.list.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (!actionBtn) return;

            e.stopPropagation()

            const action = actionBtn.dataset.action;
            const itemEl = actionBtn.closest('.basket__item');
            if (!itemEl) return;
            const id = Number(itemEl.dataset.id);

            if (action === 'remove') {
                basketService.remove(id);
            } else if (action === 'plus') {
                const entry = basketService.items.get(id);
                if (entry) basketService.setQty(id, entry.qty + 1);
            } else if (action === 'minus') {
                const entry = basketService.items.get(id);
                if (entry) {
                    const newQty = entry.qty - 1;
                    basketService.setQty(id, newQty);
                }
            }
            updateView();
        });
    }

    // Первичная отрисовка
    updateView();
}

function updateView() {
    const items = basketService.getItems();
    const total = basketService.getTotals();
    const count = basketService.getCount();

    basketView.render(items);
    basketView.updateTotals(total);
    basketView.updateCounter(count);
    basketView.toggleEmpty(!basketService.isEmpty() ? false : true);
    basketView.toggleEmpty(basketService.isEmpty());
}
