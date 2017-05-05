function Cell(posX, posY) {

	PIXI.Graphics.call(this);

	this.beginFill(0x0000FF);
    this.drawCircle(7, 7, 5);
    this.endFill();

    this.posX = posX;
    this.posY = posY;

    this.interactive = this.buttonMode = true;

    this.click = this.cellClicked.bind(this);
}

Cell.prototype = Object.create(PIXI.Graphics.prototype);

Cell.prototype.cellClicked = function (evt) {

	this.parent.removeCell(this);
}