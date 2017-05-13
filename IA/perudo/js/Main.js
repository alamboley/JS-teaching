function Main() {

    PIXI.Container.call(this);

    PIXI.loader.add("img/assets.json").load(this.onAssetsLoaded.bind(this));
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.onAssetsLoaded = function() {

	this.board = new Board(4);
    this.board.x = (width - this.board.width) / 2;
    this.board.y = (height - this.board.height) / 2;
    this.addChild(this.board);

    var title = PIXI.Sprite.fromFrame("perudo.jpg");
    title.x = (width - title.width) / 2;
    title.y = this.board.y + 20;
    this.addChild(title);

    this.board.startGame();
}

Main.prototype.update = function() {

}