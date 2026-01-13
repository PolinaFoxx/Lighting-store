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


    const products = await getCardsServer();//получаем список товаров с сервера
    const container = document.querySelector('.catalog__list');

    toggleBasket();
    basketData(products);
    slider(products);
    initializationSlider();
    quantityGoods(products);

    let currentPage = 1;//текущая открытая страница 
    //mutatedProducts → это текущий список, который видит пользователь.
    let mutatedProducts = [...products]; //products → это исходные данные с сервера (все товары). Их мы никогда не трогаем, чтобы они всегда оставались "чистыми"

    //Рендер страницы (пагинация)
    const renderProductsPage = (prods, page) => {
        container.innerHTML = '';
        const productCont = 6;//кол-во  должно быть карточек на одной странице
        const firstProductIndex = productCont * (page - 1);//Вычисляем, с какого товара нужно начать показывать

        //Вырезаем из массива товаров (prods) только те, что нужны для текущей страницы.
        const productsOnPage = prods.slice(firstProductIndex, firstProductIndex + productCont);
        //Передаём массив товаров для текущей страницы в функцию отрисовки.
        renderCards(productsOnPage, container);
    };

    //Инициализация пагинации
    const initPagination = (prods) => { //принимает на вход массив товаров отфильтрованных и отсортированных
        pagination(prods, currentPage, (page) => {
            currentPage = page;//обновляем состояние текущей страницы
            renderProductsPage(prods, currentPage);// рендерим товары именно этой страницы
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

        //записываем в переменную mutatedProducts те товары которые прошли фильтр
        mutatedProducts = filterProducts(arrChecked, products, status);

        //После применения фильтра,сбрасываем страницу и показываем страницу(начиная с первой) с отфильрованными товарами 
        currentPage = 1;
        applySort(true); // сразу сортируем и рендерим
    }

    //Сортировка
    function applySort(reRender = true) {//Если reRender = true (по умолчанию)
        const typeSort = sortSelect ? sortSelect.value : '';
        //sortProducts, которая возвращает новый массив mutatedProducts, отсортированный по выбранному типу
        const sorted = sortProducts(mutatedProducts, typeSort);
        //Обновление текущего массива
        if (Array.isArray(sorted)) {//Проверка, что sortProducts вернул массив.
            //Обновляем mutatedProducts новым отсортированным массивом.
            mutatedProducts = sorted;
        }

        //При необходимости сбрасывает страницу на первую и рендерит товары с новой сортировкой вместе с обновлённой пагинацией.
        if (reRender) {
            currentPage = 1;//Сбрасывает текущую страницу на 1.

            renderProductsPage(mutatedProducts, currentPage);//рендерим первую страницу отсортированных товаров.

            initPagination(mutatedProducts);//пересоздаем пагинацию на основе отсортированного массива.
        }
    }

    //Слушатели
    checkboxInputs.forEach(checkbox => checkbox.addEventListener('change', applyFilters));
    radioInputs.forEach(radio => radio.addEventListener('change', applyFilters));
    if (sortSelect) sortSelect.addEventListener('change', () => applySort(true));

    renderProductsPage(mutatedProducts, currentPage);
    initPagination(mutatedProducts);
});

//Когда пользователь применяет фильтры (applyFilters), то сначала фильтруется mutatedProducts, а затем вызывается applySort(true).
//То есть сначала фильтруем → потом сортируем → рендерим