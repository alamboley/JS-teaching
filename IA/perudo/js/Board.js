function Board(numPlayers) {

    PIXI.Container.call(this);

    var bg = new PIXI.extras.TilingSprite(PIXI.Texture.fromFrame('bg.jpg'), 800, 600);
    this.addChild(bg);

    this.players = [];
    this.colors = ["blue", "green", "orange", "purple", "red", "yellow", "cream"];
    Utils.shuffleArray(this.colors);

    for (var i = 0; i < numPlayers; ++i) {

    	var player = new Player(this.colors.pop());

    	player.x = 400 - player.width / 2 + 200 * Math.cos(2 * Math.PI * i * 1 / numPlayers);
    	player.y = 300 + 150 * Math.sin(2 * Math.PI * i * 1 / numPlayers);

    	this.addChild(player);

    	this.players.push(player);

    	player.on('incremented', this.playerIncremented.bind(this));
    	player.on('dudo', this.playerSaidDudo.bind(this));
    	player.on('eliminated', this.playerEliminated.bind(this));
    }

    this.numDices = 0;
    this.diceValue = 0;
    this.playerTurn = 0;
}

Board.prototype = Object.create(PIXI.Container.prototype);

Board.prototype.rollDice = function() {

	for (var i = 0; i < this.players.length; ++i)
		this.players[i].rollDice();
}

Board.prototype.play = function() {

	this.players[this.playerTurn].play();
}

Board.prototype.playerIncremented = function(evt) {

	//TODO manage Paco
	if (evt.numDices > this.numDices || evt.diceValue > this.diceValue) {

		this.numDices = evt.numDices;
		this.diceValue = evt.diceValue;

		this.players[this.playerTurn].showProposition(this.numDices, this.diceValue);

		if (++this.playerTurn >= this.players.length)
			this.playerTurn = 0;

		this.play();

	} else {

		console.log("le joueur " + this.players[this.playerTurn].name + " a fait une proposition qui ne respecte pas les règles");
	}
}

Board.prototype.playerSaidDudo = function() {

	//TODO manage paco

	var numDices = 0;
	for (var i = 0; i < this.players.length; ++i)
		for (var j = 0; j < this.players[i].dices.length; ++j)
			if (this.players[i].dices[j] == this.diceValue)
				++numDices;

	var lostPlayerIndex = 0;
	if (numDices < this.numDices) {

		if (this.playerTurn == 0)
			lostPlayerIndex = this.players.length - 1;
		else
			lostPlayerIndex = this.playerTurn - 1;

	} else
		lostPlayerIndex = this.playerTurn;

	this.players[lostPlayerIndex].lostDice();
	this.playerTurn = lostPlayerIndex;

	if (this.playerTurn == this.players.length)
		this.playerTurn = 0;

	if (this.players.length == 1)
		console.log("Le gagnant est " + this.players[0].name);

	else {

		this.rollDice();
		this.play();
	}
}

Board.prototype.playerEliminated = function(player) {

	this.players.splice(this.players.indexOf(player), 1);
}