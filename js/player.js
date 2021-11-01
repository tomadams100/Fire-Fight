class Player {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.angle = 40
    }
    draw() {
        //DRAW PLAYER
        this.ctx.translate(250,400)
        this.ctx.rotate(this.angle * Math.PI / 180)
        //console.log("this.angle", this.angle)
        this.ctx.fillStyle = 'gray'
        this.ctx.fillRect(0, 0, 80, 20)
        this.ctx.resetTransform()
    }
}