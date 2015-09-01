function Grid() {

    this._gridTab = [];

    for (var i = 0; i < 40; ++i) {

        this._gridTab[i] = [];

        for (var j = 0; j < 30; ++j) {

            this._gridTab[i][j] = new Cell(i, j, Grid.CASE_EMPTY);
        }
    }
}

Object.defineProperty(Grid.prototype, 'gridTab', {

    get: function() {
        return this._gridTab;
    }
});

Grid.prototype.getRandomEmptyCell = function() {

    var cellFinded = false;

    var emptyCell;

    while (!cellFinded) {

        emptyCell = this._gridTab[this.randomInt(0, 39)][this.randomInt(0, 29)];

        if (emptyCell.type == Grid.CASE_EMPTY)
            cellFinded = true;
    }

    return emptyCell;
};

Grid.prototype.randomInt = function(min, max) {

    return Math.floor(Math.random() * (1 + max - min)) + min;
};

Grid.CASE_SIZE = 20;

Grid.CASE_EMPTY = 0;
Grid.CASE_SNAKE = 1;
Grid.CASE_SNAKE_HEAD = 2;
Grid.CASE_APPLE = 3;