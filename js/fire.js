const fire_image = new Image()
fire_image.src = "/img/fire.png"

class Fire {
    constructor(canvas,x,y,waterArray) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = x
        this.y = y
        this.width = 80
        this.height = 80
        this.size = this.width * this.height
        this.waterArray = waterArray
    }
    draw() {
        //DRAW FIRE
        this.ctx.drawImage(fire_image,this.x,this.y,this.width,this.height)
    }
    checkCollision() { // FIX THIS SO IT DELETES WATER ON COLISSION WITH FIRE
        this.waterArray.forEach((water,i) => {
            if((this.x < water.x + 10 && this.x > water.x -10)&&(this.y < water.y + 10 && this.y > water.y -10)) {            
                this.waterArray.splice(i,1)
                console.log("delete a water droplet")
            }
        });
    }
}

