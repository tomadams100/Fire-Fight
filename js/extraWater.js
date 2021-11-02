const extraWater_image = new Image()
extraWater_image.src = "/img/extraWater.png"

class ExtraWater {
    constructor(canvas,x,y,waterArray) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = x
        this.y = y
        this.width = 40
        this.height = 40
        this.size = this.width * this.height
        this.waterArray = waterArray
    }
    draw() {
        //DRAW EXTRA WATER
        this.ctx.drawImage(extraWater_image,this.x,this.y,this.width,this.height)
    }
}

