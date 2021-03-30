<template>
  <div id="app">
    <canvas id="canvas" />
  </div>
</template>

<script>
import Delaunator from 'delaunator';

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
    var coordsList = [];
    // const filllist = ['#f00', '#0f0', '#00f', '#f0f'];


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
    coordsList.push([b1.x, b1.y]);
    ptsList.push(b1);
    const b2 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    coordsList.push([b2.x, b2.y]);
    ptsList.push(b2);
    const b3 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    coordsList.push([b3.x, b3.y]);
    ptsList.push(b3);
    const b4 = new Ball(randomNumber(0,canvas.width), randomNumber(0,canvas.height), randomNumber(-.5, .5), randomNumber(-.5, .5));
    coordsList.push([b4.x, b4.y]);
    ptsList.push(b4);

    // Corners
    const br = new Ball(canvas.width, canvas.height, 0, 0);
    coordsList.push([br.x, br.y]);
    ptsList.push(br);
    const bl = new Ball(0, canvas.height, 0, 0);
    coordsList.push([bl.x, bl.y]);
    ptsList.push(bl);
    const tr = new Ball(canvas.width, 0, 0, 0);
    coordsList.push([tr.x, tr.y]);
    ptsList.push(tr);
    const tl = new Ball(0, 0, 0, 0);
    coordsList.push([tl.x, tl.y]);
    ptsList.push(tl);

    function getX(i) {
      return coordsList[i][0];
    }

    function getY(i) {
        return coordsList[i][1];
    }
    
    function updateCoords() {
      coordsList.length = 0;
      for (let i=0; i < ptsList.length; i++) {
        coordsList.push([ptsList[i].x, ptsList[i].y]);
      }
    }


    function drawPolygon(x1, y1, x2, y2, x3, y3) {
      console.log("drawing");
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.fill();
    }

    function getTriangles(coords) {
      var delauny = Delaunator.from(coords);
      var triangles = delauny.triangles;
      for (let i=0; i < triangles.length; i+=3) {
        drawPolygon(getX(triangles[i]), getY(triangles[i]), getX(triangles[i+1]), getY(triangles[i+1]), getX(triangles[i+2]), getY(triangles[i+2]));
      }
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i=0; i < ptsList.length; i+=2) {
          ptsList[i].drawBall();
        }

        updateCoords();
        getTriangles(coordsList);
        // drawPolygon(bl.x, bl.y, tl.x, tl.y, b1.x, b3.y);
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