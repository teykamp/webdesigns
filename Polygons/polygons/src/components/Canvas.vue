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

    // admin
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight-20;
    canvas.width = window.innerWidth-20;
    const ballRadius = 5;

    class Ball {
      constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
      }

      drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.closePath();
        if(this.x + this.dx > canvas.width-ballRadius || this.x + this.dx < ballRadius) {
            this.dx = -this.dx;
        }
        if(this.y + this.dy > canvas.height-ballRadius || this.y + this.dy < ballRadius) {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
      }
    }
    const b1 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    const b2 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    const b3 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));

    function drawPolygon(obj1, obj2, obj3) {
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.moveTo(obj1.x, obj1.y);
      ctx.lineTo(obj2.x, obj2.y);
      ctx.lineTo(obj3.x, obj3.y);
      ctx.lineTo(obj1.x, obj1.y);
      ctx.closePath();
      ctx.fill();

    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        b1.drawBall();
        b2.drawBall();
        b3.drawBall();
        drawPolygon(b1, b2, b3);
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