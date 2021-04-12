export default class Planet {
    constructor(x, y, dx, dy, mass) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.mass = mass;
        this.size = 10; // make some function of mass
    }

    updateCoords() {
        return;
    } 
}



