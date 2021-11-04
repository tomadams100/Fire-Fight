const fire_image = new Image()
fire_image.src = "./img/fire.png"

const fireGif = []
let counter = 0

for (let i = 1; i <= 30; i++) {
    for (let j = 0; j < 10; j++) {
        let fire_gif_frame = new Image()
        fire_gif_frame.src = `./img/fire_gif/fire_${i}.gif`
        fireGif.push(fire_gif_frame)
    }
}

class Fire {
    constructor(canvas,x,y,waterArray) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.x = x
        this.y = y
        this.width = 80
        this.height = 80
        this.waterArray = waterArray
        this.strength = 200
    }
    draw() {
        //DRAW FIRE        
        this.ctx.drawImage(fireGif[counter],this.x,this.y,this.width,this.height)
        counter++
        if (counter == fireGif.length-1) counter = 0
    }
}

