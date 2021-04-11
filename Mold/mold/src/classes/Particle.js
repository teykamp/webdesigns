export default class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
    }
    
    getCoords(height, width) { 
        if (this.x + this.dx > width - this.size || this.x + this.dx < this.size) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy > height - this.size || this.y + this.dy < this.size) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        return [this.x, this.y];
    }
}



