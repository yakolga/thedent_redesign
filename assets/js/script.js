"use strict";

document.addEventListener('DOMContentLoaded', () => {
  toggleMobileMenu();
  closeMobile();
  hideServices();
  slickDoctorSection();
  slickReviewsSection();
  gallerySlider();
  scrollHeader();
  replaceForm();
  validateForms('#consultation-form');
});

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

    const hiddenServices = document.querySelectorAll('.services__service[data-hidden]'),
          html = document.querySelector('html');

    const showButton = document.createElement('button');
    showButton.classList.add('services__button', 'btn');
    showButton.id = 'show-button';

    if (html.getAttribute('lang')  == 'en') {
      showButton.innerText = 'More services';
    } else {
      showButton.innerText = 'Більше послуг';
    }
    servicesWrapper.after(showButton);

    const hideButton = document.createElement('button');
    hideButton.classList.add('services__button', 'btn', 'd-none');
    hideButton.id = 'hide-button';

    if (html.getAttribute('lang')  == 'en') {
      hideButton.innerText = 'Fewer services';
    } else {
      hideButton.innerText = 'Менше послуг';
    }

    console.log(html);
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

function gallerySlider() {
  $('.gallery__main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="slider-arrow gallery__prev"><i class="icon-arrow-left"></i></button>',
    nextArrow: '<button class="slider-arrow gallery__next"><i class="icon-arrow-right"></i></button>',
    fade: true,
    asNavFor: '.gallery__nav',
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $('.gallery__nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.gallery__main',
    arrows: false,
    focusOnSelect: true,
  });
}

function scrollHeader() {
  const header = document.querySelector('.header');

  document.addEventListener('scroll', (e) => {
    if (document.documentElement.scrollTop > header.offsetHeight) {
      header.classList.add('--fixed');
    } else {
      header.classList.remove('--fixed');
    }
  });
}

function replaceForm() {
  if (screen.width < 757) {
    const form = document.querySelector('.consultation__form'),
        descr = document.querySelector('.consultation__descr');

    descr.after(form);
  }
}

function validateForms(form) {
  $(form).validate({
  rules: {
    name: {
      required: true,
      minlength: 2
    },
    phone: "required",
    surname: {
      required: true,
      minlength: 2
    },
    email: {
        required: true,
        email: true
    },
    privacypolicy: "required"
  },
  messages: {
    name: "Будь-ласка, введіть своє ім'я",
    surname: "Будь-ласка, введіть своє прізвище",
    phone: "Будь-ласка, введіть свій номер телефону",
    email: "Будь-ласка, введіть свій адрес E-mail",
    privacypolicy: "Будь-ласка, заповніть всі обов'язкові поля"
  }
});
};

$('input[name=phone]').mask("+380 (99) 999-99-99");

$('form').submit(function(e) {
  e.preventDefault();

  if (!$(this).valid()) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('.consultation__success').fadeIn('slow');
    $('form').trigger('reset')
  });
  return false;
});