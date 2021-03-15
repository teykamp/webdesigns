<template>
  <div id="app">
    <canvas id="canvas" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: "",
    }
  },
  mounted() {
    function randomNumber(min, max) {  
        return Math.random() * (max - min) + min; 
    }

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight-20;
    canvas.width = window.innerWidth-20;
    var ballRadius = 5;
    var x = randomNumber(0,canvas.width);
    var y = randomNumber(0,canvas.height);
    var dx = randomNumber(-.5, .5)
    var dy = randomNumber(-.5, .5)

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        // drawPolygon();
        
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }
        
        x += dx;
        y += dy;
    }

    setInterval(draw, 10);

  },

  methods() {
    
  },

  computed() {

  },
}
</script>



<style>


</style>