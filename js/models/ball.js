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
            this.ballSprite.width = this.ballSprite.frameWidth;
            this.ballSprite.height = this.ballSprite.frameHeight;
        }

        this.smoke = new Image();
        this.smoke.src = `img/sprites/smokes.png`;
        this.smoke.horizontalFrameIndex = 0;
        this.smoke.verticalFrameIndex = 0;
        this.smoke.horizontalFrames = 5;
        this.smoke.verticalFrames = 1;
        this.smoke.isReady = false;
        this.smoke.onload = () => {
            this.smoke.isReady = true;
            this.smoke.frameWidth = Math.floor(this.smoke.width / this.smoke.horizontalFrames);
            this.smoke.frameHeight = Math.floor(this.smoke.height / this.smoke.verticalFrames);
            this.smoke.width = this.smoke.frameWidth;
            this.smoke.height = this.smoke.frameHeight;
        }

        this.drawCount = 0;
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
                this.ballSprite.width,
                this.ballSprite.height
            );

           /*  this.ctx.strokeRect(this.x, this.y, this.ballSprite.width, this.ballSprite.height)  */   
        }
        
        this.drawCount++;
    }

    drawSmoke() {
        if (this.smoke.isReady && this.destroy) {
            this.ctx.drawImage(
                this.smoke,
                this.smoke.frameWidth * this.smoke.horizontalFrameIndex,
                this.smoke.frameHeight * this.smoke.verticalFrameIndex,
                this.smoke.frameWidth,
                this.smoke.frameHeight,
                this.x - (this.smoke.frameWidth / 2) + (this.ballSprite.width / 2),
                this.y - (this.smoke.frameHeight / 2) + (this.ballSprite.height / 2),
                this.smoke.width,
                this.smoke.height
            ); 
           /*  this.ctx.strokeRect(this.x, this.y, this.smoke.width, this.smoke.height) */
        }
        this.animateSmokes(0, 0, 4, 8)
        this.drawCount++;
        
    }

    move() {
        this.vy += this.ay
        this.x += this.vx;
        this.y += this.vy;
        

        if(this.x + this.ballSprite.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.ballSprite.width;
            this.vx *= -1;
            
        }
        if(this.x <= 0) {
            this.x = 0 
            this.vx *= -1;
            
        }
        if(this.y + this.ballSprite.height >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.ballSprite.height;
            this.vy *= -1;  
        }
        if(this.y <= 0) {
            this.y = 0;
            this.vy *= -1;
        }
    }

    bounce(structure) {
        if (this.canBounce) {
            this.canBounce = false;
            this.vy *= -1;
            
            if (this.x >= structure.x && this.vx <= 0) {
                this.vx *= -1;
            } else if (this.x <= structure.x && this.vx >= 0) {
                this.vx *= -1;
            }
 
         setTimeout(() => this.canBounce = true, 500);
            
        }
    }

    split() {
            return [
                new Ball(this.ctx, this.x + (this.ballSprite.width / 2), this.y, this.size + 1, this.color, 3, -3),
                new Ball(this.ctx, this.x + (this.ballSprite.width / 2), this.y, this.size + 1, this.color, -3, -3)
            ]
    }

    animateSmokes(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if(this.smoke.verticalFrameIndex != initialVerticalIndex) {
            this.smoke.verticalFrameIndex = initialVerticalIndex;
            this.smoke.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.smoke.horizontalFrameIndex = (this.smoke.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.drawCount = 0;
        }
    }
}