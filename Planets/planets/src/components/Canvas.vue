<template>
    <div>
        <div id="align">
            <div id="list">
                <List v-bind:planetList='planetList' v-on:emitter="emitHelper($event)"/>
            </div>
            <canvas id="canvas" v-on:click="createPoints(1)"/>
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
            sunID: 1,
        }
    },

    methods: {
        randomNumber(min, max) {  
            return Math.random() * (max - min) + min; 
        },
        
        createPoints(num) {
            // will evenually be called on mouse click and will handle sizes (mouse hold or scroll)
            for (let i=0; i < num; i++) {
                let x = event.clientX;
                let y = event.clientY;
                this.planetList.push(new Planet(x, y, this.randomNumber(-2, 2), this.randomNumber(-2, 2), Math.floor(this.randomNumber(10, 1000)), this.id, false, this.colors[Math.floor(Math.random() * this.colors.length)]));
                // this.planetList.push(new Planet(this.width/2, 400, 0, 0, 1000, this.id));
                // this.planetList.push(new Planet(this.width/2, 800, .1, 0, 1, this.id +1));
                // this.planetList.push(new Planet(this.width/2, 600, .5, 0, 10, this.id +2));
                this.id++;
            }
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
            else {
                this.ctx.fillText("Planet " + planet.id, planet.x + planet.radius + 5, planet.y + planet.radius);
            }
            
            this.ctx.fillText("Mass: " + planet.mass, planet.x + planet.radius + 5, planet.y + planet.radius + 15);

        },

        emitHelper(data) {

            switch(data[0]) {
                case 1:
                    this.freezeSun();
                    break;
                case 2:
                    for (let i=0; i <  this.planetList.length; i++) {
                        if (this.planetList[i].id == data[1]) {
                            this.planetList[i].destroy();
                        }
                    }
                    break;

                default:
                    console.log("wrong code emitted: " + data[0]);
            }


        },

        freezeSun() {
            console.log("success");
            for (let i=0; i < this.planetList.length; i++) {
                if (this.planetList[i].mass > this.sunMass) {
                    this.planetList[i].freeze = !this.planetList[i].freeze;
                }
            }
        },

        draw() { // TODO: colored dots per planet
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
                this.drawVector(this.planetList[i]);
                this.drawLabel(this.planetList[i]);
                for (let j=0; j<this.planetList[i].trail.length; j++) {
                    this.ctx.fillStyle = this.planetList[i].color;
                    this.ctx.beginPath();
                    this.ctx.arc(this.planetList[i].trail[j][0], this.planetList[i].trail[j][1], this.planetList[i].radius / 2, 0, Math.PI * 2, false);
                    this.ctx.fill();
                }
            }
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
            // this.createPoints(1); 
            
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