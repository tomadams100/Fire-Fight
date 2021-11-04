//Build DOM generic function to update the DOM on the index.html page

const buildDom = (html) => {
    const main = document.querySelector("main")
    main.innerHTML = html
}

let easterEgg = false
const easterEggCheck = () => {
    easterEgg = true
}

const buildStartScreen = () => {
    buildDom(`
        <img src="img/welcome_text.png" alt="" class="welcome_text">
        <img src="img/cloud.png" alt="" class="cloud">
        <img src="img/cloud.png" alt="" class="cloud_2">
        <img src="img/cloud.png" alt="" class="cloud_3" id="cloud_button">
        <img src="img/fire_extinguisher.png" alt="" id="start_button" class="fire_extinguisher">
        <img src="img/arrow.png" alt="" class="arrow">
        <img src="img/start.png" alt="" class="start">
        <div class="instructions_container">
        <img src="img/instructions.png" alt="" class="instructions">
        </div>
    `)
    const cloud_button = document.getElementById("cloud_button");
    cloud_button.addEventListener("click", easterEggCheck);
    const startButton = document.getElementById("start_button");
    startButton.addEventListener("click", buildGameScreen);
}

const buildGameScreen = () => {
    buildDom(`
        <div id="game-board">
            <img src="img/level_one.png" alt="" id="level_one" class="level noShow">
            <img src="img/level_two.png" alt="" id="level_two" class="level noShow">
            <img src="img/level_three.png" alt="" id="level_three" class="level noShow">
            <img src="img/cloud.png" alt="" id="big_cloud" class="big_cloud visHide">
            <canvas id="canvas"></canvas>
        </div>
    `)
    const game = new Game
    game.start(easterEgg)
}

const buildGameOver = () => {
    buildDom(`
        <img src="img/end_game_text.png" alt="" class="end_game_text">
        <img src="img/cloud.png" alt="" class="cloud">
        <img src="img/cloud.png" alt="" class="cloud_2">
        <img src="img/cloud.png" alt="" class="cloud_3">
        <img src="img/fire_extinguisher.png" alt="" id="try_again_button" class="fire_extinguisher">
        <img src="img/arrow.png" alt="" class="arrow">
        <img src="img/try_again.png" alt="" class="try_again">
    `)
    const restartButton = document.getElementById("try_again_button");
    restartButton.addEventListener("click", buildGameScreen);
}
window.addEventListener("load", buildStartScreen);