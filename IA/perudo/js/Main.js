function Main() {

    PIXI.Container.call(this);

    PIXI.loader.add("img/assets.json").load(this.onAssetsLoaded.bind(this));
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.onAssetsLoaded = function() {

	this.createBoard();
}

Main.prototype.update = function() {

}

Main.prototype.createBoard = function() {

	if (this.board)
		this.removeChildren();

	this.board = new Board(4);
    this.board.x = (width - this.board.width) / 2;
    this.board.y = (height - this.board.height) / 2;
    this.addChild(this.board);

    var title = PIXI.Sprite.fromFrame("perudo.jpg");
    title.x = (width - title.width) / 2;
    title.y = this.board.y + 20;
    this.addChild(title);

    var nextPlayer = PIXI.Sprite.fromFrame("next_player.png");
    nextPlayer.x = this.board.x + this.board.width - nextPlayer.width - 50;
    nextPlayer.y = title.y + (title.height - nextPlayer.height) / 2;
    this.addChild(nextPlayer);

    nextPlayer.interactive = nextPlayer.buttonMode = true;
    nextPlayer.click = this.nextPlayer.bind(this);

    this.board.rollDice();

    this.board.once('winner', this.boardHasWinner.bind(this));
}

Main.prototype.nextPlayer = function() {

	this.board.play();
}

Main.prototype.boardHasWinner = function (player) {

	//console.log("winner " + player.name);

	this.createBoard();
}