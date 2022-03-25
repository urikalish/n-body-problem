import { Board } from './board';
import { Body } from './body';

export class Simulator {
    public isRunning = false;
    public board: Board = new Board();
    public bodies: Body[] = [];

    start(numberOfBodies: number) {
        const wrapperElm = document.getElementById('wrapper');
        if (!wrapperElm) return;
        wrapperElm.requestFullscreen({ navigationUI: 'hide' }).then(() => {
            this.board.init(wrapperElm.offsetWidth, wrapperElm.offsetHeight);
            const containerElm = document.getElementById('container');
            if (!containerElm) return;
            containerElm.classList.remove('display--none');
            document.addEventListener('keydown', ({ key }) => {
                this.onKeydown(key);
            });
            for (let i = 0; i < numberOfBodies; i++) {
                const m = Math.trunc(Math.random() * 7 + 2);
                this.bodies.push(new Body(i, Math.random() * this.board.cw, Math.random() * this.board.ch, 0, 0, 0, 0, m, m, 0, 255, 0));
            }
            this.bodies[0].x = this.board.cw / 2;
            this.bodies[0].y = this.board.ch / 2;
            this.bodies[0].m = 1000000;
            this.bodies[0].s = 1;
            this.bodies[0].g = 0;

            this.isRunning = true;
            this.step();
        });
    }

    onKeydown(key: string) {
        switch (key.toLowerCase()) {
            case 's':
                this.isRunning = !this.isRunning;
                if (this.isRunning) {
                    this.step();
                }
                break;
        }
    }

    step() {
        if (!this.isRunning) return;
        this.board.clear();
        this.gravity();
        this.move();
        this.board.draw(this.bodies);
        requestAnimationFrame(() => {
            this.step();
        });
    }

    gravity() {
        const G = 1;
        let b1, b2, gmm, f, d, ang;
        for (let i = 0; i < this.bodies.length - 1; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                b1 = this.bodies[i];
                b2 = this.bodies[j];
                gmm = G * b1.m * b2.m;
                d = Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2);
                f = gmm / Math.max(25, d ** 0.25);
                ang = Math.atan2(b2.y - b1.y, b2.x - b1.x);
                b1.ax = (f * Math.cos(ang)) / Math.pow(b1.m, 1);
                b1.ay = (f * Math.sin(ang)) / Math.pow(b1.m, 1);
                b2.ax = (f * Math.cos(ang - Math.PI)) / Math.pow(b2.m, 1);
                b2.ay = (f * Math.sin(ang - Math.PI)) / Math.pow(b2.m, 1);
            }
        }
    }

    move() {
        this.bodies.forEach((b) => {
            if (b.id !== 0) {
                b.vx += b.ax;
                b.vy += b.ay;
                b.x += b.vx;
                b.y += b.vy;
            }
        });
    }
}
