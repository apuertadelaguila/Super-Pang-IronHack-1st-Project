class Structure {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.structureSprite = new Image();
        this.structureSprite.src = 'img/sprites/structures.png';
        this.structureSprite.isReady = false;
        this.structureSprite.horizontalFrames = 5;
        this.structureSprite.verticalFrames = 1;
        this.structureSprite.horizontalFrameIndex = 0;
        this.structureSprite.verticalFrameIndex = 0;
        this.structureSprite.onload = () => {
            this.structureSprite.isReady = true;
            this.structureSprite.frameWidth = Math.floor(this.structureSprite.width / this.structureSprite.horizontalFrames);
            this.structureSprite.frameHeight = Math.floor(this.structureSprite.height / this.structureSprite.verticalFrames);
            this.width = this.structureSprite.frameWidth;
            this.height = this.structureSprite.frameHeight;
        }
        this.destroy = false;

        this.drawCount = 0;
    }

    draw() {
        if (this.structureSprite.isReady) {
            this.ctx.drawImage(
                this.structureSprite,
                this.structureSprite.frameWidth * this.structureSprite.horizontalFrameIndex,
                this.structureSprite.frameHeight * this.structureSprite.verticalFrameIndex,
                this.structureSprite.frameWidth,
                this.structureSprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            )
            /* this.ctx.strokeRect(this.x, this.y, this.width, this.height) */
        }
        if (this.destroy) {
            this.animate(0, 0, 4, 8)
        }
       
        this.drawCount++;

    }

    collides(element) {
        return this.x + this.width > element.x + ROUND_CORNER_SPACE &&
            this.x < element.x + element.width - ROUND_CORNER_SPACE &&
            this.y + this.height > element.y + ROUND_CORNER_SPACE &&
            this.y < element.y + element.height - ROUND_CORNER_SPACE;     
    }

    animate(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if(this.structureSprite.verticalFrameIndex != initialVerticalIndex) {
            this.structureSprite.verticalFrameIndex = initialVerticalIndex;
            this.structureSprite.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.structureSprite.horizontalFrameIndex = (this.structureSprite.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.drawCount = 0;
        }
    }
}