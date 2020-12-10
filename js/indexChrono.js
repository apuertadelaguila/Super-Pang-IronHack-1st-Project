
/* let secDec = document.getElementById('secDec');
let secUni = document.getElementById('secUni'); */


function printTime() {
    printSeconds();
}

function printSeconds() {
    const seconds = game.chrono.twoDigitsNumber(game.chrono.getSeconds());
    secDec.innerText = seconds[0];
    secUni.innerText = seconds[1];
}
