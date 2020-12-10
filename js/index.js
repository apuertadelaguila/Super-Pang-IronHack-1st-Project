let game = new Game('canvas-game'); 
const startWindow = document.getElementById('start');
const canvasInit = document.getElementById('canvas-game');
const startButton = document.querySelector('#start button');
const gameOverWindow = document.getElementById('restart');
const continueButton = document.querySelector('#restart button');
const winWindow = document.getElementById('win');
const reloadButton = document.querySelector('#win button');
const scoreGame = document.querySelector('.score');
const chrono = document.querySelector('.chrono');
const scoreGameOver = document.querySelector('.scoreGameOver');
const scoreWin = document.querySelector('.scoreWin');
const nextWindow = document.getElementById('next');
const nextWindowButton = document.querySelector('#next button');
const nextScore = document.querySelector('#next p');
const scoreAfterGame = document.querySelector('#high-scores p');
const highScores = document.getElementById('high-scores');
const homeGameOver = document.querySelector('#restart :nth-child(3)');
const saveButton = document.querySelector('#high-scores :nth-child(3)');
const nameInput = document.querySelector('#high-scores input');
const topScores = document.getElementById('ranking');
const rankingList = document.querySelector('#ranking ul');
const bestScoresButton = document.querySelector('#start :nth-child(2)');
const rankingHomeButton = document.querySelector('#ranking button');
const top10List = document.querySelector('.top10-list');
let secDec = document.getElementById('secDec');
let secUni = document.getElementById('secUni');
const top10 = JSON.parse(localStorage.getItem("top10")) || [];

function start () {
  game.start()
  game.chrono.startClick(printTime);
  game.sound.play();
  startWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
  chrono.style.display = "flex";
  game.chrono.reset();
}

function gameOver () {
  game = new Game('canvas-game');
  game.level = 1;
  game.start();
  game.chrono.startClick(printTime);
  game.sound.play();
  gameOverWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
  chrono.style.display = "flex";
  game.chrono.reset();
}

function next () {
  game.nextLevel(); 
  game.start();
  game.chrono.startClick(printTime);
  game.sound2.play();
  nextWindow.style.display = "none";
  canvasInit.style.display = "flex";
  scoreGame.style.display = "flex";
  chrono.style.display = "flex";
  game.chrono.reset();
}

function home () {
  game = new Game('canvas-game');
  highScores.style.display = "none";
  gameOverWindow.style.display = "none";
  startWindow.style.display = "flex";
  topScores.style.display = "none";
  winWindow.style.display = "none";
  game.chrono.reset();
}

function displayRanking () {
  top10List.innerHTML = top10
  .map(score => {
    return `<li class="rankingList">${score.name} / <span>Score: ${score.score}</span></li>`;
  })
  .join("");
}


window.addEventListener('load', () => {
  
    startButton.addEventListener('click', start);
    bestScoresButton.addEventListener('click', game.showScores);
    rankingHomeButton.addEventListener('click', home);
    continueButton.addEventListener('click', gameOver);
    reloadButton.addEventListener('click', home);
    nextWindowButton.addEventListener('click', next);
    homeGameOver.addEventListener('click', home);
    saveButton.addEventListener('click', game.addTop10);
    
    
    document.addEventListener('keydown', (event) => {
      game.onKeyEvent(event);
      
    });
    document.addEventListener('keyup', (event) => {
      game.onKeyEvent(event);
    })
    
});



