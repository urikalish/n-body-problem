import { Simulator } from './simulator';

// eslint-disable-next-line
function onClickStartGame() {
    const startFormElm = document.getElementById('start-form');
    if (!startFormElm) return;
    startFormElm.classList.add('display--none');
    simulator.start(750);
}

const simulator = new Simulator();
