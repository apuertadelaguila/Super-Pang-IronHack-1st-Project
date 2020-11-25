class blueBall {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 3;
        this.vy = 3;

        this.blueBallSprite = new Image();
        this.blueBallSprite.src = 'img/sprites/balls.png';
        this.blueBallSprite.horizontalFrameIndex = 0;
        this.blueBallSprite.verticalFrameIndex = 1;
        this.blueBallSprite.horizontalFrames = 4;
        this.blueBallSprite.verticalFrames = 3;
        this.blueBallSprite.isReady = false;
        this.blueBallSprite.onload = () => {
            this.blueBallSprite.isReady = true;
            this.blueBallSprite.frameWidth = Math.floor(this.blueBallSprite.width / this.blueBallSprite.horizontalFrames);
            this.blueBallSprite.frameHeight = Math.floor(this.blueBallSprite.height / this.blueBallSprite.verticalFrames);
            this.width = this.blueBallSprite.frameWidth;
            this.height = this.blueBallSprite.frameHeight;
        }
        this.drawCount = 0;
    }

    draw() {
        if (this.blueBallSprite.isReady) {
            this.ctx.drawImage(
                this.blueBallSprite,
                this.blueBallSprite.frameWidth * this.blueBallSprite.horizontalFrameIndex,
                this.blueBallSprite.frameHeight * this.blueBallSprite.verticalFrameIndex,
                this.blueBallSprite.frameWidth,
                this.blueBallSprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
            this.drawCount++;
        }
    }
}