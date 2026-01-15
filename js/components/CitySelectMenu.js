export function selectCityMenu() {
    const locationCityBtn = document.querySelector('.location__city')
    const locationCitySpan = document.querySelector('.location__city-name')
    const locationCityLinks = document.querySelectorAll('.location__sublink')

    const locationList = document.querySelector('.location__sublist')
    locationCityBtn.addEventListener('click', (e) => {
        e.preventDefault()
        locationCityBtn.classList.toggle('location__city--active')
    })

    locationCityLinks.forEach(link => {
        link.addEventListener('click', () => {
            locationCitySpan.textContent = link.textContent

            locationCityBtn.classList.remove('location__city--active')
        })
    })


    document.addEventListener('click', (e) => {
        const isClickInCityBtn = locationCityBtn.contains(e.target);
        const isClickInCityList = locationList.contains(e.target);
        if (!isClickInCityBtn && !isClickInCityList) {
            locationCityBtn.classList.remove('location__city--active');
        }
    })

}