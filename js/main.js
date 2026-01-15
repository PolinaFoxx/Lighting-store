import { toggleBurgerMenu } from "./components/BurgerMenu.js";
import { selectCityMenu } from "./components/CitySelectMenu.js";
import { toggleAccordion } from "./components/Accordion.js";
import { initValidation } from "./components/Validation.js";
import { getCardsServer, renderCards } from "./components/ProductCards.js";
import { pagination } from "./components/Pagination.js";
import { toggleBasket, basketData } from "./components/Basket/Basket.js";
import { slider, initializationSlider } from "./components/Slider.js";
import { quantityGoods } from "./components/QuantityGoods.js";
import { filterProducts } from "./components/Filter.js";
import { sortProducts } from "./components/Sort.js";

window.addEventListener('DOMContentLoaded', async () => {
    toggleBurgerMenu();
    selectCityMenu();
    toggleAccordion();
    initValidation();


    const products = await getCardsServer();
    const container = document.querySelector('.catalog__list');

    toggleBasket();
    basketData(products);
    slider(products);
    initializationSlider();
    quantityGoods(products);

    let currentPage = 1;
    let mutatedProducts = [...products];
    const renderProductsPage = (prods, page) => {
        container.innerHTML = '';
        const productCont = 6;
        const firstProductIndex = productCont * (page - 1);

        const productsOnPage = prods.slice(firstProductIndex, firstProductIndex + productCont);
        renderCards(productsOnPage, container);
    };

    const initPagination = (prods) => {
        pagination(prods, currentPage, (page) => {
            currentPage = page;
            renderProductsPage(prods, currentPage);
        });
    };

    //Фильтрация
    const checkboxInputs = document.querySelectorAll('.custom-checkbox__field');
    const radioInputs = document.querySelectorAll('.custom-radio__field');
    const sortSelect = document.querySelector('.catalog__sort-select');

    function applyFilters() {
        const arrChecked = Array.from(checkboxInputs)
            .filter(input => input.checked)
            .map(input => input.value);

        const statusEl = document.querySelector('.custom-radio__field:checked');
        const status = statusEl ? statusEl.value : 'all-item';

        mutatedProducts = filterProducts(arrChecked, products, status);

        currentPage = 1;
        applySort(true);
    }

    //Сортировка
    function applySort(reRender = true) {
        const typeSort = sortSelect ? sortSelect.value : '';
        const sorted = sortProducts(mutatedProducts, typeSort);
        if (Array.isArray(sorted)) {
            mutatedProducts = sorted;
        }

        if (reRender) {
            currentPage = 1;

            renderProductsPage(mutatedProducts, currentPage);

            initPagination(mutatedProducts);
        }
    }

    checkboxInputs.forEach(checkbox => checkbox.addEventListener('change', applyFilters));
    radioInputs.forEach(radio => radio.addEventListener('change', applyFilters));
    if (sortSelect) sortSelect.addEventListener('change', () => applySort(true));

    renderProductsPage(mutatedProducts, currentPage);
    initPagination(mutatedProducts);
});

