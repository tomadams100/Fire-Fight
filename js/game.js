const fireman_image = new Image()
fireman_image.src = "/img/fireman.png"
const water_bottle_full_image = new Image()
water_bottle_full_image.src = "/img/water_bottles/water-bottle-full.png"
const water_bottle_third_empty_image = new Image()
water_bottle_third_empty_image.src = "/img/water_bottles/water-bottle-third-empty.png"
const water_bottle_twothirds_empty_image = new Image()
water_bottle_twothirds_empty_image.src = "/img/water_bottles/water-bottle-twothirds-empty.png"
const water_bottle_empty_image = new Image()
water_bottle_empty_image.src = "/img/water_bottles/water-bottle-empty.png"
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
        this.waterArray = []
        this.extraWaterArray = []
        this.temp = 0
        this.waterRemaining = 300
        this.waterFull = 300
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
            this.fireArray.forEach(fire => {
                fire.draw()
            })
            //CREATE EXTRA WATER
            this.generateExtraWater()
            //DRAW EXTRA WATER
            this.extraWaterArray.forEach(extraWater => {
                extraWater.draw()
            })
            //CALCULATE TEMP
            this.temp = this.fireArray.length * 5
            //DRAW TEMP
            this.ctx.font = "bold 45px arial"
            this.ctx.fillStyle = "red"
            this.ctx.fillText(`${this.temp}\xB0C`, 20, 40)
            //CREATE WATER
            if(Math.random()>0.9) {
                this.waterArray.push(new Water(this.canvas,this.player.angle,this.fireArray, this.extraWaterArray))
                this.waterRemaining -= 1 //every time you make a water, the amount of water left (ie in our water tank) decreases
            }
            this.waterArray.forEach((water,i) => { 
                water.update()
                water.draw()
                water.checkCollision()
                water.checkCollisionWithExtraWater()
                if (water.checkWalls()) { // Checks to see if water is outside the canvas
                    this.waterArray.splice(i,1)
                }
            })
            //DRAW WATER REMAINING
            if (this.waterRemaining/this.waterFull > 0.66) {
                this.ctx.drawImage(water_bottle_full_image,40,370,100,120)
            } else if (this.waterRemaining/this.waterFull > 0.33) {
                this.ctx.drawImage(water_bottle_third_empty_image,40,370,100,120)
            } else if (this.waterRemaining/this.waterFull > 0.1) {
                this.ctx.drawImage(water_bottle_twothirds_empty_image,40,370,100,120)
            } else {
                this.ctx.drawImage(water_bottle_empty_image,40,370,100,120)
            }
            //CHECK AMOUNT OF FIRE
            this.checkAmountOfFire()
            //CHECK AMOUNT OF WATER
            this.checkAmountOfWater()
            if (this.isGameOver===false) {
                window.requestAnimationFrame(loop)
            } else {
                buildGameOver()
            }
        }
        window.requestAnimationFrame(loop)
    }
    generateFire() {      
        if(Math.random()>0.96) {
            let ranX = Math.random()*((this.canvas.width - 80) - 400) + 400 //(max - min) + min
            let ranY = Math.random()*(380 - 20) + 20
            this.fireArray.push(new Fire(this.canvas,ranX,ranY,this.waterArray))
        }
    }
    generateExtraWater() {      
        if(Math.random()>0.995) {
            let ranX = Math.random()*((this.canvas.width - 80) - 400) + 400 //(max - min) + min
            let ranY = Math.random()*(450 - 445) + 445
            this.extraWaterArray.push(new ExtraWater(this.canvas,ranX,ranY,this.waterArray))
        }
    }

    checkAmountOfFire() {
        if(this.fireArray.length > 30) this.isGameOver = true
    }
    checkAmountOfWater() {
        if(this.waterRemaining <= 0) this.isGameOver = true
    }
}