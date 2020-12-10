class Smoke {
    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.smoke = new Image();
        this.smoke.src = `assets/img/sprites/smokes.png`;
        this.smoke.horizontalFrameIndex = 0;
        this.smoke.verticalFrameIndex = 0;
        this.smoke.horizontalFrames = 5;
        this.smoke.verticalFrames = 1;
        this.smoke.isReady = false;
        this.smoke.onload = () => {
            this.smoke.isReady = true;
            this.smoke.frameWidth = Math.floor(this.smoke.width / this.smoke.horizontalFrames);
            this.smoke.frameHeight = Math.floor(this.smoke.height / this.smoke.verticalFrames);
            this.width = this.smoke.frameWidth;
            this.height = this.smoke.frameHeight;
        }

        this.drawCount = 0;
    }


    draw() {
        if (this.smoke.isReady) {
            this.ctx.drawImage(
                this.smoke,
                this.smoke.frameWidth * this.smoke.horizontalFrameIndex,
                this.smoke.frameHeight * this.smoke.verticalFrameIndex,
                this.smoke.frameWidth,
                this.smoke.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            ); 
            /* this.ctx.strokeRect(this.x, this.y, this.smoke.width, this.smoke.height) */
        }
        this.animate(0, 0, 4, 10)
        this.drawCount++;
        
    }


    animate(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if(this.smoke.verticalFrameIndex != initialVerticalIndex) {
            this.smoke.verticalFrameIndex = initialVerticalIndex;
            this.smoke.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.smoke.horizontalFrameIndex = (this.smoke.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.drawCount = 0;
        }
    }



    
}