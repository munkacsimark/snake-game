import ICoordinate from './interfaces/ICoordinate';

export default class Food {

    private _coordinate: ICoordinate;

    constructor(boardSize: ICoordinate) {
        this._coordinate = {
            x: this.getRandomArbitrary(0, boardSize.x - 1),
            y: this.getRandomArbitrary(0, boardSize.y - 1)
        }
    }

    private getRandomArbitrary = (min, max) => Math.round(Math.random() * (max - min) + min);

    get x(): number {
        return this._coordinate.x;
    }

    get y(): number {
        return this._coordinate.y;
    }

    get coordinate(): ICoordinate {
        return this._coordinate;
    }

}
