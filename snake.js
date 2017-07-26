(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Snake_1 = require("./Snake");
var Food_1 = require("./Food");
var Board = (function () {
    function Board(pixelSize, boardSize, backgroundColor, snakeColor) {
        var _this = this;
        this.render = function (snake, food) {
            _this.clearCanvas();
            for (var i = 0; i < snake.body.length; ++i) {
                _this.drawPixel(snake.body[i], _this.snakeColor);
            }
            _this.drawPixel(food.coordinate, '#f00');
        };
        this.fakeRender = function () {
            _this.render(new Snake_1.default(_this.boardSize, { x: 2, y: 2 }), new Food_1.default(_this.boardSize));
        };
        this.drawPixel = function (coordinate, color) {
            var pixel = {
                color: color,
                coordinate: coordinate,
                size: _this.pixelSize,
            };
            _this.context.beginPath();
            _this.context.strokeStyle = _this.backgroundColor;
            _this.context.fillStyle = pixel.color;
            _this.context.rect(pixel.coordinate.x * pixel.size, pixel.coordinate.y * pixel.size, pixel.size, pixel.size);
            _this.context.fill();
            _this.context.stroke();
        };
        this.createCanvas = function () {
            var canvasElement = document.createElement('canvas');
            var bodyElement = document.querySelector('body');
            bodyElement.appendChild(canvasElement);
            canvasElement.width = _this.width;
            canvasElement.height = _this.height;
            canvasElement.style.cssText = 'display: block; border: 1px solid #000; margin: 10px auto 0 auto;';
            _this.context = canvasElement.getContext('2d');
            _this.clearCanvas();
        };
        this.clearCanvas = function () {
            _this.context.fillStyle = _this.backgroundColor;
            _this.context.fillRect(0, 0, _this.width, _this.height);
        };
        this.pixelSize = pixelSize;
        this.boardSize = boardSize;
        this.width = pixelSize * boardSize.x;
        this.height = pixelSize * boardSize.y;
        this.backgroundColor = backgroundColor;
        this.snakeColor = snakeColor;
        this.createCanvas();
    }
    return Board;
}());
exports.default = Board;

},{"./Food":2,"./Snake":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Food = (function () {
    function Food(boardSize) {
        this.getRandomArbitrary = function (min, max) { return Math.round(Math.random() * (max - min) + min); };
        this._coordinate = {
            x: this.getRandomArbitrary(0, boardSize.x - 1),
            y: this.getRandomArbitrary(0, boardSize.y - 1)
        };
    }
    Object.defineProperty(Food.prototype, "x", {
        get: function () {
            return this._coordinate.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Food.prototype, "y", {
        get: function () {
            return this._coordinate.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Food.prototype, "coordinate", {
        get: function () {
            return this._coordinate;
        },
        enumerable: true,
        configurable: true
    });
    return Food;
}());
exports.default = Food;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ui_1 = require("./Ui");
var Board_1 = require("./Board");
var Snake_1 = require("./Snake");
var Food_1 = require("./Food");
var Game = (function () {
    function Game(settings) {
        var _this = this;
        this.settings = settings;
        this.status = "stopped" /* STOPPED */;
        this.canSetDirection = true;
        this.start = function () {
            if (_this.status === "running" /* RUNNING */ ||
                _this.status === "paused" /* PAUSED */)
                return;
            _this.snake = new Snake_1.default(_this.settings.boardSize, { x: 2, y: 2 });
            _this.status = "running" /* RUNNING */;
            _this.points = 0;
            _this.speed = 0.2;
            _this.ticker = setInterval(_this.tickHandler, 1000 * _this.speed);
        };
        this.stop = function () {
            if (_this.status === "stopped" /* STOPPED */)
                return;
            clearInterval(_this.ticker);
            _this.status = "stopped" /* STOPPED */;
            _this.board.fakeRender();
        };
        this.pause = function () {
            if (_this.status === "stopped" /* STOPPED */)
                return;
            _this.status = _this.status === "paused" /* PAUSED */
                ? "running" /* RUNNING */
                : "paused" /* PAUSED */;
        };
        this.tickHandler = function () {
            _this.canSetDirection = true;
            if (_this.status !== "paused" /* PAUSED */) {
                _this.snake.move();
                _this.checkCollisions();
                _this.checkFood();
                _this.board.render(_this.snake, _this.food);
            }
        };
        this.keyHandler = function (event) {
            if (event.code === "Space" /* SPACE */)
                _this.pause();
            if (event.code === "Enter" /* ENTER */)
                _this.start();
            if (event.code === "Escape" /* ESCAPE */)
                _this.stop();
            if (!_this.canSetDirection)
                return;
            _this.canSetDirection = false;
            switch (event.code) {
                case "ArrowUp" /* ARROW_UP */:
                    if (_this.snake.direction === "down" /* DOWN */)
                        return;
                    _this.snake.direction = "up" /* UP */;
                    break;
                case "ArrowDown" /* ARROW_DOWN */:
                    if (_this.snake.direction === "up" /* UP */)
                        return;
                    _this.snake.direction = "down" /* DOWN */;
                    break;
                case "ArrowLeft" /* ARROW_LEFT */:
                    if (_this.snake.direction === "right" /* RIGHT */)
                        return;
                    _this.snake.direction = "left" /* LEFT */;
                    break;
                case "ArrowRight" /* ARROW_RIGHT */:
                    if (_this.snake.direction === "left" /* LEFT */)
                        return;
                    _this.snake.direction = "right" /* RIGHT */;
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };
        this.checkCollisions = function () {
            var selfCollision = function () {
                var occurrence = 0;
                for (var _i = 0, _a = _this.snake.body; _i < _a.length; _i++) {
                    var coordinate = _a[_i];
                    if (coordinate.x === _this.snake.body[0].x &&
                        coordinate.y === _this.snake.body[0].y) {
                        ++occurrence;
                    }
                }
                return occurrence > 1;
            };
            if (selfCollision()) {
                _this.stop();
            }
        };
        this.checkFood = function () {
            if (_this.food.coordinate.x === _this.snake.body[0].x &&
                _this.food.coordinate.y === _this.snake.body[0].y) {
                ++_this.points;
                _this.ui.refreshPoints(_this.points);
                _this.snake.incrementBody(_this.food.coordinate);
                _this.food = new Food_1.default(_this.settings.boardSize);
            }
        };
        this.board = new Board_1.default(this.settings.pixelSize, this.settings.boardSize, this.settings.backgroundColor, this.settings.snakeColor);
        this.ui = new Ui_1.default(this.start, this.stop, this.pause);
        this.snake = new Snake_1.default(this.settings.boardSize, { x: 2, y: 2 });
        this.food = new Food_1.default(this.settings.boardSize);
        document.addEventListener("keydown" /* KEY_DOWN */, this.keyHandler, true);
        this.board.fakeRender();
    }
    return Game;
}());
exports.default = Game;

},{"./Board":1,"./Food":2,"./Snake":4,"./Ui":5}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Snake = (function () {
    function Snake(boardSize, startingPoint) {
        var _this = this;
        this.move = function () {
            var newCoordinate;
            switch (_this._direction) {
                case "up" /* UP */:
                    newCoordinate = {
                        x: _this._body[0].x,
                        y: _this._body[0].y - 1 < 0
                            ? _this.boardSize.y - 1
                            : _this._body[0].y - 1,
                    };
                    break;
                case "down" /* DOWN */:
                    newCoordinate = {
                        x: _this._body[0].x,
                        y: _this._body[0].y + 1 > _this.boardSize.y - 1
                            ? 0
                            : _this._body[0].y + 1,
                    };
                    break;
                case "left" /* LEFT */:
                    newCoordinate = {
                        x: _this._body[0].x - 1 < 0
                            ? _this.boardSize.x - 1
                            : _this._body[0].x - 1,
                        y: _this._body[0].y,
                    };
                    break;
                case "right" /* RIGHT */:
                    newCoordinate = {
                        x: _this._body[0].x + 1 > _this.boardSize.x - 1
                            ? 0
                            : _this._body[0].x + 1,
                        y: _this._body[0].y,
                    };
                    break;
            }
            _this._body.unshift(newCoordinate);
            _this._body.pop();
        };
        this.incrementBody = function (coordinate) {
            _this._body.push(coordinate);
        };
        this._body = [startingPoint],
            this._direction = "right" /* RIGHT */;
        this.boardSize = boardSize;
    }
    ;
    Object.defineProperty(Snake.prototype, "body", {
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    return Snake;
}());
exports.default = Snake;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ui = (function () {
    function Ui(startGame, stopGame, pauseGame) {
        var _this = this;
        this.startGame = startGame;
        this.stopGame = stopGame;
        this.pauseGame = pauseGame;
        this.refreshPoints = function (points) {
            _this.pointsElement.innerText = "Points: " + points.toString();
        };
        this.createPointsElement = function () {
            var pointsElement = document.createElement('span');
            pointsElement.style.cssText = 'display: block; font-size: 1.5em; text-align: center;';
            return pointsElement;
        };
        this.createButtonContainer = function () {
            var divElement = document.createElement('div');
            var startButton = _this.createStartButton();
            divElement.style.cssText = 'text-align: center;';
            divElement.appendChild(_this.createStartButton());
            divElement.appendChild(_this.createStopButton());
            divElement.appendChild(_this.createPauseButton());
            return divElement;
        };
        this.createStartButton = function () {
            return _this.createButton('start (enter)', _this.startGame);
        };
        this.createStopButton = function () {
            return _this.createButton('stop (esc)', _this.stopGame);
        };
        this.createPauseButton = function () {
            return _this.createButton('pause (space)', _this.pauseGame);
        };
        this.createButton = function (title, onClick) {
            var buttonElement = document.createElement('button');
            buttonElement.innerText = title;
            buttonElement.style.cssText = 'margin: 10px 15px 0 0; font-size: 1em; padding: 5px 12px; background-color: #eee; border: 1px solid #000;';
            buttonElement.addEventListener('click', function () { onClick(); });
            return buttonElement;
        };
        var htmlElement = document.querySelector('html');
        htmlElement.style.cssText = 'height: 100%; background: #aaa;';
        var buttonContainer = this.createButtonContainer();
        this.pointsElement = this.createPointsElement();
        document.querySelector('body').appendChild(this.pointsElement);
        document.querySelector('body').appendChild(buttonContainer);
        this.refreshPoints(0);
    }
    return Ui;
}());
exports.default = Ui;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
document.addEventListener("readystatechange" /* READY_STATE_CHANGE */, function () {
    if (document.readyState === "complete" /* COMPLETE */) {
        var settings = {
            pixelSize: 10,
            boardSize: { x: 50, y: 50 },
            backgroundColor: '#333',
            snakeColor: '#fff',
        };
        var game = new Game_1.default(settings);
    }
});

},{"./Game":3}]},{},[6]);
