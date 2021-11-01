class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.player = null
    }
    start() {
        this.canvas = document.querySelector("canvas")
        this.ctx = canvas.getContext("2d")
        //CREATE NEW PLAYER
        this.player = new Player(this.canvas)

        //CREATE NEW FIRE
        this.fire = new Fire(this.canvas)

        //KEY PRESS UP OR DOWN, TO CHANGE ANGLE OF PLAYER
        this.handleKeyDown = (event) => {
            if(event.code === "ArrowUp") return this.player.angle += 1
            if (event.code === "ArrowDown") return this.player.angle -= 1
        }
        document.body.addEventListener("keydown", this.handleKeyDown);

        this.startLoop()
    }
    startLoop() {
        const loop = () => {
            //CLEAR THE CANVAS
            this.ctx.clearRect(0,0,800,500)
            //DRAW THE FIREMAN
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(150,350,100,120)
            //DRAW THE PLAYER
            this.player.draw()
            
            //DRAW FIRE
            this.fire.draw()

            window.requestAnimationFrame(loop)
        }
        window.requestAnimationFrame(loop)
    }
}