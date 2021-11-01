class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
    }
    start() {
        this.canvas = document.querySelector("canvas")
        this.ctx = canvas.getContext("2d")
        this.ctx.beginPath()
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(150,350,100,120)
        this.ctx.stroke()
    }
}