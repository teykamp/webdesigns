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
            for (let i=0; i < num; i++) {
                this.planetList.push(new Planet(this.randomNumber(0, this.width-this.size), this.randomNumber(0, this.height-this.size), this.randomNumber(-.5, .5), this.randomNumber(-.5, .5), this.size));
            }
        },

        draw() {
            this.ctx.clearRect(0, 0, this.width, this.height)
            for (let i=0; i < this.planetList.length; i++) {
                this.planetList[i].updateCoords(this.height, this.width, this.planetList);
                this.ctx.fillStyle = 'green';
                this.ctx.fillRect(this.planetList[i].x, this.planetList[i].y, this.planetList[i].size, this.planetList[i].size);
            }
        },

        init() {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
            canvas.height = window.innerHeight-50;
            this.height = canvas.height;
            canvas.width = innerWidth-50;
            this.width = canvas.width;
            // sun
            this.planetList.push(new Planet(this.width/2, this.height/2, 0, 0, 1000))
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