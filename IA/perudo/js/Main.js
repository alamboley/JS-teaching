function Main() {

    PIXI.Container.call(this);

    PIXI.loader.add("img/assets.json").load(this.onAssetsLoaded.bind(this));
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.onAssetsLoaded = function() {

	this.players = [[new Player(), 0], [new Player(), 0], [new Player(), 0], [new Player(), 0]];
	this.gameEnded = 0;

	this.createBoard();
}

Main.prototype.update = function() {

}

Main.prototype.createBoard = function() {

	if (this.board)
		this.removeChildren();

	this.aPlayerWin = false;

	this.board = new Board();
    this.board.x = (width - this.board.width) / 2;
    this.board.y = (height - this.board.height) / 2;
    this.addChild(this.board);

    this.board.numPlayers = this.players.length;

    for (var i = 0; i < this.players.length; ++i)
    	this.board.addPlayer(this.players[i][0]);

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

    //while (!this.aPlayerWin)
    //	this.board.play();
}

Main.prototype.nextPlayer = function() {

	this.board.play();
}

Main.prototype.boardHasWinner = function (player) {

	console.log("winner " + player.name);

	for (var i = 0; i < this.players.length; ++i)
		if (this.players[i][0] == player) {
			++this.players[i][1];
			break;
		}

	this.aPlayerWin = true;
	++this.gameEnded;

	if (this.gameEnded < 20)
		this.createBoard();

	else {

		console.log("finiiiiish");
		console.log(this.players);
	}
}
