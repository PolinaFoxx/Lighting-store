export function initTooltips() {
    //1 Сначала находимм кнопку с тултипом
    //ищем кнопка на которых еще нет атрибута (:not([data-tippy-initialized])
    const tooltipButtons = document.querySelectorAll('.tooltip__btn:not([data-tippy-initialized])');//вернул массив

    //проходим по массиву
    tooltipButtons.forEach(btn => {
        //2 Через кнопку находим контент тултипа-тултип
        const tooltipContent = btn.parentElement.querySelector('.tooltip__content');
        if (tooltipContent) {//если нашли,то применяем настройки
            tippy(btn, {
                content: tooltipContent.innerHTML,
                allowHTML: true,
                theme: 'light',
                placement: 'top',
                interactive: true,
                arrow: false,
            });
            btn.setAttribute('data-tippy-initialized', 'true'); // 3 помечаем кнопку с тултипом
        }
    });
}
