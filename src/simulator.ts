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
                this.bodies.push(new Body(Math.random() * this.board.cw, Math.random() * this.board.ch, 0, 0, 0, 0, 1, 255, 0, 0));
            }
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
        this.board.draw(this.bodies);
        requestAnimationFrame(() => {
            this.step();
        });
    }

    stop() {
        this.isRunning = false;
    }
}
