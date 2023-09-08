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