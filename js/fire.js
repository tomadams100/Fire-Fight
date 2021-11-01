class Fire {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
    }
    draw() {
        //DRAW FIRE
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(500, 100, 80, 80)
    }
}