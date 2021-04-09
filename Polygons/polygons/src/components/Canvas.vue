<template>
  <div id="app">
    <canvas id="canvas" />
    <div class="tools">
      <button @click="shadeFlip()">Change Shading</button>
      <button @click="moveFlip()">Change Movement</button>
      <button>Kaleidescope</button>
    </div>
  </div>
</template>

<script>
import Delaunator from 'delaunator';

export default {
  data() {
    return {
      timer: "",
      moveType: "bounce",
      shadeType: "area",
      ptsList: [],
      coordsList: [],
      hue: 1,
      tickSpeed: 10,
    }
  },
  
  methods: { // TODO: Format functions
    shadeFlip() {
      this.shadeType = (this.shadeType == "location" ? "area" : "location");
    },

    moveFlip() {
      this.moveType = (this.moveType == "circle" ? "bounce" : "circle"); // TODO: fix speeding up after several toggles. FIXED: current fix is horrible
      this.tickSpeed += 100;
      this.ptsList.length = 0;
      this.coordsList.length = 0;
      this.controller();
    },

    randomNumber(min, max) {  
      return Math.random() * (max - min) + min; 
    },

    controller() {
      // admin
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      canvas.height = window.innerHeight-45;
      canvas.width = window.innerWidth-20;
      const ballRadius = 0;
      var self = this; // TODO: find better way (Wont recognise self. inside of other functions)


      class Ball {
        constructor(x, y, dx, dy) {
          this.x = x;
          this.y = y;
          this.dx = dx; // r for circle movement
          this.dy = dy; // dtheta for circle movement
        }

        drawBall(type) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
          ctx.fillStyle = "#000";
          ctx.fill();
          ctx.closePath();

          if (type == "bounce") {
            if (this.x + this.dx > canvas.width-ballRadius || this.x + this.dx < ballRadius) {
                this.dx = -this.dx;
            }
            if (this.y + this.dy > canvas.height-ballRadius || this.y + this.dy < ballRadius) {
                this.dy = -this.dy;
            }
            
            this.x += this.dx;
            this.y += this.dy;
          }

          else if (type == "circle") {
            let x = this.x;
            let y = this.y;
            if (this.dy == 0) {
              return;
            }
            this.x = x + (this.dx * Math.cos(this.dy));
            this.y = y + (this.dx * Math.sin(this.dy));
            if (this.dy >= 0) {
              this.dy += .001;
            }
            else {
              this.dy -= .001;
            }
          }

          else {
            console.log("Incorrect movement type passed: " + type);
          }
        }
      }

      function createPoints(num) {
        for (let i=0; i < num; i++) {
          // for bounce movement: x, y, dx, dy
          // for circle movement: x, y, r, dtheta
          self.ptsList[i] = new Ball(self.randomNumber(0,canvas.width), self.randomNumber(0,canvas.height), self.randomNumber(-.5, .5), self.randomNumber(-.5, .5));
          self.coordsList.push(self.ptsList[i].x, self.ptsList[i].y);
        }
        // Corners and l/r sides
        const br = new Ball(canvas.width, canvas.height, 0, 0);
        self.coordsList.push([br.x, br.y]);
        self.ptsList.push(br);
        const bl = new Ball(0, canvas.height, 0, 0);
        self.coordsList.push([bl.x, bl.y]);
        self.ptsList.push(bl);
        const tr = new Ball(canvas.width, 0, 0, 0);
        self.coordsList.push([tr.x, tr.y]);
        self.ptsList.push(tr);
        const tl = new Ball(0, 0, 0, 0);
        self.coordsList.push([tl.x, tl.y]);
        self.ptsList.push(tl);
        const ml = new Ball(0, canvas.height/2, 0, 0);
        self.coordsList.push([ml.x, ml.y]);
        self.ptsList.push(ml);
        const mr = new Ball(canvas.width, canvas.height/2, 0, 0);
        self.coordsList.push([mr.x, mr.y]);
        self.ptsList.push(mr);
      }

      function getX(i) {
        return self.coordsList[i][0];
      }

      function getY(i) {
          return self.coordsList[i][1];
      }
      
      function updateCoords() {
        self.coordsList.length = 0;
        for (let i=0; i < self.ptsList.length; i++) {
          self.coordsList.push([self.ptsList[i].x, self.ptsList[i].y]);
        }
      }

      function drawPolygon(x1, y1, x2, y2, x3, y3, color) {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x1, y1);
        ctx.closePath();
        ctx.fill();
      }

      function getHue(hue) { // TODO: allow user to specify color or to use this function
        if (hue == 256) {
          return 1;
        }
        return hue+=0.1;
      }
      
      function getColorArea(area, hue) {
        // called when type == area
        // example return hsl(170,100%,50%)
        return `hsl(${hue}, ${area/1000 % 200}%, ${area/1000 % 200}%)`; // TODO: Fix Colors
      }

      function getColorLocation(posY, hue) {
        // called when type == location
        return `hsl(${hue}, ${posY/10 % 100}%, ${posY/10 % 100}%)`; // TODO: Fix Colors
      }

      function getArea(x1, y1, x2, y2, x3, y3) {
        // must be -1 to make area positive
        return -1 * 0.5 * ((x1 * (y2-y3)) + (x2 * (y3-y1)) + (x3 * (y1-y2)));
      }

      function getTriangles(coords, type, currentHue) {
        var delauny = Delaunator.from(coords);
        var triangles = delauny.triangles;
        for (let i=0; i < triangles.length; i+=3) {
          if (type == "area") {
            drawPolygon(getX(triangles[i]), getY(triangles[i]), getX(triangles[i+1]), getY(triangles[i+1]), getX(triangles[i+2]), getY(triangles[i+2]), 
                        getColorArea(getArea(getX(triangles[i]), getY(triangles[i]), getX(triangles[i+1]), getY(triangles[i+1]), getX(triangles[i+2]), getY(triangles[i+2])), currentHue)
                        );
          }

          else if (type == "location") {
            drawPolygon(getX(triangles[i]), getY(triangles[i]), getX(triangles[i+1]), getY(triangles[i+1]), getX(triangles[i+2]), getY(triangles[i+2]), 
                        getColorLocation(Math.min(getY(triangles[i]), getY(triangles[i+1]), getY(triangles[i+2])), currentHue)
                        );
          }

          else {
            console.log("Incorrect shade type passed: " + type);
          }
        }
      }
      
      function draw(moveType, shadeType) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let i=0; i < self.ptsList.length; i+=1) {
            // movement types: bounce, circle
            self.ptsList[i].drawBall(moveType);
          }

          updateCoords();
          // shading types: area, location
          // startHue = 1
          getTriangles(self.coordsList, shadeType, self.hue);
          self.hue = getHue(self.hue)
          // drawPolygon(bl.x, bl.y, tl.x, tl.y, b1.x, b3.y);
      }

      createPoints(50); // TODO: make this changable??
      setInterval(function() { draw(self.moveType, self.shadeType) }, self.tickSpeed);
    }

  },
  mounted() {
    this.controller();

  },
}
</script>

<style>


</style>