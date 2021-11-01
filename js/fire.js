class Fire {
    constructor(canvas,x,y) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = x
        this.y = y
        this.width = 80
        this.height = 80
    }
    draw() {
        //DRAW FIRE
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}