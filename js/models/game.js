class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 989;
        this.canvas.height = 537;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;
        this.sound = new Audio('sounds/02 Stage 1.mp3');
        this.gameOverSound = new Audio('sounds/24 Game Over.mp3');
        this.stageClearSound = new Audio('sounds/07 Stage Clear.mp3')
        this.explosionSound = new Audio('sounds/explosion.mp3')
        


        this.background = new Background(this.ctx);
        this.pang = new Pang(this.ctx, (this.canvas.width / 2), 450);
        this.balls = [
            new Ball(this.ctx, 100, 100, 1, 'red', 2, 4),
           /*  new Ball(this.ctx, 300, 100, 1, 'blue', -2, 4), */
            /* new Ball(this.ctx, 500, 100, 1, 'green', 2, 4) */
            new Ball(this.ctx, 100, 50, 4, 'red', 2, 4),
            new Ball(this.ctx, 200, 50, 4, 'red', 2, 4),
            new Ball(this.ctx, 300, 50, 4, 'red', 2, 4),
            new Ball(this.ctx, 400, 50, 4, 'red', 2, 4),
            new Ball(this.ctx, 500, 50, 4, 'red', 2, 4),
        ];
        this.structures = [
            new Structure(this.ctx, 300, 300),
            new Structure(this.ctx, 600, 300),
            new Structure(this.ctx, 20, 80),
            new Structure(this.ctx, 100, 80),
            new Structure(this.ctx, 180, 80),
            new Structure(this.ctx, 260, 80),
            new Structure(this.ctx, 340, 80),
            new Structure(this.ctx, 420, 80),
            new Structure(this.ctx, 500, 80),
            new Structure(this.ctx, 580, 80),
            new Structure(this.ctx, 660, 80),
            new Structure(this.ctx, 740, 80),
            new Structure(this.ctx, 820, 80),
            new Structure(this.ctx, 900, 80),
            
            

        ]

        this.smokes = [];

        this.ballCollision = false;

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
              this.end();
              this.sound.play();
            }, this.fps)       
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        this.sound.pause();
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    loose() {
        this.pang.collidesAnimation()
        setTimeout(() => this.stop(), 40)  
    }

    end() {
        if (this.balls.length === 0 && !this.ballCollision) {
            this.pang.winAnimation();
            this.sound.pause();
            this.stageClearSound.play();
            setTimeout(() => this.stop(), 20)
        }       
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
        this.structures.forEach(structure => structure.draw())
        this.smokes.forEach(smoke => smoke.draw())
    }



    checkCollisions() {
        this.balls.forEach(ball => {
            if (this.pang.collides(ball)) {
                this.loose();
                this.gameOverSound.play();    
            }
        })

        this.balls.forEach(ball => {
            this.pang.spears.forEach(spear => {
                if(spear.collides(ball)) {
                    this.ballCollision = true;
                    ball.destroy = true;
                    this.explosionSound.play();
                    this.smokes.push(new Smoke(this.ctx, (ball.x + ball.width / 2) - 50, (ball.y + ball.height / 2) - 50))
                    setTimeout(() => {
                        this.smokes.pop(smoke => smoke)
                    }, 500)
                    
                    this.balls = this.balls.filter(ball => !ball.destroy);
                   
                    if (ball.size <= 3) {
                        setTimeout(() => {
                            this.ballCollision = false;
                            this.balls = this.balls.concat(ball.split())
                        },300)
                    } else {
                        this.ballCollision = false;
                    }
                    this.pang.clearSpears();
                    
                }
            })
            this.structures.forEach(structure => {
                
                if (structure.collides(ball)) {
                    ball.bounce(structure);
                }
         })      
        })
        this.structures.forEach(structure => {
            this.pang.spears.forEach(spear => {
                if (spear.collides(structure)) {
                    structure.destroy = true;
                    setTimeout(() => this.structures = this.structures.filter(structure => !structure.destroy), 400)
                    
                    this.pang.clearSpears();
                    console.log(structure)
                    console.log(spear.destroy)
                }
            })
            
        })   
        
    }
}