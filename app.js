let crashEvent = new Event("crash", {bubbles: true});
const game = document.getElementById("game");

const gameOverHandler = (event) => {

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


const addCharacter = () => {
    const character = document.getElementById("character");
    let characterImage = document.createElement("img");
    characterImage.src = "images/character.svg";
    characterImage.style.width = "80px";
    characterImage.style.height = "80px";
    character.append(characterImage);


};

document.addEventListener("crash", gameOverHandler);
addCharacter();

game.dispatchEvent(crashEvent);
