class Pang {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy= 0;

        this.shotSound = new Audio('sounds/spear.mp3')

        this.sprite = new Image();
        this.sprite.src = 'img/sprites/pang2.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.sprite.width = this.sprite.frameWidth;
            this.sprite.height = this.sprite.frameHeight;
        }

        this.shot = new Image(),
        this.shot.src = 'img/sprites/shot.png';
        this.shot.isReady = false;
        this.shot.horizontalFrames = 1;
        this.shot.verticalFrames = 1;
        this.shot.horizontalFrameIndex = 0;
        this.shot.verticalFrameIndex = 0;
        this.shot.onload = () => {
            this.shot.isReady = true;
            this.shot.frameWidth = Math.floor(this.shot.width / this.shot.horizontalFrames);
            this.shot.frameHeight = Math.floor(this.shot.height / this.shot.verticalFrames);
            this.shot.width = this.shot.frameWidth;
            this.shot.height = this.shot.frameHeight;
        }

        this.movement = {
            right: false,
            left: false,
            fire: false
        }

        this.drawCount = 0;
        this.spears = [];
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
                this.sprite.width,
                this.sprite.height
            )
        }
        if (this.shot.isReady && this.movement.fire) {
            this.ctx.drawImage(
                this.shot,
                this.shot.frameWidth * this.shot.horizontalFrameIndex,
                this.shot.frameHeight * this.shot.verticalFrameIndex,
                this.shot.frameWidth,
                this.shot.frameHeight,
                this.x + 17,
                this.y - 10,
                this.shot.width,
                this.shot.height
            )
        }
        this.drawCount++;
        this.animate();
        this.clearSpears();

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
            case KEY_FIRE:
                this.movement.fire = state;
                this.fire()
                break;
        
                    
        }
    }

    move() {
        if (this.movement.fire) {
            this.vx = 0;
        } else if (this.movement.left) {
            this.vx = -SPEED
        } else if (this.movement.right) {
            this.vx = SPEED;
        } else {
            this.vx = 0;
        }

        this.x += this.vx;

        if (this.x + this.sprite.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.sprite.width;
        } else if (this.x <= 0) {
            this.x = 0;
        }
    }

    animate() {
        if (this.movement.fire) {
            this.animateSprite(0, 1, 2, 8)
        } else if (this.movement.left) {
            this.animateSprite(2, 0, 2, 5);
        } else if (this.movement.right) {
            this.animateSprite(1, 0, 2, 5);  
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

    collidesAnimation() {
        this.sprite.verticalFrameIndex = 3;
        this.sprite.maxHorizontalIndex = 0;
    }

    winAnimation() {
        this.sprite.verticalFrameIndex = 3;
        this.sprite.horizontalFrameIndex = 1;
    }

    collides(element) {
        return this.x + this.sprite.width > element.x + 30 &&
            this.x < element.x + element.ballSprite.width - 30 &&
            this.y + this.sprite.height > element.y + 30 &&
            this.y < element.y + element.ballSprite.height - 30;
            
    }  

    fire() {
        const canFire = this.spears.length === 0;
        if (this.movement.fire && canFire) {
            this.spears.push(new Spear(this.ctx, this.x + 12, 0));
            this.shotSound.play();
        }
    }

    clearSpears() {
        this.spears = this.spears.filter(spear => !spear.destroy)
    }
}