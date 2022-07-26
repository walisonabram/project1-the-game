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
        this.img.addEventListener('load', () => {
            this.draw(ctx);
        })
    }

    
    
    setImg(src) {
        this.img.src = src;
    }
    
    moveUp() {
        this.srcX = this.spritePosition.width * this.spritePosition.up.column;
        this.srcY = this.spritePosition.height * this.spritePosition.up.row; 
        this.y -= this.speed;
    }
  
    moveDown() {
        this.srcX = this.spritePosition.width * this.spritePosition.down.column;
        this.srcY = this.spritePosition.height * this.spritePosition.down.row;
        this.y += this.speed;
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
  
    draw() {
        if (this.spritePosition)
        {
            this.ctx.drawImage(this.img, this.srcX, this.srcY, this.srcWidth, this.srcHeight, this.x, this.y, this.dstWidth, this.dstHeight);
        } else {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}