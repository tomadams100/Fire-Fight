const water_image = new Image()
water_image.src = "/img/water.png"

class Water {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = 300
        this.y = 350
        this.width = 40
        this.height = 40
    }
    draw() {        //DRAW THE WATER
        this.ctx.drawImage(water_image,this.x,this.y,this.width,this.height)
    }
}