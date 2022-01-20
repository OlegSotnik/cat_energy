// Модальное главное меню в мобильной версии

const navToggle = document.querySelector(".nav__toggle");
const navItemProductCatalog = document.querySelector(".nav__item--product-catalog");
const navItemProductsToOrder = document.querySelector(".nav__item--products-to-order");
const navItemBasketProducts = document.querySelector(".nav__item--basket-products");

navToggle.classList.remove("visually-hidden");
navItemProductCatalog.classList.add("nav__item--visually-hidden");
navItemProductsToOrder.classList.add("nav__item--visually-hidden");
navItemBasketProducts.classList.add("nav__item--visually-hidden");

navToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  navToggle.classList.toggle("nav__toggle--closed");
  navItemProductCatalog.classList.toggle("nav__item--visually-hidden");
  navItemProductsToOrder.classList.toggle("nav__item--visually-hidden");
  navItemBasketProducts.classList.toggle("nav__item--visually-hidden");
});

// Слайдер отзывов на главной.

let position = 0;
const sliderWindow = document.querySelector('.feedback__slider-window');
const track = document.querySelector('.feedback__slider-list');
const items = document.querySelectorAll('.feedback__slider-item');
const arrowLeft = document.querySelector('.slider-arrow__left');
const arrowRight = document.querySelector('.slider-arrow__right');
const leftLine = document.querySelector('.left__line');
const rightLine = document.querySelector('.right__line');
const itemsCount = items.length;
const itemWidth = sliderWindow.clientWidth;

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

arrowRight.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + itemWidth) / itemWidth;

  position -= itemsLeft >= 1 ? itemWidth : itemsLeft * itemWidth;

  setPosition();
  checkArrows();
});

arrowLeft.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;

  position += itemsLeft >= 1 ? itemWidth : itemsLeft * itemWidth;

  setPosition();
  checkArrows();
});

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`;
};

const checkArrows = () => {
  if (position === 0) {
    leftLine.classList.add('line--inactive');
  } else {
    leftLine.classList.remove('line--inactive');
  }

  if (position <= -(itemsCount - 1) * itemWidth) {
    rightLine.classList.add('line--inactive');
  } else {
    rightLine.classList.remove('line--inactive');
  }
};

checkArrows();

// Метка яндекс карты на главной.

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [53.224309, 50.193016],
          zoom: 16
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: '«Mishka» - магазин вязанных игрушек и товаров.'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: '../img/map-pin.svg',
          // Размеры метки.
          iconImageSize: [67, 100],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-34, -95]
      })

  myMap.geoObjects
      .add(myPlacemark);
});
