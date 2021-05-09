<template>
    <div>
        <!-- <p>{{drawSling}}</p> -->
        <div id="align">
            <div id="list">
                <List v-bind:planetList='planetList' v-on:emitter="emitHelper($event)"/>
            </div>
            <canvas id="canvas" v-on:mousedown="mouseDown()" v-on:mouseup="mouseUp()"/>
        </div>
    </div>
</template>

<script>
import Planet from "../classes/Planet.js";
import List from "./List.vue";

export default {
    name: 'Canvas',
    components: {
        List,
    },
    data() {
        return {
            ctx: null,
            height: 0,
            width: 0,
            planetList: [],
            size: 500,
            id: 2,
            G: 0.002,
            colors: ["red", "green", "blue", "orange", "yellow", "purple", "white"],
            sunMass: 5000,
            moonMass: 500,
            sunID: 1,
            x1: 0,
            y1: 0,
            drawSling: false,
            drawVec: false,
        }
    },

    methods: {
        randomNumber(min, max) {  
            return Math.random() * (max - min) + min; 
        },

        mouseDown() {
            this.x1 = event.clientX;
            this.y1 = event.clientY;
            this.drawSling = true;
        },

        mouseUp() {
            const x2 = event.clientX;
            const y2 = event.clientY;
            const xdif = (this.x1 - x2) / 10;
            const ydif = (this.y1 - y2) / 10;

            this.createPlanet(this.x1, this.y1, xdif, ydif, Math.floor(this.randomNumber(10, 1500)))
            this.drawSling = false;
        },
        
        createPlanet(x, y, xvel, yvel, mass) {
            this.planetList.push(new Planet(x, y, xvel, yvel, mass, this.id, false, this.colors[Math.floor(Math.random() * this.colors.length)]));
            // this.planetList.push(new Planet(this.width/2, 400, 0, 0, 1000, this.id));
            // this.planetList.push(new Planet(this.width/2, 800, .1, 0, 1, this.id +1));
            // this.planetList.push(new Planet(this.width/2, 600, .5, 0, 10, this.id +2));
            this.id++;
        },

        drawSlingLine() {
            document.addEventListener('mousemove', (event) => {
                this.ctx.strokeStyle = "white";
                this.ctx.beginPath();
                this.ctx.moveTo(this.x1, this.y1);
                this.ctx.lineTo(event.clientX, event.clientY);
                this.ctx.stroke();
            });
            
        },

        drawVector(planet) {
            // not for sun
            if (planet.id == this.sunID) {
                return;
            }
            const aMagnitude = Math.sqrt(Math.pow(planet.ax, 2) + Math.pow(planet.ay, 2));
            const vMagnitude = Math.sqrt(Math.pow(planet.dx, 2) + Math.pow(planet.dy, 2));
            this.ctx.strokeStyle = "red";
            this.ctx.beginPath();
            this.ctx.moveTo(planet.x, planet.y);
            this.ctx.lineTo(planet.x + planet.ax/aMagnitude * 50, planet.y + planet.ay/aMagnitude * 50);
            this.ctx.stroke();
            this.ctx.strokeStyle = "green";
            this.ctx.beginPath();
            this.ctx.moveTo(planet.x, planet.y);
            this.ctx.lineTo(planet.x + planet.dx/vMagnitude * 50, planet.y + planet.dy/vMagnitude * 50);
            this.ctx.stroke();
        },
        
        drawLabel(planet) {
            this.ctx.fillStyle = "white";
            this.ctx.font = "10px Arial";
            if (planet.mass > this.sunMass) {
                this.ctx.fillText("Sun " + planet.id, planet.x + planet.radius + 5, planet.y + planet.radius);
            }

            else if (planet.mass < this.moonMass) {
                this.ctx.fillText("Moon " + planet.id, planet.x + planet.radius + 5, planet.y + planet.radius);
            }

            else {
                this.ctx.fillText("Planet " + planet.id, planet.x + planet.radius + 5, planet.y + planet.radius);
            }
            
            this.ctx.fillText("Mass: " + planet.mass, planet.x + planet.radius + 5, planet.y + planet.radius + 15);

        },

        emitHelper(emitted) {

            switch(emitted[0]) {
                case 2: { // delete
                    for (let i=0; i <  this.planetList.length; i++) {
                        if (this.planetList[i].id == emitted[1]) {
                            this.planetList[i].destroy();
                        }
                    }
                    break;
                }
                case 3: { // freeze
                    for (let i=0; i <  this.planetList.length; i++) {
                        if (this.planetList[i].id == emitted[1]) {
                            this.planetList[i].freeze = !this.planetList[i].freeze;
                        }
                    }
                    break;
                }
                case 4: { // reset
                    this.planetList = [];
                    // sun
                    this.planetList.push(new Planet(this.width / 2, this.height / 2, 0, 0, 10000, 1, false, "white"));
                    this.id = 2;
                    break;
                }
                case 5: { // recenter
                    if (this.planetList.length == 0) {
                        break;
                    }
                    let mostMassive;
                    for (let i=0; i <  this.planetList.length; i++) {
                        if (!mostMassive) {
                            mostMassive = this.planetList[i];
                        }
                        else if (this.planetList[i].mass > mostMassive.mass) {
                            mostMassive = this.planetList[i];
                        }
                    }
                    const xOffset = this.width/2 - mostMassive.x;
                    const yOffset = this.height/2 - mostMassive.y; 
                    for (let i=0; i <  this.planetList.length; i++) {
                        if (this.planetList[i].id != -1) {
                            this.planetList[i].x += xOffset;
                            this.planetList[i].y += yOffset;
                            this.planetList[i].trail = [];
                            this.planetList[i].trailPos = 0;
                        }
                    }
                    break;
                }
                case 6: { // vectors
                    this.drawVec = !this.drawVec;
                    break;
                }

                default: {
                    console.log("wrong code emitted: " + emitted[0]);
                }
            }
        },

        freezeSun() {
            for (let i=0; i < this.planetList.length; i++) {
                if (this.planetList[i].mass > this.sunMass) {
                    this.planetList[i].freeze = !this.planetList[i].freeze;
                }
            }
        },

        draw() {
            this.ctx.clearRect(0, 0, this.width, this.height)
            for (let i=0; i < this.planetList.length; i++) {
                // for (let k=0; k < this.planetList.length; k++) {
                //     this.ctx.strokeStyle = "white";
                //     this.ctx.beginPath();
                //     this.ctx.moveTo(this.planetList[i].x, this.planetList[i].y);
                //     this.ctx.lineTo(this.planetList[k].x, this.planetList[k].y);
                //     this.ctx.stroke();
                // }
                this.planetList[i].maxID = this.id;
                this.planetList[i].moveTowards(this.planetList, this.G);
                this.ctx.beginPath();
                this.ctx.arc(this.planetList[i].x, this.planetList[i].y, this.planetList[i].radius, 0, Math.PI * 2, false);
                this.ctx.fillStyle = this.planetList[i].color;
                this.ctx.fill();
                if (this.drawVec) {
                    this.drawVector(this.planetList[i]);
                }
                this.drawLabel(this.planetList[i]);
               
                for (let j=0; j<this.planetList[i].trail.length; j++) {
                    this.ctx.fillStyle = this.planetList[i].color;
                    this.ctx.beginPath();
                    this.ctx.arc(this.planetList[i].trail[j][0], this.planetList[i].trail[j][1], this.planetList[i].radius / 2, 0, Math.PI * 2, false);
                    this.ctx.fill();
                }
            }

            // if (this.drawSling == false) {
            //     this.drawSlingLine();
            // }

        },

        init() {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
            canvas.height = window.innerHeight-10;
            this.height = canvas.height;
            canvas.width = innerWidth-10;
            this.width = canvas.width;
            // sun
            this.planetList.push(new Planet(this.width/2, this.height/2, 0, 0, 10000, 1, false, "white")); 
            setInterval(this.draw, 10);
        },

    },

    mounted() {
        this.init();
    },
}
</script>

<style scoped>
#canvas {
    position: absolute;
    /* background: darkkhaki; */
    z-index: -999;
}
#list {
    position: absolute;
}

</style>