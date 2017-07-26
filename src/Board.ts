import ICoordinate from './interfaces/ICoordinate';
import IPixel from './interfaces/IPixel';

import Snake from './Snake';
import Food from './Food';

export default class Board {

    private width: number;
    private height: number;
    private context: CanvasRenderingContext2D;
    private pixelSize: number;
    private boardSize: ICoordinate;
    private backgroundColor: string;
    private snakeColor: string;

    constructor (pixelSize: number, boardSize: ICoordinate, backgroundColor: string, snakeColor: string) {
        this.pixelSize = pixelSize;
        this.boardSize = boardSize;
        this.width = pixelSize * boardSize.x;
        this.height = pixelSize * boardSize.y;
        this.backgroundColor = backgroundColor;
        this.snakeColor = snakeColor;
        this.createCanvas();
    }

    public render = (snake: Snake, food: Food): void => {
        this.clearCanvas();
        for (let i = 0; i < snake.body.length; ++i) {
            this.drawPixel(snake.body[i], this.snakeColor);
        }
        this.drawPixel(food.coordinate, '#f00');
    }

    public fakeRender = () => {
        this.render(
            new Snake(this.boardSize, {x: 2, y: 2}),
            new Food(this.boardSize),
        );
    }

    private drawPixel = (coordinate: ICoordinate, color: string): void => {
        const pixel: IPixel = {
            color: color,
            coordinate: coordinate,
            size: this.pixelSize,
        };

        this.context.beginPath();
        this.context.strokeStyle = this.backgroundColor;
        this.context.fillStyle = pixel.color;
        this.context.rect(
            pixel.coordinate.x * pixel.size,
            pixel.coordinate.y * pixel.size,
            pixel.size,
            pixel.size,
        );
        this.context.fill();
        this.context.stroke();
    }

    private createCanvas = (): void => {
        const canvasElement: HTMLCanvasElement = document.createElement('canvas');
        const bodyElement: HTMLBodyElement = document.querySelector('body');
        bodyElement.appendChild(canvasElement);
        canvasElement.width = this.width;
        canvasElement.height = this.height;
        canvasElement.style.cssText = 'display: block; border: 1px solid #000; margin: 10px auto 0 auto;';
        this.context = canvasElement.getContext('2d');
        this.clearCanvas();
    }

    private clearCanvas = (): void => {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);
    }
}
