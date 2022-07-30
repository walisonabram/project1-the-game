window.onload = () => {
    let myGameArea = {
        canvas: document.getElementById('canvas'),
        ctx: canvas.getContext('2d'),
        score: 0,
        gameRunning: null,
        boss: null,
        mage: null,
        record: 0,
        init: function() {
            let spritePositions = {
                up: { column: 0, row: 0 },
                right: { column: 0, row: 1 },
                down: { column: 0, row: 2 },
                left: { column: 0, row: 3 },
                width: 191,
                height: 161,
            };
            let spritePositionsMage = {
                up: { column: 4, row: 0 },
                right: { column: 0, row: 2 },
                down: { column: 0, row: 0 },
                left: { column: 0, row: 1 },
                width: 60,
                height: 90,
            };
            this.boss = new Creature(this.canvas.width / 2, 60, 70, 70, './images/flying_dragon-red-RGB.png', this.ctx, spritePositions);
            this.mage = new Creature(this.canvas.width / 2, 340, 70, 70, './images/25-252737_wizard-2d-game-sprite-wizard.png', this.ctx, spritePositionsMage);
            let self = this;
            const backGround = new Image();
            backGround.src = './images/background-image.jpg';
            backGround.onload = function() {
                self.ctx.drawImage(backGround, 0, 0, 700, 400);   
            };
        },
        start: function() {
            this.gameRunning = startGame(this);
        },
        gameOver: function() {
            this.boss.stopRandomMovement();
            clearInterval(this.gameRunning);
            let self = this;
            setTimeout(function() {
                self.clear();
                self.ctx.font = 'bold 48px verdana, sans-serif';
                self.ctx.fillStyle = 'red';
                self.ctx.textAlign = 'center';
                self.ctx.shadowColor = 'black';
                self.ctx.shadowBlur = 10;
                self.ctx.lineWidth = 2;
                self.ctx.fillText('Game Over!', self.canvas.width / 2, (self.canvas.height / 2) - 30);
                self.ctx.strokeText('Game Over!', self.canvas.width / 2, (self.canvas.height / 2) - 30);
                self.ctx.font = '36px verdana, sans-serif';
                self.ctx.fillStyle = 'white';
                self.ctx.fillText('Your Score: ' + self.score, self.canvas.width / 2, (self.canvas.height / 2) + 30);
                if(self.record < self.score) {
                    self.record = self.score;
                }
                self.score = 0;
            }, 100);
            this.gameRunning = null;
        },
        clear: function() {
            this.ctx.clearRect(0, 0, 700, 400);
            const backGround = new Image();
            backGround.src = './images/background-image.jpg';
            this.ctx.drawImage(backGround, 0, 0, 700, 400);
        }
    };
    myGameArea.init();
    document.getElementById('start-button').onclick = () => {
        if(!myGameArea.gameRunning) {
            myGameArea.start();
        }
    };
};


function startGame(myGameArea) {
    myGameArea.init();
    moveMage(myGameArea, myGameArea.mage);
    myGameArea.boss.randomMovement(myGameArea, true, true);
    
    return setInterval(function() {
        updateCanvas(myGameArea, myGameArea.mage, myGameArea.boss);
    }, 20)
}

function clearCanvas(gameArea) {
    gameArea.clear();
}

function updateCanvas(gameArea, mage, boss) {
    clearCanvas(gameArea);
    mage.draw();
    boss.draw();

    for (let i = 0; i < boss.attacks.length; i++) {
        if (boss.attacks[i].y >= gameArea.canvas.height) {
            boss.attacks.splice(i, 1);
            gameArea.score += 10;
        }
    }

    for (let i = 0; i < boss.attacks.length; i++) {
        boss.attacks[i].draw();
        if(boss.attacks[i].x >= mage.x - 25 && boss.attacks[i].x <= mage.x + 25 && boss.attacks[i].y + 45 >= mage.y - 30) {
            gameArea.gameOver();
        }
    }

    gameArea.ctx.fillStyle = 'white';
    gameArea.ctx.textAlign = 'right';
    gameArea.ctx.font = 'bold 20px verdana, sans-serif';
    gameArea.ctx.fillText('record: ' + gameArea.record, gameArea.canvas.width - 20, 40);
    gameArea.ctx.font = 'bold 16px verdana, sans-serif';
    gameArea.ctx.fillText('score: ' + gameArea.score, gameArea.canvas.width - 20, 60);
}

function moveMage(gameArea, mage) {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
        case 'ArrowLeft':
            if (mage.x - mage.speed >= 25) {
                mage.moveLeft();
            }
            break;
        case 'ArrowRight':
            if (mage.x + mage.speed <= gameArea.canvas.width - 25) {
                mage.moveRight();
            }
            break;
        default:
        }
    });
    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                mage.moveDown();
                break;
            case 'ArrowRight':
                mage.moveDown();
                break;
            default:
        }
    })

}

