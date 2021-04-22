export default class Planet {
    constructor(x, y, dx, dy, mass, id, freeze, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ax = 0;
        this.ay = 0;
        this.mass = mass;
        this.radius = 3; // make some function of mass
        this.id = id;
        this.freeze = freeze;
        this.trail = [];
        this.trailPos = 0;
        this.flipper = true;
        this.color = color;
    }

    moveTowards(planetList, G) {
        // reset
        this.ax = 0;
        this.ay = 0;

        if (this.freeze) {
            this.dx = 0;
            this.dy = 0;
            return;
        }

        for (let i=0; i < planetList.length; i++) {
            if (this.id == planetList[i].id) {
                continue;
            }
            
            const deltaX = this.x - planetList[i].x;
            const deltaY = this.y - planetList[i].y;
            const angle = Math.abs(Math.atan(deltaY / deltaX));
            const r = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            const force = G * planetList[i].mass / r;
        
            this.ax += -Math.sign(deltaX) * force * Math.cos(angle);   
            this.ay += -Math.sign(deltaY) * force * Math.sin(angle);
            this.dx += this.ax;
            this.dy += this.ay;
            this.x += this.dx;
            this.y += this.dy;
        }

        this.flipHelper();        

        if (this.checkDestroy(planetList)) {
            let i = planetList.indexOf(this);
            planetList.splice(i, 1);
        }

        if (this.trailPos == 500) {
            this.trailPos = 0;
        }

    } 

    checkDestroy(planetList) {
        for (let i = 0; i < planetList.length; i++) {
            return ((this.x == planetList[i].x && this.y == planetList[i].y) && this.id != planetList[i].id);
        }
    }

    flipHelper() {
        if (this.flipper == true) {
            this.trail[this.trailPos] = [this.x, this.y];
            this.trailPos++;
        }
        this.flipper ^= true; // toggle
    }
}



