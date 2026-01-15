import { basketService } from './BasketService.js';
import { basketView } from './BasketView.js';

let isToggleBound = false;
let isInitialized = false;
let productsCache = [];

export function setupToggleOnly() {
    if (isToggleBound) return;
    isToggleBound = true;

    const DOM = basketView.getDOM();
    const headerUserBtn = document.querySelector('.header__user-btn');

    if (headerUserBtn) {
        headerUserBtn.addEventListener('click', (e) => {
            e.preventDefault();
            basketView.toggleBasket();
        });
    }

    document.addEventListener('click', (e) => {
        if (!DOM.basket) return;
        const isClickInsideBasket = DOM.basket.contains(e.target);
        const isClickOnBtn = headerUserBtn && headerUserBtn.contains(e.target);
        const isClickOnAddToBasketBtn = e.target.closest('.product-card__link');

        if (DOM.basket.classList.contains('basket--active') && !isClickInsideBasket && !isClickOnBtn && !isClickOnAddToBasketBtn) {
            basketView.closeBasket();
        }
    });
}

export function init(products) {
    if (isInitialized) {
        console.log();
        productsCache = products;
        updateView();
        return;
    }
    isInitialized = true;
    productsCache = products;

    setupToggleOnly();

    const DOM = basketView.getDOM();

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
