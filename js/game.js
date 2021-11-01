const fireman_image = new Image()
fireman_image.src = "/img/fireman.png"
const house_image = new Image()
house_image.src = "/img/house.png"
const background_image = new Image()
background_image.src = "/img/background.jpg"

class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.player = null
        this.fireArray = []
        this.isGameOver = false
    }
    start() {
        this.canvas = document.querySelector("canvas")
        this.ctx = canvas.getContext("2d")
        //CREATE NEW PLAYER
        this.player = new Player(this.canvas)

        //KEY PRESS UP OR DOWN, TO CHANGE ANGLE OF PLAYER
        this.handleKeyDown = (event) => {
            if(event.code === "ArrowUp") return this.player.angle -= 1
            if (event.code === "ArrowDown") return this.player.angle += 1
        }
        window.addEventListener("keydown", this.handleKeyDown);

        this.startLoop()
    }
    startLoop() {
        const loop = () => {
            //CLEAR THE CANVAS
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            //DRAW BACKGROUND
            this.ctx.drawImage(background_image,0,0,this.canvas.width,this.canvas.height)
            //DRAW THE FIREMAN
            this.ctx.drawImage(fireman_image,80,270,250,220)
            //DRAW THE HOUSE
            this.ctx.drawImage(house_image,430,20,350,450)
            //DRAW THE PLAYER
            this.player.draw()
            //CREATE FIRE
            this.generateFire()
            //DRAW FIRE
            for (let i = 0; i<this.fireArray.length; i++) {
                this.fireArray[i].draw() 
            }
            //CREATE WATER
            let water = this.generateWater()
            water.draw()
            
            //CHECK AMOUNT OF FIRE
            this.checkAmountOfFire()
            if (this.isGameOver===false) {
                window.requestAnimationFrame(loop)
            } else {
                buildGameOver()
            }
            
        }
        window.requestAnimationFrame(loop)
    }
    generateFire() {
        if(Math.random()>0.995) {
            let ranX = Math.random()*((this.canvas.width - 80) - 400) + 400 //(max - min) + min
            let ranY = Math.random()*(380 - 20) + 20
            this.fireArray.push(new Fire(this.canvas,ranX,ranY))
        }
    }
    generateWater() {
        return new Water(this.canvas)
    }
    checkAmountOfFire() {
        if(this.fireArray.length > 30) this.isGameOver = true
    }
}