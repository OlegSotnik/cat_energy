// Модальное главное меню

const headerToggle = document.querySelector(".header__toggle");
const headerNavList = document.querySelector(".header__nav-list");

headerToggle.classList.remove("visually-hidden");
headerNavList.classList.add("header__nav-list--closed");

headerToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  headerToggle.classList.toggle("header__toggle--closed");
  headerNavList.classList.toggle("header__nav-list--closed");
});

document.addEventListener( 'click', (e) => {
	const withinBoundariesList = e.composedPath().includes(headerNavList);
  const withinBoundariesToggle = e.composedPath().includes(headerToggle);

	if ( ! withinBoundariesList && ! withinBoundariesToggle  ) {
    headerNavList.classList.add("header__nav-list--closed");
    headerToggle.classList.remove("header__toggle--closed");
	}
})

// Слайдер "Было - стало"

const sliderAfter = document.querySelector('.slider__after');
const sliderBefore = document.querySelector('.slider__before');
const sliderRange = document.querySelector('.slider__range');
const sliderAfterImage = document.querySelector('.slider__after-image');

sliderRange.addEventListener("input", function () {
  let x = this.value;
  sliderBefore.style.width = x + '%';
  sliderAfter.style.width = (100-x) + '%';
  sliderAfter.style.left = x + '%';

  if (document.documentElement.clientWidth < 768) {
    sliderAfterImage.style.left = -280 / 100 * x + 10 + 'px';
  } else {
    sliderAfterImage.style.left = -560 / 100 * x + 20 + 'px';
  }

});

// Слайдер товаров на главной.

let position = 0;
const sliderWindow = document.querySelector('.products__slider-window');
const track = document.querySelector('.products__slider-list');
const items = document.querySelectorAll('.products__slider-item');
const arrowLeft = document.querySelector('.slider-arrow__box--left');
const arrowRight = document.querySelector('.slider-arrow__box--right');
const leftLine = document.querySelector('.slider-arrow--left');
const rightLine = document.querySelector('.slider-arrow--right');
const itemsCount = items.length;
const itemWidth = sliderWindow.clientWidth;

if (document.documentElement.clientWidth < 1024) {

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
      arrowLeft.classList.add('slider-arrow__left--inactive');
    } else {
      leftLine.classList.remove('line--inactive');
      arrowLeft.classList.remove('slider-arrow__left--inactive');
    }

    if (position <= -(itemsCount - 1) * itemWidth) {
      rightLine.classList.add('line--inactive');
      arrowRight.classList.add('slider-arrow__right--inactive');
    } else {
      rightLine.classList.remove('line--inactive');
      arrowRight.classList.remove('slider-arrow__right--inactive');
    }
  };

  checkArrows();

}

// Метка яндекс карты на главной.

// ymaps.ready(function () {
//   var myMap = new ymaps.Map('map', {
//           center: [53.224309, 50.193016],
//           zoom: 16
//       }, {
//           searchControlProvider: 'yandex#search'
//       }),

//       // Создаём макет содержимого.
//       MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//           '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//       ),

//       myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
//           hintContent: 'Собственный значок метки',
//           balloonContent: '«Mishka» - магазин вязанных игрушек и товаров.'
//       }, {
//           // Опции.
//           // Необходимо указать данный тип макета.
//           iconLayout: 'default#image',
//           // Своё изображение иконки метки.
//           iconImageHref: '../img/map-pin.svg',
//           // Размеры метки.
//           iconImageSize: [67, 100],
//           // Смещение левого верхнего угла иконки относительно
//           // её "ножки" (точки привязки).
//           iconImageOffset: [-34, -95]
//       })

//   myMap.geoObjects
//       .add(myPlacemark);
// });
