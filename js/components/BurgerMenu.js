
export function toggleBurgerMenu() {
    const headerCatalogBtn = document.querySelector('.header__catalog-btn')
    const mainMenuDiv = document.querySelector('.main-menu')
    const mainMenuCloseBtn = document.querySelector('.main-menu__close')

    headerCatalogBtn.addEventListener('click', (e) => {
        e.preventDefault()
        mainMenuDiv.classList.add('main-menu--active')
    })

    mainMenuCloseBtn.addEventListener('click', (e) => {
        e.preventDefault()
        mainMenuDiv.classList.remove('main-menu--active')
    })
    
    mainMenuDiv.addEventListener('click', (e) => {
        e.preventDefault()
        mainMenuDiv.classList.remove('main-menu--active')
    })
}
