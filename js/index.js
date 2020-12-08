let game = new Game('canvas-game'); 
const startWindow = document.getElementById('start');
const canvasInit = document.getElementById('canvas-game');
const startButton = document.querySelector('#start button');
const gameOverWindow = document.getElementById('restart');
const continueButton = document.querySelector('#restart button');
const winWindow = document.getElementById('win');
const scoreButton = document.querySelector('#win button');
const reloadButton = document.querySelector('#win :nth-child(2)');
const scoreGame = document.querySelector('.score');
const scoreGameOver = document.querySelector('.scoreGameOver');
const scoreWin = document.querySelector('.scoreWin');
const nextWindow = document.getElementById('next');
const nextWindowButton = document.querySelector('#next button');
const nextScore = document.querySelector('#next p');

function start () {
  game.start()
  startWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
}

function gameOver () {
  game = new Game('canvas-game');
  game.level = 1;
  game.start();
  gameOverWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
}

function reload () {
  game.restart();
  winWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
}

function next () {
  game.nextLevel();
  game.start();
  nextWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
}


window.addEventListener('load', () => {
  
    startButton.addEventListener('click', start);
    continueButton.addEventListener('click', gameOver);
    reloadButton.addEventListener('click', reload);
    nextWindowButton.addEventListener('click', next);
    
    document.addEventListener('keydown', (event) => {
      game.onKeyEvent(event);
      
    });
    document.addEventListener('keyup', (event) => {
      game.onKeyEvent(event);
    })
    
});



