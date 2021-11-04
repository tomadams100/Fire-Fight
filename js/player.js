const fire_extinguisher_image = new Image()
fire_extinguisher_image.src = "./img/fire_extinguisher.png"

class Player {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.angle = -40
    }
    draw() {
        //DRAW PLAYER
        this.ctx.translate((21*this.canvas.width/100),(75*this.canvas.height/100))
        this.ctx.rotate(this.angle * Math.PI / 180)
        this.ctx.drawImage(fire_extinguisher_image,0,0,100,100)
        this.ctx.resetTransform()
    }
}