class Creature {
    constructor(x, y, width, height, imgSrc, ctx, spritePosition) {
        this.x = x;
        this.y = y;
        this.spritePosition = spritePosition;
        this.speed = 10;
        this.img = new Image();
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.attacks = [];
        this.movingCreature = null;
        
        if (spritePosition) {
            this.srcX = spritePosition.width * spritePosition.down.column;
            this.srcY = spritePosition.height * spritePosition.down.row;
            this.srcWidth = spritePosition.width;
            this.srcHeight = spritePosition.height;
    
            this.dstX = x;
            this.dstY = y;
            this.dstWidth = spritePosition.width;
            this.dstHeight = spritePosition.height;
        }

        this.setImg(imgSrc);
    }

    randomMovement(gameArea, directions, attack) {
        let self = this;
        this.movingCreature = setInterval(function() {
            if(directions) {
                setTimeout(function() {
                    self.moveCreature(gameArea);
                }, 400);
            }
            let isAttacking = Math.floor(Math.random() * 3) === 0;
            if (isAttacking && attack) {
                self.moveDown();
                self.attack();
            }
        }, 800)
    }

    stopRandomMovement() {
        clearInterval(this.movingCreature);
    }

    moveCreature(gameArea) {
        let side = Math.floor(Math.random() * 2) + 1;
        let steps = Math.floor(Math.random() * 10) + 4;
        for (let i = 0; i < steps; i++) {
            if (side === 1 && this.x - this.speed >= this.width / 2) {
                this.moveLeft();
            } 
            else if (this.x + this.speed <= gameArea.canvas.width - this.width / 2) {
                this.moveRight();
            }
        }
    }
    
    setImg(src) {
        this.img.src = src;
    }
    
    moveUp() {
        this.srcX = this.spritePosition.width * this.spritePosition.up.column;
        this.srcY = this.spritePosition.height * this.spritePosition.up.row; 
    }
  
    moveDown() {
        this.srcX = this.spritePosition.width * this.spritePosition.down.column;
        this.srcY = this.spritePosition.height * this.spritePosition.down.row;
    }
  
    moveLeft() {
        this.srcX = this.spritePosition.width * this.spritePosition.left.column;
        this.srcY = this.spritePosition.height * this.spritePosition.left.row;
        this.x -= this.speed;
    }
  
    moveRight() {
        this.srcX = this.spritePosition.width * this.spritePosition.right.column;
        this.srcY = this.spritePosition.height * this.spritePosition.right.row;
        this.x += this.speed;
    }

    attack() {
        let img = new Image();
        img.src = './images/output-onlinepngtools3.png';
        let attack = new Attack(this.x, this.y + 50, 30, 90, img, this.ctx);
        this.attacks.push(attack);
    }
  
    draw() {
        if (this.spritePosition)
        {
            this.ctx.drawImage(this.img, this.srcX, this.srcY, this.srcWidth, this.srcHeight, this.x - this.dstWidth / 2, this.y - this.dstHeight / 2, this.dstWidth, this.dstHeight);
        } else {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}