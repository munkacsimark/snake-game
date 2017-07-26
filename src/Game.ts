import ISettings from './interfaces/ISettings';

import GameStatuses from './enums/GameStatuses';
import DocumentEvents from './enums/DocumentEvents';
import KeyboardCodes from './enums/KeyboardCodes';
import SnakeDirections from './enums/SnakeDirections';

import Ui from './Ui';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';

export default class Game {

    private ui: Ui;
    private board: Board;
    private snake: Snake;
    private food: Food;

    private status: GameStatuses = GameStatuses.STOPPED;
    private points: number;
    private speed: number;
    private ticker: number;
    private canSetDirection: boolean = true;

    constructor (private settings: ISettings) {
        this.board = new Board(
            this.settings.pixelSize,
            this.settings.boardSize,
            this.settings.backgroundColor,
            this.settings.snakeColor,
        );
        this.ui = new Ui(
            this.start,
            this.stop,
            this.pause,
        );
        this.snake = new Snake(
            this.settings.boardSize,
            {x: 2, y: 2},
        );
        this.food = new Food(
            this.settings.boardSize,
        );
        document.addEventListener(DocumentEvents.KEY_DOWN, this.keyHandler, true);
        this.board.fakeRender();
    }

    private start = (): void => {
        if (this.status === GameStatuses.RUNNING ||
            this.status === GameStatuses.PAUSED) return;
        this.snake = new Snake(
            this.settings.boardSize,
            {x: 2, y: 2},
        );
        this.status = GameStatuses.RUNNING;
        this.points = 0;
        this.speed = 0.2;
        this.ticker = setInterval(this.tickHandler, 1000 * this.speed);
    }

    private stop = (): void => {
        if (this.status === GameStatuses.STOPPED) return;
        clearInterval(this.ticker);
        this.status = GameStatuses.STOPPED;
        this.board.fakeRender();
    }

    private pause = (): void => {
        if (this.status === GameStatuses.STOPPED) return;
        this.status = this.status === GameStatuses.PAUSED
            ? GameStatuses.RUNNING
            : GameStatuses.PAUSED;
    }

    private tickHandler = (): void => {
        this.canSetDirection = true;
        if (this.status !== GameStatuses.PAUSED) {
            this.snake.move();
            this.checkCollisions();
            this.checkFood();
            this.board.render(this.snake, this.food);
        }
    }

    private keyHandler = (event: KeyboardEvent): void => {
        if (event.code === KeyboardCodes.SPACE) this.pause();
        if (event.code === KeyboardCodes.ENTER) this.start();
        if (event.code === KeyboardCodes.ESCAPE) this.stop();
        if (!this.canSetDirection) return;
        this.canSetDirection = false;
        switch (event.code) {
            case KeyboardCodes.ARROW_UP:
                if (this.snake.direction === SnakeDirections.DOWN) return;
                this.snake.direction = SnakeDirections.UP;
                break;
            case KeyboardCodes.ARROW_DOWN:
                if (this.snake.direction === SnakeDirections.UP) return;
                this.snake.direction = SnakeDirections.DOWN;
                break;
            case KeyboardCodes.ARROW_LEFT:
                if (this.snake.direction === SnakeDirections.RIGHT) return;
                this.snake.direction = SnakeDirections.LEFT;
                break;
            case KeyboardCodes.ARROW_RIGHT:
                if (this.snake.direction === SnakeDirections.LEFT) return;
                this.snake.direction = SnakeDirections.RIGHT;
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    private checkCollisions = (): void => {

        const selfCollision = (): boolean => {
            let occurrence = 0;
            for (let coordinate of this.snake.body) {
                if (coordinate.x === this.snake.body[0].x &&
                    coordinate.y === this.snake.body[0].y) {
                        ++occurrence;
                    }
            }
            return occurrence > 1;
        }

        if (selfCollision()) {
            this.stop();
        }
    }

    private checkFood = (): void => {
        if (this.food.coordinate.x === this.snake.body[0].x &&
            this.food.coordinate.y === this.snake.body[0].y) {
                ++this.points;
                this.ui.refreshPoints(this.points);
                this.snake.incrementBody(this.food.coordinate);
                this.food = new Food(this.settings.boardSize);
            }
    }
}
