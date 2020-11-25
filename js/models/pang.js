class Pang {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy= 0;

        this.sprite = new Image();
        this.sprite.src = 'img/sprites/pang.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 3;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }

        this.movement = {
            right: false,
            left: false
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
            )
        }
        this.drawCount++;
        this.animate();
    }


    onKeyEvent(event) {
        const state = event.type === 'keydown';
        switch(event.keyCode) {
            case KEY_RIGHT:
                this.movement.right = state;
                break;
            case KEY_LEFT:
                this.movement.left = state;
                break;
        }
    }

    move() {
        if (this.movement.right) {
            this.vx = SPEED;
        } else if (this.movement.left) {
            this.vx = -SPEED
        } else {
            this.vx = 0;
        }

        this.x += this.vx;

        if (this.x + this.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        } else if (this.x <= 0) {
            this.x = 0;
        }
    }

    animate() {
        if (this.movement.right) {
            this.animateSprite(1, 0, 2, 5);
        } else if (this.movement.left) {
            this.animateSprite(2, 0, 2, 5);
        } else {
            this.resetAnimation();
        }

    }

    animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if(this.sprite.verticalFrameIndex != initialVerticalIndex) {
            this.sprite.verticalFrameIndex = initialVerticalIndex;
            this.sprite.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.drawCount = 0;
        }
    }

    resetAnimation() {
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;
    }
}