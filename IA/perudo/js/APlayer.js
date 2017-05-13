function APlayer(color) {

    PIXI.Container.call(this);

    this.color = color;
    this.numDices = 5;
    this.dices = [];

    var text = new PIXI.Text(this.name, {fill:Utils.getHexColor(this.color)});
    this.addChild(text);
}

APlayer.prototype = Object.create(PIXI.Container.prototype);

APlayer.prototype.rollDice = function() {

	this.dices = [];
	for (var i = 0; i < this.numDices; ++i)
		this.dices.push(Utils.randomIntFromInterval(1, 6));

	console.log(this.name + " dés : " + this.dices);
}

APlayer.prototype.startGame = function() {

	
}