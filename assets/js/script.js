"use strict";

toggleMobileMenu();
closeMobile();

function toggleMobileMenu() {
  const buttonToggle = document.querySelector('.header__burger'),
        mobileMenu = document.querySelector('.header__navigation');

  buttonToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('--active');
  });
}

function closeMobile() {
  const buttonClose = document.querySelector('.header__close'),
        mobileMenu = document.querySelector('.header__navigation');

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('--active') && !e.target.closest('.header')) {
      mobileMenu.classList.remove('--active');
    }
  })

  buttonClose.addEventListener('click', () => {
    mobileMenu.classList.remove('--active');
  });
}
