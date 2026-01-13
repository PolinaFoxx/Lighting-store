// components/Basket.js
import { setupToggleOnly, init as initController } from './BasketController.js';

// Старая публичная пара функций, которые ожидает main.js:
// toggleBasket() — вызывается без аргументов чтобы навесить поведение открытия/закрытия.
// basketData(products) — инициализирует корзину с массивом products.
export function toggleBasket() {
  setupToggleOnly();
}

export function basketData(products) {
  initController(products);
}
