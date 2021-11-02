const water_image = new Image()
water_image.src = "/img/water.png"

class Water {
    constructor(canvas, angle, fireArray, extraWaterArray) {
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
    checkCollision() {
        this.fireArray.forEach((fire, i) => {
           if((this.x < fire.x + 10 && this.x > fire.x -10)&&(this.y < fire.y + 10 && this.y > fire.y -10)) {
                this.fireArray.splice(i,1)
            }
        });
    }
    checkCollisionWithExtraWater() {
        this.extraWaterArray.forEach((extraWater, i) => {
            if((this.x < extraWater.x + 10 && this.x > extraWater.x -10)&&(this.y < extraWater.y + 10 && this.y > extraWater.y -10)) {
                this.extraWaterArray.splice(i,1)
            }
        });
    }
    checkWalls() { // Checks to see if water is outside the canvas
        if (this.x < this.canvas.width && this.y < this.canvas.height) { 
            return false
        } else {
            return true
        }
    }
}