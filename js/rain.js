const rain_image = new Image()
rain_image.src = "./img/water.png"

class Rain {
    constructor(canvas,fireArray,x,y) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = x
        this.y = y
        this.width = 40
        this.height = 40
        this.Yspeed = 0.2
        this.gravity = 0.08
        this.gravitySpeed = 0
        this.fireArray = fireArray
    }
    draw() { //DRAW THE WATER
        this.ctx.drawImage(rain_image,this.x,this.y,this.width,this.height)
    }
    update() {
        this.gravitySpeed += this.gravity
        this.y += this.Yspeed + this.gravitySpeed
    }
    checkWalls() { // Checks to see if water is outside the canvas
        if (this.x < this.canvas.width && this.y < this.canvas.height) { 
            return false
        } else {
            return true
        }
    }
}