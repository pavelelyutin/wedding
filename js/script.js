// Таймер до свадьбы
function timer() {
    let dateWedding = new Date('Sep 30 2023 16:00:00');
    let dateNow = new Date();
    let gapTime = dateWedding - dateNow;
    let days = Math.floor(gapTime / 1000 / 60 / 60 / 24);
    let hours = Math.floor(gapTime / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(gapTime / 1000 / 60) % 60;
    let seconds = Math.floor(gapTime / 1000) % 60;

    document.querySelector('.display__number--days').textContent = days;
    document.querySelector('.display__number--hours').textContent = hours;
    document.querySelector('.display__number--minutes').textContent = minutes;
    document.querySelector('.display__number--seconds').textContent = seconds;
}

setInterval(timer, 1000);

// Появлению фиксированного меню при скролле
window.addEventListener('scroll', function() {
    var scroll = window.scrollY;
    if (this.window.innerWidth > 767.98) {
        if (scroll >= 400) {
            document.querySelector('.header').classList.add('scrolled');
        } else {
            document.querySelector('.header').classList.remove('scrolled');
        }
    }
})

// Открытие и закрытие бургер меню
let burger = document.getElementById('burger');
let header = document.querySelector('.header');
let headerNav = document.querySelector('.header__nav');

burger.addEventListener('click', function() {
    burger.classList.toggle('burger-active');
    header.classList.toggle('header-active');
    headerNav.classList.toggle('nav-active');
    document.body.classList.toggle('stop-scroll');
})

// Скрытие меню при нажатии на пункт меню
headerNav.addEventListener('click', function(event) {
    if (event.target) {
        header.classList.remove('header-active');
        burger.classList.remove('burger-active');
        headerNav.classList.remove('nav-active');
        document.body.classList.remove('stop-scroll');
    }
})

// Карта
ymaps.ready(init);
function init() {
    var registrationMap = new ymaps.Map("registration-map", {
        center: [51.663146, 39.203025],
        zoom: 17,
    });

    var weddingMap = new ymaps.Map("wedding-map", {
        center: [51.669266, 39.222035],
        zoom: 17,
    });

    var registrationGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [51.663146, 39.203025],
        }
    });

    var weddingGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [51.669266, 39.222035],
        }
    });

    registrationMap.geoObjects.add(registrationGeoObject);
    weddingMap.geoObjects.add(weddingGeoObject);
    registrationMap.behaviors.disable('scrollZoom');
    weddingMap.behaviors.disable('scrollZoom');
}


async function submitForm(event) {
    event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
    try {
        // Формируем запрос
      const response = await fetch(event.target.action, {
          method: 'POST',
          body: new FormData(event.target)
      });
      // проверяем, что ответ есть
      if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
      // проверяем, что ответ действительно JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw ('Ошибка обработки. Ответ не JSON');
      }
      // обрабатываем запрос
      const json = await response.json();
      if (json.result === "success") {
          // в случае успеха
          alert(json.info);
      } else { 
          // в случае ошибки
          console.log(json);
          throw (json.info);
      }
    } catch (error) { // обработка ошибки
      alert(error);
    }
  }
