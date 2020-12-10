class Background {
    constructor(ctx, level) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
       
        this.background = new Image();
        this.background.src = `assets/img/backgrounds/bg${level}.png`;
        this.background.isReady = false;
        this.background.onload = () => {
            this.background.isReady = true;
            this.background.width = this.ctx.canvas.width;
            this.background.height = this.ctx.canvas.height;
            this.width = this.ctx.canvas.width;
            this.height = this.ctx.canvas.height;
        }
    }

    draw() {
        if (this.background.isReady) {
            this.ctx.drawImage(
                this.background,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }
}
