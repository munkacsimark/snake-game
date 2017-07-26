import SnakeDirections from './enums/SnakeDirections';

import ICoordinate from './interfaces/ICoordinate';

export default class Snake {

    private _body: Array<ICoordinate>;
    private _direction: SnakeDirections;
    private boardSize: ICoordinate;

    constructor (boardSize: ICoordinate, startingPoint: ICoordinate) {
        this._body = [startingPoint],
        this._direction = SnakeDirections.RIGHT;
        this.boardSize = boardSize;
    };

    public move = (): void => {
        let newCoordinate: ICoordinate;
        switch (this._direction) {
            case SnakeDirections.UP:
                newCoordinate = {
                    x: this._body[0].x,
                    y: this._body[0].y - 1 < 0
                        ? this.boardSize.y - 1
                        : this._body[0].y - 1,
                }
                break;
            case SnakeDirections.DOWN:
                newCoordinate = {
                    x: this._body[0].x,
                    y: this._body[0].y + 1 > this.boardSize.y - 1
                        ? 0
                        : this._body[0].y + 1,
                }
                break;
            case SnakeDirections.LEFT:
                newCoordinate = {
                    x: this._body[0].x - 1 < 0
                        ? this.boardSize.x - 1
                        : this._body[0].x - 1,
                    y: this._body[0].y,
                }
                break;
            case SnakeDirections.RIGHT:
                newCoordinate = {
                    x: this._body[0].x + 1 > this.boardSize.x - 1
                        ? 0
                        : this._body[0].x + 1,
                    y: this._body[0].y,
                }
                break;
        }
        this._body.unshift(newCoordinate);
        this._body.pop();
    }

    public incrementBody = (coordinate: ICoordinate): void => {
        this._body.push(coordinate);
    }

    get body(): Array<ICoordinate> {
        return this._body;
    }

    set direction(direction: SnakeDirections) {
        this._direction = direction;
    }

    get direction(): SnakeDirections {
        return this._direction;
    }

}
