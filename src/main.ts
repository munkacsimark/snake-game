import ReadyStates from './enums/ReadyStates';
import DocumentEvents from './enums/DocumentEvents';

import ISettings from './interfaces/ISettings';

import Game from './Game';

document.addEventListener(DocumentEvents.READY_STATE_CHANGE, () => {
    if (document.readyState === ReadyStates.COMPLETE) {
        const settings: ISettings = {
            pixelSize: 10,
            boardSize: {x: 50, y: 50},
            backgroundColor: '#333',
            snakeColor: '#fff',
        }
        const game = new Game(settings);
    }
});
