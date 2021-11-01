//Build DOM generic function to update the DOM on the index.html page
const buildDom = (html) => {
    const main = document.querySelector("main")
    main.innerHTML = html
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
        <section class="game-over">
                <h1>Game Over</h1>
                <button id = "game"> TRY AGAIN</button>
                <div class= "pointer"> </div>
            </section>
    `)
    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
}

window.addEventListener("load", buildGameScreen);