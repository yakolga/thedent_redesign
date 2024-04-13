document.addEventListener('DOMContentLoaded', () => {
  toggleMobileMenu();
  closeMobile();
  buildPricesSection();
  showClickedPriceSection();
  dropdownActions();
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

function buildPricesSection() {
  const priceSection = document.createElement('section');
  priceSection.classList.add('price');

  const priceContainer = document.createElement('div');
  priceContainer.classList.add('price__container', 'container');

  const priceInner = document.createElement('div');
  priceInner.classList.add('price__inner');

  const headingSection = document.querySelector('.heading');

  headingSection.after(priceSection);
  priceSection.append(priceContainer);
  priceContainer.append(priceInner);

  prices.categories.forEach(category => {
    const pricesCategory = document.createElement('div');
    pricesCategory.classList.add('price__category');

    pricesCategory.innerHTML = `
      <h2 class="price__subheading">${category.name}</h2>
    `;

    priceInner.append(pricesCategory);

    const servicesWrapper = document.createElement('div');
    servicesWrapper.classList.add('price__services');
    pricesCategory.append(servicesWrapper);

    category.services.forEach(service => {
      const priceService = document.createElement('div');
      priceService.classList.add('price__service');

      priceService.innerHTML = `
        <div class="price__name">${service.name}</div>
        <div class="price__price">${service.price}</div>
      `;

      servicesWrapper.append(priceService);
    });
  });
}

function showClickedPriceSection() {
  const priceCategories = document.querySelectorAll('.price__category');

  priceCategories.forEach((category, i) => {
    if (i > 0) {
      category.classList.add('d-none');
    }
  });
}

function dropdownActions() {
  if (typeof prices === undefined) return false
  const dropdown = document.querySelector('.heading__dropdown'),
        options = dropdown.querySelector('.heading__options'),
        currentCategory = dropdown.querySelector('.heading__active'),
        priceCategory = document.querySelectorAll('.price__category'),
        option = dropdown.querySelectorAll('.heading__option');

  dropdown.addEventListener('click', (e) => {
    dropdown.classList.toggle('--open');
    if (e.target.classList.contains('heading__options') || e.target.classList.contains('heading__option')) {
      currentCategory.innerText = e.target.textContent;
      option.forEach(el => {
        el.classList.remove('--current');
      });
      e.target.classList.add('--current');

      priceCategory.forEach((category, i) => {
        const name = category.querySelector('.price__subheading').textContent;
        if (name == e.target.textContent) {
          priceCategory.forEach(cat => {
            cat.classList.add('d-none');
          })
          category.classList.remove('d-none');
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (dropdown.classList.contains('--open') && !e.target.classList.contains('.heading__dropdown') && !e.target.closest('.heading__dropdown')) {
      dropdown.classList.remove('--open');
    }
  })
}