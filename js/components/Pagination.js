import { initTooltips } from "./Tooltips.js";

const pagination = (products) => {

  let productCont = 6
  let currentPage = 1

  const productContainer = document.querySelector('.catalog__list')
  const paginationList = document.querySelector('.catalog__pagination')

  const renderProducts = (products, container, productCont, currentPage) => {
    productContainer.innerHTML = '';

    const firstProductIndex = productCont * currentPage - productCont

    const lastProductIndex = firstProductIndex + productCont

    const productsOnPage = products.slice(firstProductIndex, lastProductIndex)

    productsOnPage.forEach(({ image, id, price }) => {
      const li = document.createElement('li')
      li.classList.add('catalog__item')

      li.innerHTML = `
                <div class="product-card">
                  <div class="product-card__visual">
                    <img class="product-card__img" src="images/${image}" height="436" width="290"
                      alt="Изображение товара">
                    <div class="product-card__more">
                      <a href="#" class="product-card__link btn btn--icon" data-id="${id}">
                        <span class="btn__text">В корзину</span>
                        <svg width="24" height="24" aria-hidden="true">
                          <use xlink:href="images/sprite.svg#icon-basket"></use>
                        </svg>
                      </a>
                      <a href="#" class="product-card__link btn btn--secondary">
                        <span class="btn__text">Подробнее</span>
                      </a>
                    </div>
                  </div>
                  <div class="product-card__info">
                    <h2 class="product-card__title">Потолочная люстра Ornella A4059PL-4AB (Artelamp)</h2>
                    <span class="product-card__old">
                      <span class="product-card__old-number">${price.old}</span>
                      <span class="product-card__old-add">₽</span>
                    </span>
                    <span class="product-card__price">
                      <span class="product-card__price-number">${price.new}</span>
                      <span class="product-card__price-add">₽</span>
                    </span>
                    <div class="product-card__tooltip tooltip">
                      <button class="tooltip__btn" aria-label="Показать подсказку">
                        <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                          <use xlink:href="images/sprite.svg#icon-i"></use>
                        </svg>
                      </button>
                      <div class="tooltip__content">
                        <span class="tooltip__text">Наличие товара по городам:</span>
                        <ul class="tooltip__list">
                          <li class="tooltip__item">
                            <span class="tooltip__text">Москва: <span class="tooltip__count">454</span></span>
                          </li>
                          <li class="tooltip__item">
                            <span class="tooltip__text">Оренбург: <span class="tooltip__count">381</span></span>
                          </li>
                          <li class="tooltip__item">
                            <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">15</span></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
    `
      productContainer.append(li)
    });
    initTooltips()
  }

  const renderPagination = (products, productCont) => {
    paginationList.innerHTML = '';
    //создание количества страниц
    const pageCount = Math.ceil(products.length / productCont) //20:6 и округляем

    for (let i = 1; i <= pageCount; i++) {
      const li = renderBtn(i)
      paginationList.append(li)
    }
  }

  const renderBtn = (page) => {
    const li = document.createElement('li')
    const btn = document.createElement('button')

    btn.classList.add('catalog__pagination-link')
    btn.classList.add('catalog__pagination-link')
    li.classList.add('catalog__pagination-item')

    btn.textContent = page
    li.append(btn)
    return li
  }

  const updatePagination = () => {
    paginationList.addEventListener('click', (event) => {
      if (!event.target.closest('.catalog__pagination-item')) {
        return
      } else {
        currentPage = event.target.textContent
        renderProducts(products, productContainer, productCont, currentPage);
      }
    })
  }

  renderProducts(products, productContainer, productCont, currentPage);
  renderPagination(products, productCont)
  updatePagination()
}

export {
  pagination
}