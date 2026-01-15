export function toggleAccordion() {
  const accordionBtns = document.querySelectorAll('.accordion__btn');

  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('accordion__btn--active');

      accordionBtns.forEach(b => b.classList.remove('accordion__btn--active'));

      if (!isActive) {
        btn.classList.add('accordion__btn--active');
      }
    });
  });
}

