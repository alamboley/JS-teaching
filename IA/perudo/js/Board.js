function Board(numPlayers) {

    PIXI.Container.call(this);

    var bg = new PIXI.extras.TilingSprite(PIXI.Texture.fromFrame('bg.jpg'), 800, 600);
    this.addChild(bg);

    this.players = [];
    this.colors = ["blue", "green", "orange", "purple", "red", "yellow", "cream"];
    this.shuffleArray(this.colors);

    for (var i = 0; i < numPlayers; ++i) {

    	var player = new Player(this.colors.pop());

    	player.x = 400 - player.width / 2 + 200 * Math.cos(2 * Math.PI * i * 1 / numPlayers);
    	player.y = 300 + 150 * Math.sin(2 * Math.PI * i * 1 / numPlayers);

    	this.addChild(player);

    	this.players.push(player);
    }
}

Board.prototype = Object.create(PIXI.Container.prototype);

Board.prototype.startGame = function() {

	for (var i = 0; i < this.players.length; ++i)
		this.players[i].rollDice();

	this.player[0].startGame();
}

Board.prototype.shuffleArray = function (a) {
    
    var j, x, i;

    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}