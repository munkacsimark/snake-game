import ICoordinate from './ICoordinate';

export default interface ISettings {
    pixelSize: number;
    boardSize: ICoordinate;
    backgroundColor: string;
    snakeColor: string;
}
