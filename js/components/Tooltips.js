export function initTooltips() {
    const tooltipButtons = document.querySelectorAll('.tooltip__btn:not([data-tippy-initialized])');

    tooltipButtons.forEach(btn => {
        const tooltipContent = btn.parentElement.querySelector('.tooltip__content');
        if (tooltipContent) {
            tippy(btn, {
                content: tooltipContent.innerHTML,
                allowHTML: true,
                theme: 'light',
                placement: 'top',
                interactive: true,
                arrow: false,
            });
            btn.setAttribute('data-tippy-initialized', 'true');
        }
    });
}
