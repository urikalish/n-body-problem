export class Body {
    public x = 0;
    public y = 0;
    public vx = 0;
    public vy = 0;
    public ax = 0;
    public ay = 0;
    public s = 0;
    public r = 0;
    public g = 0;
    public b = 0;

    constructor(x: number, y: number, vx: number, vy: number, ax: number, ay: number, s: number, r: number, g: number, b: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.s = s;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
