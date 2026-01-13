export function selectCityMenu() {
    const locationCityBtn = document.querySelector('.location__city')
    const locationCitySpan = document.querySelector('.location__city-name')
    const locationCityLinks = document.querySelectorAll('.location__sublink')

    const locationList = document.querySelector('.location__sublist')



    //Открываем и закрываем список
    locationCityBtn.addEventListener('click', (e) => {
        e.preventDefault()
        locationCityBtn.classList.toggle('location__city--active')
    })

    // Навешиваем обработчик на каждую кнопку
    locationCityLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Меняем название города
            locationCitySpan.textContent = link.textContent

            // Закрываем меню
            locationCityBtn.classList.remove('location__city--active')
        })
    })

    
    document.addEventListener('click', (e) => {
          // Проверяем, был ли клик внутри кнопки выбора города или внутри списка
    const isClickInCityBtn = locationCityBtn.contains(e.target);
    const isClickInCityList = locationList.contains(e.target);
    if (!isClickInCityBtn && !isClickInCityList) {
        locationCityBtn.classList.remove('location__city--active');
    }
    })

}