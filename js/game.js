// test comment
const fireman_image = new Image()
fireman_image.src = "./img/newFireman.png"
const topFireman_image = new Image()
topFireman_image.src = "./img/topFireman.png"
const water_bottle_full_image = new Image()
water_bottle_full_image.src = "./img/water_bottles/water-bottle-full.png"
const water_bottle_third_empty_image = new Image()
water_bottle_third_empty_image.src = "./img/water_bottles/water-bottle-third-empty.png"
const water_bottle_twothirds_empty_image = new Image()
water_bottle_twothirds_empty_image.src = "./img/water_bottles/water-bottle-twothirds-empty.png"
const water_bottle_empty_image = new Image()
water_bottle_empty_image.src = "./img/water_bottles/water-bottle-empty.png"
const house_image = new Image()
house_image.src = "./img/house.png"
const background_image = new Image()
background_image.src = "./img/background.jpg"

class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.player = null
        this.fireArray = []
        this.waterArray = []
        this.extraWaterArray = []
        this.temp = 0
        this.waterRemaining = 1200
        this.waterFull = 1200
        this.isGameOver = false
        this.dif = 0.985
        this.rainArray = []
    }
    start(easterEgg) {
        const big_cloud = document.querySelector("#big_cloud")
        if (easterEgg == true) {
            big_cloud.classList.remove("visHide")
        }
        this.canvas = document.querySelector("canvas")
        this.ctx = canvas.getContext("2d")

        const gameBoard = document.querySelector("#game-board")
        const level_one_image = document.querySelector("#level_one")
        const level_two_image = document.querySelector("#level_two")
        const level_three_image = document.querySelector("#level_three")

        this.canvas.setAttribute("width", gameBoard.clientWidth);
        this.canvas.setAttribute("height", gameBoard.clientHeight);

        //CREATE NEW PLAYER
        this.player = new Player(this.canvas)

        //KEY PRESS UP OR DOWN, TO CHANGE ANGLE OF PLAYER
        this.handleKeyDown = (event) => {
            if(event.code === "ArrowUp" && this.player.angle >= -75) return this.player.angle -= 1
            if (event.code === "ArrowDown" && this.player.angle <= -10) return this.player.angle += 1 
            if (event.code === "Space") {
                this.waterArray.forEach(water => {
                    water.Xspeed = water.Xspeed * 1.015
                })
            }

        }
        window.addEventListener("keydown", this.handleKeyDown);

        // LEVELS (sets probability of fire creation and prints level message)
        setTimeout(() => this.setupLevel(0.985,level_one_image), 1)
        setTimeout(() => this.setupLevel(0.955,level_two_image),45000) // 45
        setTimeout(() => this.setupLevel(0.92,level_three_image),90000) //90

        this.startLoop(easterEgg)
    }
    
    setupLevel(dif,image) {
        this.dif = dif
        image.classList.remove("noShow")
        setTimeout(() => image.classList.add("noShow"),4000)
    }

    startLoop(easterEgg) {
        const loop = () => {
            //CLEAR THE CANVAS
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            //DRAW BACKGROUND
            this.ctx.drawImage(background_image,0,0,this.canvas.width,this.canvas.height)
            //DRAW THE FIREMAN
            this.ctx.drawImage(topFireman_image,(17 * this.canvas.width/100),(64 * this.canvas.height/100),(7.8*this.canvas.width/100),(16.3 * this.canvas.height/100))
            this.ctx.drawImage(fireman_image,(17 * this.canvas.width/100),(80 * this.canvas.height/100),(5.4*this.canvas.width/100),(16.3 * this.canvas.height/100))
            //DRAW THE HOUSE
            this.ctx.drawImage(house_image,(55 * this.canvas.width/100),(21 * this.canvas.height/100),(27.3*this.canvas.width/100),(73.4 * this.canvas.height/100))
            console.log("canvas.height: ", this.canvas.height)
            console.log("canvas.width: ", this.canvas.width)
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
            this.ctx.font = "bold 55px arial"
            this.ctx.fillStyle = "red"
            this.ctx.fillText(`${this.temp}\xB0C`, (5*this.canvas.width/100), (10*this.canvas.height/100))
            //CREATE WATER
            if(Math.random()>0.65) {
                this.waterArray.push(new Water(this.canvas,this.player.angle,this.fireArray, this.extraWaterArray,this.waterRemaining))
                this.waterRemaining -= 1 //every time you make a water, the amount of water left (ie in our water tank) decreases
            }
            this.waterArray.forEach((water,i) => { 
                water.update()
                water.draw()
                this.checkCollision(water,i)
                this.checkCollisionWithExtraWater(water,i)
                if (water.checkWalls()) { // Checks to see if water is outside the canvas
                    this.waterArray.splice(i,1)
                }
            })
            //DRAW RAIN DROPS from BIG CLOUD
            if (easterEgg) {
                if(Math.random()>0.65) {
                    let ranX = Math.random()*((this.canvas.width - (23*this.canvas.width/100)) - (52*this.canvas.width/100)) + (53*this.canvas.width/100) //(max - min) + min
                    let ranY = Math.random()*((85*this.canvas.height/100) - (16*this.canvas.height/100)) + (19*this.canvas.height/100)
                    this.rainArray.push(new Rain(this.canvas,this.fireArray,ranX,ranY))
                }
                this.rainArray.forEach((rain,i) => { 
                    rain.update()
                    rain.draw()
                    this.checkCollisionWithRain(rain,i)
                    if (rain.checkWalls()) { // Checks to see if water is outside the canvas
                        this.rainArray.splice(i,1)
                    }
                })
            }
            //DRAW WATER REMAINING
           /*  if (this.waterRemaining/this.waterFull > 0.66) {
                this.ctx.drawImage(water_bottle_full_image,(6 * this.canvas.width/100),(77 * this.canvas.height/100),(16 * this.canvas.height/100),(19 * this.canvas.height/100))
            } else if (this.waterRemaining/this.waterFull > 0.33) {
                this.ctx.drawImage(water_bottle_third_empty_image,(6 * this.canvas.width/100),(77 * this.canvas.height/100),(16 * this.canvas.height/100),(19 * this.canvas.height/100))
            } else if (this.waterRemaining/this.waterFull > 0.1) {
                this.ctx.drawImage(water_bottle_twothirds_empty_image,(6 * this.canvas.width/100),(77 * this.canvas.height/100),(16 * this.canvas.height/100),(19 * this.canvas.height/100))
            } else {
                this.ctx.drawImage(water_bottle_empty_image,(6 * this.canvas.width/100),(77 * this.canvas.height/100),(16 * this.canvas.height/100),(19 * this.canvas.height/100))
            } */
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
        if(Math.random()>this.dif) {
            let ranX = Math.random()*((this.canvas.width - (23*this.canvas.width/100)) - (52*this.canvas.width/100)) + (53*this.canvas.width/100) //(max - min) + min
            let ranY = Math.random()*((85*this.canvas.height/100) - (19*this.canvas.height/100)) + (19*this.canvas.height/100)
            this.fireArray.push(new Fire(this.canvas,ranX,ranY,this.waterArray))
        }
    }
    generateExtraWater() {      
        if(Math.random()>0.997) {
            let ranX = Math.random()*((this.canvas.width - (52*this.canvas.width/100)) - (37*this.canvas.width/100)) + (37*this.canvas.width/100) //(max - min) + min
            let ranY = Math.random()*((90*this.canvas.height/100) - (90*this.canvas.height/100)) + (90*this.canvas.height/100)
            this.extraWaterArray.push(new ExtraWater(this.canvas,ranX,ranY,this.waterArray))
        }
    }
    checkCollision(water,j) {
        this.fireArray.forEach((fire, i) => {
           if((water.x < fire.x + 30 && water.x > fire.x -30)&&(water.y < fire.y + 30 && water.y > fire.y -30)) {
                if (fire.strength > 0) {
                    fire.strength--
                } else {
                    this.fireArray.splice(i,1)
                    this.waterArray.splice(j,1)
                    this.waterArray.splice(j-1,1)
                    this.waterArray.splice(j+1,1)
                }
            }
        });
    }
    checkCollisionWithExtraWater(water,j) {
        this.extraWaterArray.forEach((extraWater, i) => {
            if((water.x < extraWater.x + 10 && water.x > extraWater.x -10)&&(water.y < extraWater.y + 10 && water.y > extraWater.y -10)) {
                this.extraWaterArray.splice(i,1)
                this.waterRemaining += this.waterFull/10
                this.waterArray.splice(j,1)
            }
        });
    }
    checkCollisionWithRain(rain,j) {
        this.fireArray.forEach((fire, i) => {
           if((rain.x < fire.x + 30 && rain.x > fire.x -30)&&(rain.y < fire.y + 30 && rain.y > fire.y -30)) {
                if (fire.strength > 0) {
                    fire.strength--
                } else {
                    this.fireArray.splice(i,1)
                    this.rainArray.splice(j,1)
                    this.rainArray.splice(j-1,1)
                    this.rainArray.splice(j+1,1)
                }
            }
        });
    }
    checkAmountOfFire() {
        if(this.fireArray.length > 50) this.isGameOver = true
    }
    checkAmountOfWater() {
        if(this.waterRemaining <= 0) this.isGameOver = true
    }
}