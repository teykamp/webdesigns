<template>
    <div>
        <canvas id="canvas"/>
    </div>
</template>

<script>
// https://stackoverflow.com/questions/3420975/html5-canvas-zooming
import Planet from "../classes/Planet.js";

export default {
    data() {
        return {
            ctx: null,
            height: 0,
            width: 0,
            planetList: [],
            size: 500,
            id: 1,
            G : 0.002,
        }
    },

    methods: {
        randomNumber(min, max) {  
            return Math.random() * (max - min) + min; 
        },
        
        createPoints(num) {
            // will evenually be called on mouse click and will handle sizes (mouse hold or scroll)
            for (let i=0; i < num; i++) {
                this.planetList.push(new Planet(this.randomNumber(50, this.width-50), this.randomNumber(50, this.height-50), this.randomNumber(-2, 2), this.randomNumber(-2, 2), 10, this.id, false));
                // this.planetList.push(new Planet(this.width/2, 400, 0, 0, 1000, this.id));
                // this.planetList.push(new Planet(this.width/2, 800, .1, 0, 1, this.id +1));
                // this.planetList.push(new Planet(this.width/2, 600, .5, 0, 10, this.id +2));
                this.id++;
            }
        },

        drawVector(planet) {
            // not for sun
            if (planet.id == 0) {
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

        draw() { // TODO: colored dots per planet
            this.ctx.clearRect(0, 0, this.width, this.height)
            for (let i=0; i < this.planetList.length; i++) {
                // for (let k=0; k < this.planetList.length; k++) {
                //     this.ctx.strokeStyle = "black";
                //     this.ctx.beginPath();
                //     this.ctx.moveTo(this.planetList[i].x, this.planetList[i].y);
                //     this.ctx.lineTo(this.planetList[k].x, this.planetList[k].y);
                //     this.ctx.stroke();
                // }
                this.planetList[i].moveTowards(this.planetList, this.G);
                this.ctx.beginPath();
                this.ctx.arc(this.planetList[i].x, this.planetList[i].y, this.planetList[i].radius, 0, Math.PI * 2, false);
                this.ctx.fillStyle = "black";
                this.ctx.fill();
                this.drawVector(this.planetList[i]);
                for (let j=0; j<this.planetList[i].trail.length; j++) {
                    this.ctx.beginPath();
                    this.ctx.arc(this.planetList[i].trail[j][0], this.planetList[i].trail[j][1], this.planetList[i].radius / 2, 0, Math.PI * 2, false);
                    this.ctx.fill();
                }
            }
        },

        init() {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
            canvas.height = window.innerHeight-50;
            this.height = canvas.height;
            canvas.width = innerWidth-50;
            this.width = canvas.width;
            this.planetList.push(new Planet(this.width/2, this.height/2, 0, 0, 10000, 0, false)); // sun
            this.createPoints(1); 

            setInterval(this.draw, 10);
        },

    },

    mounted() {
        this.init();
    },

}

</script>

<style scoped>

</style>