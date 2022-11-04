//массив карточек
let currentArray = [];
let brandCards = [
  {
    name: "lenovo",
    link: "#",
    image: "../css/img-slider-of-brands/Lenovo.png",
    imageWidth: "108px",
    imageHeight: "32px",
    alt: "Логотип Леново",
  },
  {
    name: "samsung",
    link: "#",
    image: "../css/img-slider-of-brands/Samsung.png",
    imageWidth: "116px",
    imageHeight: "38.5px",
    alt: "Логотип Самсунг",
  },
  {
    name: "apple",
    link: "#",
    image: "../css/img-slider-of-brands/Apple.png",
    imageWidth: "44px",
    imageHeight: "44px",
    alt: "Логотип Эппл",
  },
  {
    name: "view-sonic",
    link: "#",
    image: "../css/img-slider-of-brands/ViewSonic.png",
    imageWidth: "128px",
    imageHeight: "21px",
    alt: "Логотип Вью Соник",
  },
  {
    name: "bosch",
    link: "#",
    image: "../css/img-slider-of-brands/Bosch.png",
    imageWidth: "128px",
    imageHeight: "28.6px",
    alt: "Логотип Бош",
  },
  {
    name: "hp",
    link: "#",
    image: "../css/img-slider-of-brands/HP.png",
    imageWidth: "52px",
    imageHeight: "52px",
    alt: "Логотип Эйч Пи",
  },
  {
    name: "acer",
    link: "#",
    image: "../css/img-slider-of-brands/Acer.png",
    imageWidth: "94px",
    imageHeight: "24px",
    alt: "Логотип Эйсер",
  },
  {
    name: "sony",
    link: "#",
    image: "../css/img-slider-of-brands/Sony.png",
    imageWidth: "128px",
    imageHeight: "26.6px",
    alt: "Логотип Сони",
  },
];

//был ли клик на кнопку "показать все"? вешаю событие на клик, добавляю/удаляю класс hide__button
let showAllButton = document.querySelector(".show-all");
showAllButton.addEventListener("click", function () {
  showAllButton.classList.toggle("hide");
  changeSizeScreenBig(hideButtonCheck(), media1120px.matches);
  changeSizeScreenMedium(hideButtonCheck(), media767px.matches);
});
//напишу функцию, которая чекает наличие класса hide__button
function hideButtonCheck() {
  return document.querySelector(".hide")
    ? ((document.querySelector(".hide").innerText = "Скрыть"), true)
    : ((document.querySelector(".show-all").innerText = "Показать все"), false);
}
//меняю массив в зависимости от экрана
let media1120px = window.matchMedia("(min-width: 1120px)");
let media767px = window.matchMedia(
  "(min-width: 767px) and (max-width: 1119px)"
);
let media240px = window.matchMedia("(min-width: 240px) and (max-width: 767px)");

function changeSizeScreenBig(hideButtonCheck, media1120px) {
  //размер экрана >= 1120px и нажата кнопка "показать все"? нужно массив увеличить, шоб как в макете три первых карточки повторились
  if (hideButtonCheck && media1120px) {
    currentArray = brandCards.concat(brandCards.slice(0, 3));
    generationCards();
  } else if (!hideButtonCheck && media1120px) {
    currentArray = brandCards.slice(0, 8);
    generationCards();
  }
}
function changeSizeScreenMedium(hideButtonCheck, media767px) {
  if (media767px && !hideButtonCheck) {
    currentArray = brandCards.slice(0, 6);
    generationCards();
  } else if (media767px && hideButtonCheck) {
    currentArray = brandCards.slice(0, 8);
    generationCards();
  }
}

//тут свайпер
new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1.4,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});

//ищу див, в который вставлю карточки
let brandsDiv = document.querySelector(".brands");
let swiperWrapper = document.querySelector(".swiper-wrapper");
//функция генерации карточек для мобилок
let brandCard = "";
function generationCardsforMobile() {
  brandCards.forEach((card) => {
    return (brandCard += `<div class="swiper-slide cards-slider"><a href=${card.link} class="section">
 <img src=${card.image} alt=${card.alt} width=${card.imageWidth} height=${card.imageHeight}>
 <div class="section__button button"><div class="pointer"></div></div></a></div>`);
  });
  swiperWrapper.innerHTML = brandCard;
}

//функция для генерации карточки
function generationCards() {
  brandCard = "";
  currentArray.forEach((card) => {
    return (brandCard += `<a href=${card.link} class="section">
 <img src=${card.image} alt=${card.alt} width=${card.imageWidth} height=${card.imageHeight}>
 <div class="section__button button"><div class="pointer"></div></div></a>`);
  });
  //вставляю карточку в див
  brandsDiv.innerHTML = brandCard;
}
if (media767px.matches) {
  changeSizeScreenMedium(hideButtonCheck(), media767px.matches);
} else if (media1120px.matches) {
  changeSizeScreenBig(hideButtonCheck(), media1120px.matches);
} else if (media240px.matches) {
  generationCardsforMobile();
}
