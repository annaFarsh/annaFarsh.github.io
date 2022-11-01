//массив карточек
let currentArray = [];
let brandCards = [
  {
    name: "lenovo",
    link: "#",
  },
  {
    name: "samsung",
    link: "#",
  },
  {
    name: "apple",
    link: "#",
  },
  {
    name: "view-sonic",
    link: "#",
  },
  {
    name: "bosch",
    link: "#",
  },
  {
    name: "hp",
    link: "#",
  },
  {
    name: "acer",
    link: "#",
  },
  {
    name: "sony",
    link: "#",
  },
];
//функция, чтоб элементы проще делать
let makeElement = function (tagName, className, text) {
  let element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

//был ли клик на кнопку "показать все"? вешаю событие на клик, добавляю/удаляю класс hide__button
let showAllButton = document.querySelector(".show-all__button");
showAllButton.addEventListener("click", function () {
  showAllButton.classList.toggle("hide__button");
  changeSizeScreenBig(hideButtonCheck(), media1120px.matches);
  changeSizeScreenMedium(hideButtonCheck(), media767px.matches);
});
//напишу функцию, которая чекает наличие класса hide__button
function hideButtonCheck() {
  return document.querySelector(".hide__button")
    ? ((document.querySelector(".hide__button").innerText = "Скрыть"), true)
    : ((document.querySelector(".show-all__button").innerText = "Показать все"),
      false);
};
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
    console.log(currentArray);
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

//функция генерации карточек для мобилок
let brandCard = "";
function generationCardsforMobile() {
  let swiperWrapper = document.querySelector(".swiper-wrapper");

  brandCards.forEach((card) => {
    return (brandCard += `<div class="swiper-slide cards-slider"><section class="section">
 <div class="section__${card.name} ${card.name}--logo"></div>
 <a href="${card.link}" class="section__button button"></a>
</section></div>`);
  });
  swiperWrapper.innerHTML = brandCard;
}

//функция для генерации карточки
function generationCards() {
  brandCard = "";
  currentArray.forEach((card) => {
    return (brandCard += `<section class="section">
    <div class="section__${card.name} ${card.name}--logo"></div>
    <a href="${card.link}" class="section__button button"></a>
  </section>`);
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
