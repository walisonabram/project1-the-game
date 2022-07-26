window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };
    myGameArea.start();

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
    let boss = new Creature(155, 0, 70, 70, './images/flying_dragon-red-RGB.png', myGameArea.ctx, spritePositions);
    // boss.moveDown();
    // boss.draw();
    let mage = new Creature(220, 500, 70, 70, './images/25-252737_wizard-2d-game-sprite-wizard.png', myGameArea.ctx, spritePositionsMage);
    // mage.moveUp();
    // mage.draw();
    moveMage(myGameArea, mage, boss);
    setInterval(function() {
        moveBoss(myGameArea, mage, boss)
    }, 300)
};

let myGameArea = {
    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),
    start: function() {
        let self = this;
        const backGround = new Image();
        backGround.src = './images/background-image.jpg';
        backGround.onload = function(){
            self.ctx.drawImage(backGround, 0, 0, 500, 600);   
        };
    },
    clear: function() {
        this.ctx.clearRect(0, 0, 500, 600);
        const backGround = new Image();
        backGround.src = './images/background-image.jpg';
        this.ctx.drawImage(backGround, 0, 0, 500, 600);
    }
}

function clearCanvas(gameArea) {
    gameArea.clear()
}

function updateCanvas(gameArea, mage, boss) {
    clearCanvas(gameArea);
    mage.draw();
    boss.draw();
    // gameArea.ctx.fillText('mage_x: ' + boss.x, 280, 40);
    // gameArea.ctx.fillText('mage_y: ' + boss.y, 280, 60);
}

function moveMage(gameArea, mage, boss) {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
        // case 'ArrowUp':
        //     mage.moveUp();
        //     break;
        // case 'ArrowDown':
        //     mage.moveDown();
        //     break;
        case 'ArrowLeft':
            mage.moveLeft();
            break;
        case 'ArrowRight':
            mage.moveRight();
            break;
        default:
        }
        updateCanvas(gameArea, mage, boss);
    })
}

function moveBoss(gameArea, mage, boss) {
    let side = Math.floor(Math.random() * 2) + 1;
    let steps = Math.floor(Math.random() * 6) + 2;
    for (let i = 0; i < steps; i++) {
        if (side === 1 && boss.x - boss.speed >= 0) {
            boss.moveLeft();
        } 
        else if (boss.x + boss.speed + (boss.width * 2) <= gameArea.canvas.width ) {
            boss.moveRight();
        }
        updateCanvas(gameArea, mage, boss);
    }
}