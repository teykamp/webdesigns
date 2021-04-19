<template>
    <div>
        <canvas id="canvas"/>
    </div>
</template>

<script>
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
            G : 0.00001,
        }
    },

    methods: {
        randomNumber(min, max) {  
            return Math.random() * (max - min) + min; 
        },
        
        createPoints(num) {
            // will evenually be called on mouse click and will handle sizes (mouse hold or scroll)
            for (let i=0; i < num; i++) {
                this.planetList.push(new Planet(this.randomNumber(50, this.width-50), this.randomNumber(50, this.height-50), this.randomNumber(-5, 5), this.randomNumber(-5, 5), 1, this.id));
                // this.planetList.push(new Planet(this.width/2, 400, .5, 0, 1000, this.id));
                // this.planetList.push(new Planet(this.width/2, 300, -.5, 0, 1000, this.id +1));
                this.id++;
            }
        },

        drawVector(planet) {
            const magnitude = Math.sqrt(Math.pow(planet.ax, 2) + Math.pow(planet.ay, 2));
            this.ctx.beginPath();
            this.ctx.moveTo(planet.x, planet.y);
            this.ctx.lineTo(planet.x + planet.ax/magnitude * 50, planet.y + planet.ay/magnitude * 50);
            // console.log(planet.x/magnitude);
            this.ctx.stroke();
        },

        draw() {
            // this.ctx.clearRect(0, 0, this.width, this.height)
            for (let i=0; i < this.planetList.length; i++) {
                this.planetList[i].moveTowards(this.planetList, this.G);
                this.ctx.beginPath();
                this.ctx.arc(this.planetList[i].x, this.planetList[i].y, this.planetList[i].radius, 0, Math.PI * 2, false);
                this.ctx.fillStyle = "black";
                this.ctx.fill();
                this.drawVector(this.planetList[i]);
            }
        },

        init() {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
            canvas.height = window.innerHeight-50;
            this.height = canvas.height;
            canvas.width = innerWidth-50;
            this.width = canvas.width;
            this.planetList.push(new Planet(this.width/2, this.height/2, 0, 0, 100000, 999)); // sun
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