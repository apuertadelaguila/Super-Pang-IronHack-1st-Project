const games = [];
const game = games.push(new Game('canvas-game')) 
const startWindow = document.querySelector('.start');
const canvasInit = document.getElementById('canvas-game');
const startButton = document.querySelector('.start button');
const gameOverWindow = document.querySelector('.restart');
const continueButton = document.querySelector('.restart button');
const winWindow = document.querySelector('.win');
const scoreButton = document.querySelector('.win button');
const reloadButton = document.querySelector('.win :nth-child(2)');
const scoreGame = document.querySelector('.score');
const scoreGameOver = document.querySelector('.scoreGameOver');

function restart () {
  games.push(new Game('canvas-game'));
}
function start () {
  games.forEach(game => game.start());
  startWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
}
function gameOver () {
  games.pop();
  restart()
  games.forEach(game => game.start());
  gameOverWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
}

function reload () {
  games.pop();
  restart();
  games.forEach(game => game.start());
  winWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
}


window.addEventListener('load', () => {
  
    startButton.addEventListener('click', start);
    continueButton.addEventListener('click', gameOver);
    reloadButton.addEventListener('click', reload);
    
    document.addEventListener('keydown', (event) => {
      games.forEach(game => game.onKeyEvent(event));
      
    });
    document.addEventListener('keyup', (event) => {
      games.forEach(game => game.onKeyEvent(event));
    })
    
});



