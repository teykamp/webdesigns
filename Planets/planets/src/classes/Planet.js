export default class Planet {
    constructor(x, y, dx, dy, mass, id) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ax = 0;
        this.ay = 0;
        this.mass = mass;
        this.radius = 1; // make some function of mass
        this.id = id;
    }

    moveTowards(planetList, G) {
        for (let i=0; i < planetList.length; i++) {
            if (this.id == planetList[i].id) {
                continue;
            }
            
            const deltaX = this.x - planetList[i].x;
            const deltaY = this.y - planetList[i].y;
            const angle = Math.abs(Math.atan(deltaY / deltaX));
            // console.log(angle * 180 / Math.PI)
            const r2 = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
            const force = G * planetList[i].mass / r2;
        
            this.ax -= Math.sign(deltaX) * force * Math.cos(angle);   
            this.ay -= Math.sign(deltaY) * force * Math.sin(angle);
            this.dx += this.ax;
            this.dy += this.ay;
            this.x += this.dx;
            this.y += this.dy;
        }
        if (this.checkDestroy(planetList)) {
            this.radius = 0;
            this.mass = 0;
            this.x = 0;
            this.y = 0;
        }
        
    } 

    checkDestroy(planetList) {
        for (let i = 0; i < planetList.length; i++) {
            return ((this.x == planetList[i].x && this.y == planetList[i].y) && this.id != planetList[i].id);
        }
    }
}



