class Attack {
    constructor(x, y, width, height, img, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.ctx = ctx;
        let self = this;
        setInterval(function(){
            self.y += 20;
        }, 200);
    }

    draw() {
        this.ctx.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}