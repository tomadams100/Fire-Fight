//Build DOM generic function to update the DOM on the index.html page
const buildDom = (html) => {
    const main = document.querySelector("main")
    main.innerHTML = html
}

const buildStartScreen = () => {
    buildDom(`
        <img src="/img/welcome_text.png" alt="" class="welcome_text">
        <img src="/img/cloud.png" alt="" class="cloud">
        <img src="/img/cloud.png" alt="" class="cloud_2">
        <img src="/img/cloud.png" alt="" class="cloud_3">
        <img src="/img/fire_extinguisher.png" alt="" id="start_button" class="fire_extinguisher">
        <img src="/img/arrow.png" alt="" class="arrow">
        <img src="/img/start.png" alt="" class="start">
        <div class="instructions_container">
        <img src="/img/instructions.png" alt="" class="instructions">
        </div>
    `)
    const startButton = document.getElementById("start_button");
    startButton.addEventListener("click", buildGameScreen);
}

const buildGameScreen = () => {
    buildDom(`
        <div id="game-board">
            <canvas id="canvas" width="800" height="500"></canvas>
        </div>
    `)
    const game = new Game
    game.start()
}

const buildGameOver = () => {
    buildDom(`
        <div class="outer">
            <div class="middle">
                <div class="inner">
                    <div class="end_game_text">
                        <img src="/img/end_game_text.png" alt="Game Over">
                        <button id="game">TRY AGAIN</button>
                    </div>
                </div>
            </div>
        </div>
    `)
    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
}

window.addEventListener("load", buildStartScreen);