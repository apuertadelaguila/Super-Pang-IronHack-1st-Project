class Spear {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.sprite = new Image();
        this.sprite.src = 'img/sprites/spears.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 70;
        this.sprite.verticalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames;
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames;
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight + 130;
            this.spearX = this.x + 10;
            this.spearY = this.y;
            this.spearW = this.width -20;
            this.spearH = this.height
        }
        this.drawCount = 0;
        this.destroy = false;
        
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.frameWidth * this.sprite.horizontalFrameIndex,
                this.sprite.frameHeight * this.sprite.verticalFrameIndex,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height

            );
            this.drawCount++;
            this.animate();
            this.ctx.strokeRect(this.spearX, this.spearY, this.spearW, this.spearH)
            
            

        }
    }

    animate() {
        if (this.sprite.horizontalFrameIndex++ >= this.sprite.horizontalFrames) {
            this.sprite.horizontalFrameIndex = this.sprite.horizontalFrames;
            this.destroy = true;
            this.drawCount = 0;
        }
        this.spearH = this.sprite.horizontalFrameIndex * this.height / this.sprite.horizontalFrames;
        this.spearY = this.y + this.height - this.spearH;
    }

    collides(element) {
        const collides = 
            this.spearX + this.spearW > element.x + 20 &&
            this.spearX < element.x + element.width - 20 &&
            this.spearY + this.spearH > element.y + 20 &&
            this.spearY < element.y + element.height - 20;
            this.destroy = collides;
            return collides;

    }


    
}