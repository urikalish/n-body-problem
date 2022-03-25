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
                this.bodies.push(
                    new Body(
                        i,
                        this.board.cw / 2 - this.board.cw / 20 + (Math.random() * this.board.cw) / 10,
                        this.board.ch / 2 - this.board.ch / 20 + (Math.random() * this.board.ch) / 10,
                        0,
                        0,
                        0,
                        0,
                        1,
                        3,
                        255,
                        255,
                        255,
                    ),
                );
            }
            this.bodies[0].x = this.board.cw / 2;
            this.bodies[0].y = this.board.ch / 2;
            this.bodies[0].r = 255;
            this.bodies[0].g = 0;
            this.bodies[0].b = 0;
            this.bodies[0].m = 100;
            this.bodies[0].s = 5;

            this.bodies[1].y = this.board.ch / 2;

            this.isRunning = true;
            this.step();
        });
    }

    onKeydown(key: string) {
        switch (key.toLowerCase()) {
            case 's':
                this.stop();
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
        const G = 10;
        let b1, b2, gmm, f, d, ang;
        for (let i = 0; i < this.bodies.length - 1; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                b1 = this.bodies[i];
                b2 = this.bodies[j];
                gmm = G * b1.m * b2.m;
                d = Math.max(1, Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2));
                f = gmm / d;
                ang = Math.PI * 2 - Math.atan2(b2.y - b1.y, b2.x - b1.x);
                b1.ax = (f * Math.cos(ang)) / b1.m;
                b1.ay = (f * Math.sin(ang)) / b1.m;
                b2.ax = (f * Math.cos(ang - Math.PI)) / b2.m;
                b2.ay = (f * Math.sin(ang - Math.PI)) / b2.m;
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

    stop() {
        this.isRunning = false;
    }
}
