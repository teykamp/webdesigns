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
    var ptsList = [];


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
    ptsList.push(b1);
    const b2 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    ptsList.push(b2);
    const b3 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    ptsList.push(b3);
    const b4 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    ptsList.push(b4);
    const b5 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    ptsList.push(b5);
    const b6 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    ptsList.push(b6);
    const b7 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    ptsList.push(b7);
    const b8 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    ptsList.push(b8);

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

    function findClosest(objList) {
      // defaults (TODO: Find way to not need obj defaults)
      var minDist = 99999999999999;
      var minDist2 = 99999999999999;
      var minObj = objList[0];
      var minObj2 = objList[0];

      for (var i=0; i < objList.length; i++) {
        for (var j=0; j < objList.length; j++) {
          if (objList[i] != objList[j]) {

            if (Math.pow(objList[i].x - objList[j].x, 2) + 
                Math.pow(objList[i].y - objList[j].y, 2) < minDist) {
              
              minDist2 = minDist;
              minDist = Math.pow(objList[i].x - objList[j].x, 2) + Math.pow(objList[i].y - objList[j].y, 2);
              minObj2 = minObj;
              minObj = objList[i];

            }
   
            else if (Math.pow(objList[i].x - objList[j].x, 2) + 
                     Math.pow(objList[i].y - objList[j].y, 2) < minDist2) {
              
              minDist2 = Math.pow(objList[i].x - objList[j].x, 2) + Math.pow(objList[i].y - objList[j].y, 2);
              minObj = objList[i];

            }
          }
        }
        drawPolygon(objList[i], minObj, minObj2);
      } 
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        b1.drawBall();
        b2.drawBall();
        b3.drawBall();
        b4.drawBall();
        b5.drawBall();
        b6.drawBall();
        b7.drawBall();
        b8.drawBall();
        findClosest(ptsList);
        // drawPolygon(b1, b2, b3);
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