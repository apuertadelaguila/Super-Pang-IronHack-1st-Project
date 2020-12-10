function printTime() {
    printSeconds();
}

function printSeconds() {
    const seconds = game.chrono.twoDigitsNumber(game.chrono.getSeconds());
    secDec.innerText = seconds[0];
    secUni.innerText = seconds[1];
}
