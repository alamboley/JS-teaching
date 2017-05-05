function Grid() {

    PIXI.Container.call(this);

    this.grid = [];
    for (var i = 0; i < 50; ++i) {

        var tab = [];
        for (var j = 0; j < 50; ++j)
            tab.push(0);

        this.grid[i] = tab;
    }

    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0xFFFF00);
    this.bg.drawRect(0, 0, 600, 600);
    this.bg.endFill();

    this.bg.interactive = this.bg.buttonMode = true;

    this.addChild(this.bg);

    for (var i = 1; i < 50; ++i) {

    	var line = new PIXI.Graphics();
	    line.beginFill(0x000000);
	    line.drawRect(0, 0, this.bg.width, 2);
	    line.endFill();

	    line.y = i * 12;
	    this.addChild(line);
    }

    for (var i = 1; i < 50; ++i) {

    	var line = new PIXI.Graphics();
	    line.beginFill(0x000000);
	    line.drawRect(0, 0, 2, this.bg.height);
	    line.endFill();

	    line.x = i * 12;
	    this.addChild(line);
    }

    this.bg.click = this.gridClicked.bind(this);
}

Grid.prototype = Object.create(PIXI.Container.prototype);

Grid.prototype.gridClicked = function (evt) {

    var pos = evt.data.getLocalPosition(this.bg);
    var posX = Math.floor(pos.x / 12);
    var posY = Math.floor(pos.y / 12);

    if (this.grid[posX][posY] == 0)
        this.createCell(posX, posY);
}

Grid.prototype.createCell = function(posX, posY) {

    var cell = new Cell(posX, posY);

    this.grid[posX][posY] = cell;

    cell.x = posX * 12;
    cell.y = posY * 12;

    this.addChild(cell);
}

Grid.prototype.removeCell = function(cell) {

    this.grid[cell.posX][cell.posY] = 0;
    this.removeChild(cell);
}

Grid.prototype.nextStep = function() {

    var garbage = [];
    var create = [];

    for (var i = 0; i < this.grid.length; ++i)
        for (var j = 0; j < this.grid[i].length; ++j)
            if (this.grid[i][j] != 0) {

                var cell = this.grid[i][j];

                var numNeighbours = this.numNeighbours(cell.posX, cell.posY);

                if (numNeighbours < 2 || numNeighbours > 3)
                    garbage.push(cell);

            } else {

                var numNeighbours = this.numNeighbours(i, j);

                if (numNeighbours == 3)
                    create.push([i, j]);
            }


    for (i = 0; i < garbage.length; ++i)
        this.removeCell(garbage[i]);

    for (i = 0; i < create.length; ++i)
        this.createCell(create[i][0], create[i][1]);
}

Grid.prototype.numNeighbours = function(posX, posY) {

    var neighbours = 0;

    // left
    if (posX > 0 && this.grid[posX - 1][posY] != 0)
        ++neighbours;

    // right
    if (posX < this.grid.length - 1 && this.grid[posX + 1][posY] != 0)
        ++neighbours;

    // up
    if (posY > 0 && this.grid[posX][posY - 1] != 0)
        ++neighbours;

    // down
    if (posY < this.grid.length - 1 && this.grid[posX][posY + 1] != 0)
        ++neighbours;

    // top left
    if (posX > 0 && posY > 0 && this.grid[posX - 1][posY - 1] != 0)
        ++neighbours;

    // top right
    if (posX < this.grid.length - 1 && posY > 0 && this.grid[posX + 1][posY - 1] != 0)
        ++neighbours;

    // bottom left
    if (posX > 0 && posY < this.grid.length - 1 && this.grid[posX - 1][posY + 1] != 0)
        ++neighbours;

    // bottom right
    if (posX < this.grid.length - 1 && posY < this.grid.length - 1 && this.grid[posX + 1][posY + 1] != 0)
        ++neighbours;

    return neighbours;
}