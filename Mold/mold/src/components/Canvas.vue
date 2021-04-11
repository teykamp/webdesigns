<template>
    <div>
        <canvas id="canvas"/>
    </div>
</template>

<script>
import Particle from "../classes/Particle.js";

export default {
    data() {
        return {
            ctx: null,
            height: 0,
            width: 0,
            ptsList: [],
            size: 10,
        }
    },

    methods: {
        randomNumber(min, max) {  
            return Math.random() * (max - min) + min; 
        },
        
        createPoints(num) {
            for (let i=0; i < num; i++) {
                this.ptsList.push(new Particle(this.width/2, this.height/2, this.randomNumber(-.5, .5), this.randomNumber(-.5, .5), this.size));
            }
        },

        draw() {
            this.ctx.clearRect(0, 0, this.width, this.height)
            for (let i=0; i < this.ptsList.length; i++) {
                let coords = this.ptsList[i].getCoords(this.height, this.width);
                this.ctx.fillStyle = 'green';
                this.ctx.fillRect(coords[0], coords[1], this.size, this.size);
            }
        },

        init() {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
            canvas.height = window.innerHeight-20;
            this.height = canvas.height;
            canvas.width = window.innerWidth-20;
            this.width = canvas.width;
            this.createPoints(10);

            setInterval(this.draw, 10);
        },

    },

    mounted() {
        this.init();
    },

}

</script>

<style scoped>
.canvas {
    border-style: 5px, solid;
}
</style>