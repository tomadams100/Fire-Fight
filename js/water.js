const water_image = new Image()
water_image.src = "/img/water.png"

class Water {
    constructor(canvas, angle, fireArray, extraWaterArray,waterRemaining) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = 240
        this.y = 370
        this.width = 40
        this.height = 40
        this.Xspeed = 2
        this.Yspeed = 0.2
        this.angle = angle
        this.gravity = 0.05
        this.gravitySpeed = 0
        this.fireArray = fireArray
        this.waterRemaining = waterRemaining
        this.extraWaterArray = extraWaterArray
        this.size = this.width * this.height
    }
    draw() { //DRAW THE WATER
        this.ctx.drawImage(water_image,this.x,this.y,this.width,this.height)
    }
    update() {
        this.gravitySpeed += this.gravity
        this.x += this.Xspeed
        this.y += this.Yspeed + this.gravitySpeed + (this.angle/10)
    }
    
    
    checkWalls() { // Checks to see if water is outside the canvas
        if (this.x < this.canvas.width && this.y < this.canvas.height) { 
            return false
        } else {
            return true
        }
    }
}