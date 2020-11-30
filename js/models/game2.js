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
            new Ball(this.ctx, 100, 100, '1', 'red', 2, 4),
            new Ball(this.ctx, 300, 100, '1', 'blue', -2, 4),
            /* new Ball(this.ctx, 500, 100, '1', 'green', 2, 4) */
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
              this.checkCollisions()
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
        alert('YOU WON!!!')
    }

    move() {
        this.pang.move();
        this.balls.forEach(ball => ball.move())
    }


    draw() {
        this.background.draw();
        this.balls.forEach(ball => ball.draw());
        this.pang.spears.forEach(spear => spear.draw())
        this.pang.draw();
    }

    checkCollisions() {
        this.balls.forEach(ball => {
            if (this.pang.collides(ball)) {
                this.stop()
            }
        })

        this.balls.forEach(ball => {
            this.pang.spears.forEach(spear => {
                if(spear.collides(ball)) {
                    ball.destroy = true;
                    this.balls = this.balls.filter(ball => !ball.destroy)
                    if (ball.size === '1' && ball.color === 'red') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '2', 'red', 3, -2))
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '2', 'red', -3, -2))  
                    } else if (ball.size === '2' && ball.color === 'red') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '3', 'red', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '3', 'red', -3, -2));
                    } else if (ball.size === '3' && ball.color === 'red') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '4', 'red', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '4', 'red', -3, -2));
                    } else if(ball.size === '1' && ball.color === 'blue') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '2', 'blue', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '2', 'blue', -3, -2));
                    } else if (ball.size === '2' && ball.color === 'blue') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '3', 'blue', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '3', 'blue', -3, -2));
                    } else if (ball.size === '3' && ball.color === 'blue') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '4', 'blue', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '4', 'blue', -3, -2));
                    } else if(ball.size === '1' && ball.color === 'green') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '2', 'green', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '2', 'green', -3, -2));
                    } else if (ball.size === '2' && ball.color === 'green') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '3', 'green', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '3', 'green', -3, -2));
                    } else if (ball.size === '3' && ball.color === 'green') {
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 + 10)), ball.y, '4', 'green', 3, -2));
                        this.balls.push(new Ball(this.ctx, ball.x + ((ball.width / 2 - 10)), ball.y, '4', 'green', -3, -2));
                    } else if (ball.size === '4') {;
                        if (this.balls.length === 0) {
                            this.end(); 
                        } 
                    }
                    this.pang.spears = this.spear.filter(spear => !spear.destroy) 
                }  
            })
            
        })
    }


}