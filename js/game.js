class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.player = null
        this.fireArray = []
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
            //DRAW THE FIREMAN
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(150,350,100,120)
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

            window.requestAnimationFrame(loop)
        }
        window.requestAnimationFrame(loop)
    }
    generateFire() {
        if(Math.random()>0.995) {
            let ranX = Math.random()*(this.canvas.width - 400) + 400 //(max - min) + min
            let ranY = Math.random()*400
            this.fireArray.push(new Fire(this.canvas,ranX,ranY))
        }
    }
    generateWater() {
        return new Water
    }
}