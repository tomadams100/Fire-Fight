class Water {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = 100
        this.y = 100
        this.width = 80
        this.height = 80
    }
    draw() {        //DRAW THE WATER
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}