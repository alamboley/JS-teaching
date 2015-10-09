function Main() {

    PIXI.Container.call(this);

    this._grid = new Grid();

    this._direction = KeyboardEvent.DOM_VK_RIGHT;

    this._snake = new Snake(this._grid.gridTab);
    this.addChild(this._snake);

    this._snake.addListener("GAME_OVER", this._gameOver.bind(this));

    this._interval = window.setInterval(this._onTick.bind(this), 100);
    window.addEventListener('keydown', this._keyDownCallback.bind(this));
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype._gameOver = function() {

    console.log("game over");

    window.clearInterval(this._interval);
}

Main.prototype._onTick = function() {

    this._snake.moveTo(this._direction);

    this._snake.draw();

    if (this._snake.giveMeApple) {

        var apple = this._grid.getRandomEmptyCell();

        apple.type = Grid.CASE_APPLE;
        apple.color = 0xFF0000;

        this._snake.giveMeApple = false;
    }
}

Main.prototype._keyDownCallback = function(keyData) {

    if (keyData.keyCode == KeyboardEvent.DOM_VK_UP && this._direction != KeyboardEvent.DOM_VK_DOWN)
        this._direction = keyData.keyCode;

    else if (keyData.keyCode == KeyboardEvent.DOM_VK_DOWN && this._direction != KeyboardEvent.DOM_VK_UP)
        this._direction = keyData.keyCode;

    else if (keyData.keyCode == KeyboardEvent.DOM_VK_LEFT && this._direction != KeyboardEvent.DOM_VK_RIGHT)
        this._direction = keyData.keyCode;

    else if (keyData.keyCode == KeyboardEvent.DOM_VK_RIGHT && this._direction != KeyboardEvent.DOM_VK_LEFT)
        this._direction = keyData.keyCode;
}