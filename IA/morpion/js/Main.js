function Main() {

    PIXI.Container.call(this);

    this.grid = new Grid();
    this.grid.x = (width - this.grid.width) / 2;
    this.grid.y = (height - this.grid.height) / 2;
    this.addChild(this.grid);
}

Main.prototype = Object.create(PIXI.Container.prototype);