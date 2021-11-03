const fire_extinguisher_image = new Image()
fire_extinguisher_image.src = "/img/fire_extinguisher.png"

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
        this.ctx.translate(220,400)
        this.ctx.rotate(this.angle * Math.PI / 180)
        this.ctx.drawImage(fire_extinguisher_image,this.hoseX,this.hoseY,100,100)
        this.ctx.resetTransform()
    }
}