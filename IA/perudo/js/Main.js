function Main() {

    PIXI.Container.call(this);

    PIXI.loader.add("img/assets.json").load(this.onAssetsLoaded.bind(this));
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.onAssetsLoaded = function() {

	this.allPlayers = [new Player(), new Player(), new Player(), new Player(), new Player(), new Player(), new Player(), new Player()];

	this.createGame();
}

Main.showLog = false;

Main.prototype.update = function() {

}

Main.prototype.createGame = function() {

	Utils.shuffleArray(this.allPlayers);

	this.players = [];

	for (var i = 0; i <= 4; ++i)
		if (!this.hasPlayedSeveralGames(i)) {
			this.players = this.getPlayers(i);
			break
		}

	if (this.players.length > 0)
		this.createBoard();

	else {

		console.log("finiiiiish");

		this.allPlayers.sort(function(a, b) {
			if (a.totalNumVictories === b.totalNumVictories)
				return 0;
			
			return (a.totalNumVictories < b.totalNumVictories) ? 1 : -1;
		});

		for (var i = 0; i < this.allPlayers.length; ++i)
			console.log(this.allPlayers[i].name + " a " + this.allPlayers[i].totalNumVictories + " victoires sur " + this.allPlayers[i].totalNumGames + " parties");
	}

}

Main.prototype.getPlayers = function(numPlayers) {

	this.allPlayers.sort(function(a, b) {
		if (a["numGames" + (numPlayers + 2) + "P"] === b["numGames" + (numPlayers + 2) + "P"])
			return 0;
		
		return (a["numGames" + (numPlayers + 2) + "P"] > b["numGames" + (numPlayers + 2) + "P"]) ? 1 : -1;
	});

	var players = [];

	for (var i = 0; i < numPlayers + 2; ++i) {

		this.allPlayers[i]["numGames" + (numPlayers + 2) + "P"]++;
		this.allPlayers[i].totalNumGames++;

		players.push(this.allPlayers[i]);
	}

	return players;
}

Main.prototype.hasPlayedSeveralGames = function(numPlayers) {

	for (var i = 0; i < this.allPlayers.length; ++i)
		if (this.allPlayers[i]["numGames" + (numPlayers + 2) + "P"] < 20)
			return false;

	return true;
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

    for (var i = 0; i < this.players.length; ++i) {
    	this.board.addPlayer(this.players[i]);
    }

    var title = PIXI.Sprite.fromFrame("perudo.jpg");
    title.x = (width - title.width) / 2;
    title.y = this.board.y + 20;
    this.addChild(title);

    var nextPlayer = PIXI.Sprite.fromFrame("next_player.png");
    nextPlayer.x = this.board.x + this.board.width - nextPlayer.width - 50;
    nextPlayer.y = title.y + (title.height - nextPlayer.height) / 2;
    this.addChild(nextPlayer);

    nextPlayer.interactive = nextPlayer.buttonMode = true;
    nextPlayer.click = this.nextPlayerTurn.bind(this);

    this.board.rollDice();

    this.board.once('winner', this.boardHasWinner.bind(this));

    while (!this.aPlayerWin)
    	this.board.play();
}

Main.prototype.nextPlayerTurn = function() {

	this.board.play();
}

Main.prototype.boardHasWinner = function (player) {

	if (Main.showLog)
		console.log("winner " + player.name);

	for (var i = 0; i < this.allPlayers.length; ++i)
		if (this.allPlayers[i] == player) {
			this.players[i].totalNumVictories++;
			break;
		}

	this.aPlayerWin = true;
	this.createGame();
}
