import { Simulator } from './simulator';

// eslint-disable-next-line
function onClickStartGame() {
    const startFormElm = document.getElementById('start-form');
    if (!startFormElm) return;
    startFormElm.classList.add('display--none');
    simulator.start(1000);
}

const simulator = new Simulator();
