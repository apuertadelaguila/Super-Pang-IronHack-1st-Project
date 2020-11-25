class redBall {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 3;
        this.vy = 3;

        this.redBallSprite = new Image();
        this.redBallSprite.src = 'img/sprites/balls.png';
        this.redBallSprite.horizontalFrameIndex = 0;
        this.redBallSprite.verticalFrameIndex = 0;
        this.redBallSprite.horizontalFrames = 4;
        this.redBallSprite.verticalFrames = 3;
        this.redBallSprite.isReady = false;
        this.redBallSprite.onload = () => {
            this.redBallSprite.isReady = true;
            this.redBallSprite.frameWidth = Math.floor(this.redBallSprite.width / this.redBallSprite.horizontalFrames);
            this.redBallSprite.frameHeight = Math.floor(this.redBallSprite.height / this.redBallSprite.verticalFrames);
            this.width = this.redBallSprite.frameWidth;
            this.height = this.redBallSprite.frameHeight;
        }
        this.drawCount = 0;
    }

    draw() {
        if (this.redBallSprite.isReady) {
            this.ctx.drawImage(
                this.redBallSprite,
                this.redBallSprite.frameWidth * this.redBallSprite.horizontalFrameIndex,
                this.redBallSprite.frameHeight * this.redBallSprite.verticalFrameIndex,
                this.redBallSprite.frameWidth,
                this.redBallSprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
            this.drawCount++;
        }
    }
}