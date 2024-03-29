"use strict";

toggleMobileMenu();
closeMobile();
hideServices();
slickDoctorSection();
slickReviewsSection();

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

function hideServices() {
  if (screen.width <= 757) {
    const servicesWrapper = document.querySelector('.services__wrapper'),
          services = servicesWrapper.querySelectorAll('.services__service');

    for (let i = 0; i < services.length; i++) {
      if (i > 3) {
        services[i].classList.add('d-none');
        services[i].setAttribute('data-hidden', true);
      }
    }

    const hiddenServices = document.querySelectorAll('.services__service[data-hidden]');

    const showButton = document.createElement('button');
    showButton.classList.add('services__button', 'btn');
    showButton.id = 'show-button';
    showButton.innerText = 'Більше послуг';
    servicesWrapper.after(showButton);

    const hideButton = document.createElement('button');
    hideButton.classList.add('services__button', 'btn', 'd-none');
    hideButton.id = 'hide-button';
    hideButton.innerText = 'Менше послуг';
    servicesWrapper.after(hideButton);

    showButton.addEventListener('click', (e) => {
      hiddenServices.forEach(service => {
        service.classList.remove('d-none');
        e.target.classList.add('d-none');
        hideButton.classList.remove('d-none');
      })
    });

    hideButton.addEventListener('click', (e) => {
      hiddenServices.forEach(service => {
        service.classList.add('d-none');
        e.target.classList.add('d-none');
        showButton.classList.remove('d-none');
      })
    });
  }
}

function slickDoctorSection() {
  if (screen.width > 977) {
    $('.doctors__wrapper').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<button class="slider-arrow doctors__prev"><i class="icon-arrow-left"></i></button>',
      nextArrow: '<button class="slider-arrow doctors__next"><i class="icon-arrow-right"></i></button>',
      responsive: [
        {
          breakpoint: 977,
          settings: {
            slidesToShow: 3,
          }
        },
      ]
    });
  }
}

function slickReviewsSection() {
  if (screen.width > 977) {
    $('.reviews__wrapper').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<button class="slider-arrow reviews__prev"><i class="icon-arrow-left"></i></button>',
      nextArrow: '<button class="slider-arrow reviews__next"><i class="icon-arrow-right"></i></button>',
      responsive: [
        {
          breakpoint: 977,
          settings: {
            slidesToShow: 3,
          }
        },
      ]
    });
  }
}