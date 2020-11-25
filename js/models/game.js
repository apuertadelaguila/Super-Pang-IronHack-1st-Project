class Game {
    constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 989;
    this.canvas.height = 537;
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 1000 / 60;


    this.background = new Background(this.ctx);
    this.pang = new Pang(this.ctx, (this.canvas.width / 2), 450);
    this.balls = [
        new Ball(this.ctx, 100, 100, 'red', 2, 4),
        new Ball(this.ctx, 300, 100, 'blue', -2, 4),
        new Ball(this.ctx, 500, 100, 'green', 2, 4)
    ];
    }

    onKeyEvent (event) {
        this.pang.onKeyEvent(event);
    }


    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
              this.clear();
              this.move();
              this.draw();
            }, this.fps)
          }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    end() {

    }

    move() {
        this.pang.move();
        this.balls.forEach(ball => ball.move())
    }


    draw() {
        this.background.draw();
        this.pang.draw();
        this.balls.forEach(ball => ball.draw())
    }

    checkCollisions() {

    }

    addBalls() {

    }

}