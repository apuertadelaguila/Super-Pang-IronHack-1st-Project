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
            new Ball(this.ctx, 300, 100, 1, 'blue', -2, 4),
            /* new Ball(this.ctx, 500, 100, 1, 'green', 2, 4) */
        ];
        this.structures = [
            new Structure(this.ctx, 300, 300),
            new Structure(this.ctx, 600, 300)
        ]

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
        this.sound.pause();
        this.stageClearSound.play();
        setTimeout(() => this.stop(), 20)
        
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
        this.balls.forEach(ball => ball.drawSmoke())
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
                    
                    ball.destroy = true;
                    this.explosionSound.play();
                   
                    this.balls = this.balls.filter(ball => !ball.destroy);
                    
                   
                    if (ball.size <= 3) {
                        this.balls = this.balls.concat(ball.split())
                    }
                    this.pang.clearSpears()
                    console.log(this.balls)
                }
            })
            this.structures.forEach(structure => {
            
                if (structure.collides(ball)) {
                    ball.bounce(structure);
                }
         })
            if (this.balls.length === 0) {
                this.pang.winAnimation();
                this.end();
            }     
        })    
    }
}