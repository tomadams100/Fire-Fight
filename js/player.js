class Player {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.angle = -40
        this.hoseX = 0
        this.hoseY = 0
    }
    draw() {
        //DRAW PLAYER
        this.ctx.translate(250,400)
        this.ctx.rotate(this.angle * Math.PI / 180)
        this.ctx.fillStyle = 'indianred'
        this.ctx.fillRect(this.hoseX, this.hoseY, 80, 20)
        this.ctx.resetTransform()
    }
}