const MOVE_DOWN_TIMER_INTERVAL = 1;
const JUMP_TIMER_INTERVAL = 1;
const JUMP_HEIGHT = 300;
const JUMP_SPEED = 0.5;

class Character {
    constructor() {
        const character = document.getElementById("character");
        this._top = 0.5 * game.clientHeight - 40;
        character.style.top = this._top + "px";
        this._downTimerID = setInterval(() => this._moveDown(this), MOVE_DOWN_TIMER_INTERVAL);
    }

    _moveDown(self) {
        console.log(self._top);
        if (self._top >= game.clientHeight - 80) {
            game.dispatchEvent(crashEvent);
            return;
        }
        self._top += 1;
        const character = document.getElementById("character");
        character.style.top = self._top + "px";
        console.log("Down character");
        console.log(self._top);
    }

    //Можно "забыть" остановить снижение при проигрыше
    stopMoving() {
        if (this._downTimerID) {
            clearInterval(this._downTimerID);
            this._downTimerID = null;
            return true;
        }
        return false;
    }

    jump() {
        if (this._jumpTimerID && this._endJumpTimerID) {
            clearInterval(this._jumpTimerID)
            clearTimeout(this._endJumpTimerID);
        }

        this.stopMoving();
        const character = document.getElementById("character");
        const goUpper = (distance) => {
            if (this._top <= 10){
                game.dispatchEvent(crashEvent);
            }
            this._top = Math.max(10, this._top - distance);
            character.style.top = this._top + "px";
        }
        this._jumpTimerID = setInterval(() => goUpper(1), 1.0 / JUMP_SPEED);
        this._endJumpTimerID = setTimeout(() => {
            clearInterval(this._jumpTimerID);
            this._downTimerID = setInterval(() => this._moveDown(this), MOVE_DOWN_TIMER_INTERVAL);
        }, JUMP_HEIGHT / JUMP_SPEED);


    }

    render() {
        const character = document.getElementById("character");
        //здесь тоже можно все сломать, убрав game.offsetLeft
        character.style.left = 20 + game.offsetLeft + "px";
        //40px == половина высоты character
        character.style.top = this._top + "px";
        let characterImage = document.createElement("img");
        characterImage.src = "images/character.svg";
        characterImage.style.width = "100%";
        characterImage.style.height = "100%";
        character.append(characterImage);
    }
}

let crashEvent = new Event("crash", {bubbles: true});
const game = document.getElementById("game");


const renderGameOverTab = () => {
    let gameOverWindow = document.createElement("div")

    let gameOverText = document.createElement("span");
    gameOverText.append("Game over")

    gameOverWindow.append(gameOverText);
    game.append(gameOverWindow);

    gameOverWindow.style.position = "absolute";
    gameOverWindow.style.width = "300px";
    gameOverWindow.style.backgroundColor = "#FFFFFF";
    gameOverWindow.style.border = "1px red solid";
    gameOverWindow.style.textAlign = "center";
    gameOverWindow.style.fontSize = "2em";

    gameOverText.style.margin = "40px auto";
    gameOverText.style.display = "inline-block";


//Рассчет координат можно вынести как интерактив на пару
//А еще можно попробовать получить clientHeight и clientWidth до отрисовки (спойлер: будет 0)

    gameOverWindow.style.top = game.clientTop + 0.5 * game.clientHeight - 0.5 * gameOverWindow.clientHeight + "px";

    //Отсюда можно убрать game.offsetLeft и убедиться, что все сломается
    gameOverWindow.style.left = game.offsetLeft + game.clientLeft + 0.5 * game.clientWidth -
        0.5 * gameOverWindow.clientWidth + "px";

    console.log("client left " + game.clientLeft);
}

let character = new Character();
character.render();

document.addEventListener("mousedown", (event) => {
    character.jump();
})


const gameOverHandler = (event) => {
    renderGameOverTab();
    character.stopMoving();

}

document.addEventListener("crash", gameOverHandler);



