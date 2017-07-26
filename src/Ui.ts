import GameStatuses from './enums/GameStatuses';

export default class Ui {

    private pointsElement: HTMLSpanElement;

    constructor(
        private startGame: Function,
        private stopGame: Function,
        private pauseGame: Function,
    ) {
        const htmlElement: HTMLHtmlElement = document.querySelector('html');
        htmlElement.style.cssText = 'height: 100%; background: #aaa;';
        const buttonContainer: HTMLDivElement = this.createButtonContainer();
        this.pointsElement = this.createPointsElement();
        document.querySelector('body').appendChild(this.pointsElement);
        document.querySelector('body').appendChild(buttonContainer);
        this.refreshPoints(0);
    }

    public refreshPoints = (points: number) => {
        this.pointsElement.innerText = `Points: ${points.toString()}`;
    }

    private createPointsElement = (): HTMLSpanElement => {
        const pointsElement: HTMLSpanElement = document.createElement('span');
        pointsElement.style.cssText = 'display: block; font-size: 1.5em; text-align: center;';
        return pointsElement;
    }

    private createButtonContainer = (): HTMLDivElement => {
        const divElement: HTMLDivElement = document.createElement('div');
        const startButton: HTMLButtonElement = this.createStartButton();
        divElement.style.cssText = 'text-align: center;';
        divElement.appendChild(this.createStartButton());
        divElement.appendChild(this.createStopButton());
        divElement.appendChild(this.createPauseButton());
        return divElement;
    }

    private createStartButton = () => {
        return this.createButton(
            'start (enter)',
            this.startGame,
        );
    }

    private createStopButton = () => {
        return this.createButton(
            'stop (esc)',
            this.stopGame,
        );
    }

    private createPauseButton = () => {
        return this.createButton(
            'pause (space)',
            this.pauseGame,
        );
    }

    private createButton = (title: string, onClick: Function) => {
        const buttonElement: HTMLButtonElement = document.createElement('button');
        buttonElement.innerText = title;
        buttonElement.style.cssText = 'margin: 10px 15px 0 0; font-size: 1em; padding: 5px 12px; background-color: #eee; border: 1px solid #000;';
        buttonElement.addEventListener('click', () => { onClick() });
        return buttonElement;
    }

}
