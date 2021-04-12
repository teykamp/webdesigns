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
            size: 5,
        }
    },

    methods: {
        randomNumber(min, max) {  
            return Math.random() * (max - min) + min; 
        },
        
        createPoints(num) {
            // will evenually be called on mouse click and will handle sizes (mouse hold or scroll)
            for (let i=0; i < num; i++) {
                this.planetList.push(new Planet(this.randomNumber(500, this.width-(this.size)-500), this.randomNumber(0, this.height-(this.size*10)), this.randomNumber(-10, 10), this.randomNumber(-10, 10), this.size));
            }
        },

        draw() {
            this.ctx.clearRect(0, 0, this.width, this.height)
            for (let i=0; i < this.planetList.length; i++) {
                this.planetList[i].moveTowards(this.planetList);
                this.ctx.beginPath();
                this.ctx.arc(this.planetList[i].x, this.planetList[i].y, this.planetList[i].radius, 0, Math.PI * 2, false);
                this.ctx.fillStyle = "blue";
                this.ctx.fill();
            }
        },

        init() {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
            canvas.height = window.innerHeight-50;
            this.height = canvas.height;
            canvas.width = innerWidth-50;
            this.width = canvas.width;
            this.planetList.push(new Planet(this.width/2, this.height/2, 0, 0, 100000000)) // sun
            this.createPoints(2);

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