//Build DOM generic function to update the DOM on the index.html page
const buildDom = (html) => {
    const main = document.querySelector("main")
    main.innerHTML = html
}

const buildStartScreen = () => {
    buildDom(`
        <h1>Splash Screen</h1>
        <br />
        <button id="start-button">StartGame</button>
    `)
    const startButton = document.getElementById("start-button");
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