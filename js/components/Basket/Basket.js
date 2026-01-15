import { setupToggleOnly, init as initController } from './BasketController.js';

export function toggleBasket() {
  setupToggleOnly();
}

export function basketData(products) {
  initController(products);
}
