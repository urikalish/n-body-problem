import { Body } from './body';

export class Board {
    public cnv: HTMLCanvasElement | null = null;
    public ctx: CanvasRenderingContext2D | null = null;
    public cw = 0;
    public ch = 0;
    // public id: ImageData | null = null;

    init(width: number, height: number) {
        this.cw = width;
        this.ch = height;
        this.cnv = document.getElementById('canvas') as HTMLCanvasElement;
        if (!this.cnv) return;
        this.cnv.width = this.cw;
        this.cnv.height = this.ch;
        this.ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;
        // this.id = this.ctx.getImageData(0, 0, 1, 1);
        // this.id.data[3] = 255; //alpha
        // this.clear();
    }

    clear() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.cw, this.ch);
    }

    draw(bodies: Body[]) {
        if (!this.ctx) return;
        const ctx = this.ctx;
        bodies.forEach((b: Body) => {
            b.b = Math.min(255, b.vx ** 2 + b.vy ** 2);
            ctx.fillStyle = `rgb(${b.r},${b.g},${b.b})`;
            ctx.fillRect(b.x, b.y, b.s, b.s);
        });
    }
}
