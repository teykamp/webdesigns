export default class Planet {
    constructor(x, y, dx, dy, mass) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.mass = mass;
        this.radius = 10; // make some function of mass
    }

    moveTowards(planetList) {
        for (let i=0; i < planetList.length; i++) {
            const deltaX = this.x - planetList[i].x;
            const deltaY = this.y - planetList[i].y;
            const force = this.mass * planetList[i].mass / Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
            this.dx += force / this.mass;
            this.dy += force / this.mass;
        }
        if (this.checkDestroy(planetList)) {
            this.radius = 0;
            this.mass = 0;
            this.x = 0;
            this.y = 0;
        }
        // this.x += this.dx;
        // this.y += this.dy;
    } 

    checkDestroy(planetList) {
        for (let i = 0; i < planetList.length; i++) {
            return (this.x == planetList[i].x && this.y == planetList[i].x);
        }
    }
}



