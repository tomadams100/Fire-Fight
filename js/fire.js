const fire_image = new Image()
fire_image.src = "/img/fire.png"

class Fire {
    constructor(canvas,x,y) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = x
        this.y = y
        this.width = 80
        this.height = 80
        this.size = this.width * this.height
    }
    draw() {
        //DRAW FIRE
        this.ctx.drawImage(fire_image,this.x,this.y,this.width,this.height)
    }
}

