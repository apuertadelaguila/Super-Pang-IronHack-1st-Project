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
        }
        this.drawCount = 0;
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
        }
    }

    animate() {
        if (this.sprite.horizontalFrameIndex++ >= 70) {
            this.sprite.horizontalFrameIndex = 70;
            this.drawCount = 0;
        }
    }


    
}