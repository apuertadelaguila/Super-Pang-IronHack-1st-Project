class Ball {
    constructor(ctx, x, y, size, color, vx, vy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.ay = 0.1;
        this.destroy = false;
        this.canBounce = true;
        

        this.ballSprite = new Image();
        this.ballSprite.src = `img/sprites/balls/${size}${color}ball.png`;
        this.ballSprite.horizontalFrameIndex = 0;
        this.ballSprite.verticalFrameIndex = 0;
        this.ballSprite.horizontalFrames = 1;
        this.ballSprite.verticalFrames = 1;
        this.ballSprite.isReady = false;
        this.ballSprite.onload = () => {
            this.ballSprite.isReady = true;
            this.ballSprite.frameWidth = Math.floor(this.ballSprite.width / this.ballSprite.horizontalFrames);
            this.ballSprite.frameHeight = Math.floor(this.ballSprite.height / this.ballSprite.verticalFrames);
            this.width = this.ballSprite.frameWidth;
            this.height = this.ballSprite.frameHeight;
        }

        
    }

    draw() {
        if (this.ballSprite.isReady) {
            this.ctx.drawImage(
                this.ballSprite,
                this.ballSprite.frameWidth * this.ballSprite.horizontalFrameIndex,
                this.ballSprite.frameHeight * this.ballSprite.verticalFrameIndex,
                this.ballSprite.frameWidth,
                this.ballSprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );

           /*  this.ctx.strokeRect(this.x, this.y, this.ballSprite.width, this.ballSprite.height)  */   
        }
        
        this.drawCount++;
    }

    

    move() {
        this.vy += this.ay
        this.x += this.vx;
        this.y += this.vy;
        

        if(this.x + this.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
            this.vx *= -1;
            
        }
        if(this.x <= 0) {
            this.x = 0 
            this.vx *= -1;
            
        }
        if(this.y + this.height >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
            this.vy *= -1;  
        }
        if(this.y <= 0) {
            this.y = 0;
            this.vy *= -1;
        }
        
        if (this.vy >= 0) {
           this.vy = Math.min(7, this.vy);
        } else {
            this.vy = Math.max(-7, this.vy);
        }
        /* console.log(this.vy) */
    }

    bounce(structure) {
        if (this.canBounce) {
            this.canBounce = false;
            this.vy *= -1;
            /* this.y += this.vy > 0 ? ROUND_CORNER_SPACE : -ROUND_CORNER_SPACE; */
            if (this.y <= structure.y) {
                this.y = structure.y - this.height -4; 
            } else {
                this.y = structure.y + structure.height;
            }
            if (this.x >= structure.x && this.vx <= 0) {
                this.vx *= -1;
            } else if (this.x <= structure.x && this.vx >= 0) {
                this.vx *= -1;
            }
 
         setTimeout(() => this.canBounce = true, 10);
            
        }
    }

    split() {
            return [
                new Ball(this.ctx, this.x + (this.width / 2), this.y, this.size + 1, this.color, 3, -3),
                new Ball(this.ctx, this.x + (this.width / 2), this.y, this.size + 1, this.color, -3, -3)
            ]
    }

    
}