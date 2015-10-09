function Snake(gridTab) {

    PIXI.Graphics.call(this);

    this.giveMeApple = true;
    this._gridTab = gridTab;
    this._body = [];

    this._body.push(this._gridTab[4][0] = new Cell(4, 0, Grid.CASE_SNAKE_HEAD, 0x00CCFF));
    this._body.push(this._gridTab[3][0] = new Cell(3, 0, Grid.CASE_SNAKE, 0x00AAFF));
    this._body.push(this._gridTab[2][0] = new Cell(2, 0, Grid.CASE_SNAKE, 0x00AAFF));
    this._body.push(this._gridTab[1][0] = new Cell(1, 0, Grid.CASE_SNAKE, 0x00AAFF));
}

Snake.prototype = Object.create(PIXI.Graphics.prototype);

Snake.prototype.moveTo = function(direction) {

    var futureTail = this._getNextCell(direction);

    if (futureTail.type == Grid.CASE_SNAKE) {

        this.emit("GAME_OVER");
        return;
    }

    var tail = this._body[0];
    tail.type = Grid.CASE_SNAKE;
    tail.color = 0x00AAFF;

    if (futureTail.type != Grid.CASE_APPLE) {

        var oldQueue = this._body.pop();
        oldQueue.type = Grid.CASE_EMPTY;

    } else
        this.giveMeApple = true;

    futureTail.type = Grid.CASE_SNAKE_HEAD;
    futureTail.color = 0x00CCFF;

    this._body.unshift(futureTail);
};

Snake.prototype.draw = function() {

    this.clear();

    for (var i = 0; i < 40; ++i)
        for (var j = 0; j < 30; ++j)
            if (this._gridTab[i][j].type != Grid.CASE_EMPTY) {

                this.beginFill(this._gridTab[i][j].color);
                this.drawRect(i * Grid.CASE_SIZE, j * Grid.CASE_SIZE, Grid.CASE_SIZE, Grid.CASE_SIZE);
            }

    this.endFill();
};

Snake.prototype._getNextCell = function(direction) {

    var tail = this._body[0];
    var futureTail;

    if (direction == KeyboardEvent.DOM_VK_RIGHT)
        futureTail = this._gridTab[tail.i + 1 == this._gridTab.length ? 0 : tail.i + 1][tail.j];

    else if (direction == KeyboardEvent.DOM_VK_LEFT)
        futureTail = this._gridTab[tail.i - 1 == -1 ? this._gridTab.length - 1 : tail.i - 1][tail.j];

    else if (direction == KeyboardEvent.DOM_VK_DOWN)
        futureTail = this._gridTab[tail.i][tail.j + 1 == this._gridTab[tail.i].length ? 0 : tail.j + 1];

    else if (direction == KeyboardEvent.DOM_VK_UP)
        futureTail = this._gridTab[tail.i][tail.j - 1 == -1 ? this._gridTab[tail.i].length - 1 : tail.j - 1];

    return futureTail;
}