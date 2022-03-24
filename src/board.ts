import { Body } from './body';

export class Board {
    public cnv: HTMLCanvasElement | null = null;
    public ctx: CanvasRenderingContext2D | null = null;
    public cw = 0;
    public ch = 0;
    public id: ImageData | null = null;

    init(width: number, height: number) {
        this.cw = width;
        this.ch = height;
        this.cnv = document.getElementById('canvas') as HTMLCanvasElement;
        if (!this.cnv) return;
        this.cnv.width = this.cw;
        this.cnv.height = this.ch;
        this.ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;
        this.id = this.ctx.getImageData(0, 0, 1, 1);
        this.id.data[3] = 255; //alpha
        this.clear();
    }

    clear() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.cw, this.ch);
    }

    draw(bodies: Body[]) {
        if (!this.ctx || !this.id) return;
        const ctx = this.ctx;
        const id = this.id;
        bodies.forEach((b: Body) => {
            id.data[0] = b.r;
            id.data[1] = b.g;
            id.data[2] = b.b;
            ctx.putImageData(id, b.x, b.y);
        });
    }
}
