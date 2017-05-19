function APlayer(color) {

    PIXI.Container.call(this);

    this.color = color;
    this.numDices = 5;
    this.dices = [];
    this.isPalifico = false;
    this.turnPalifico = 0;

    var text = new PIXI.Text(this.name, {fill:Utils.getHexColor(this.color)});
    this.addChild(text);

    this.dice = PIXI.Sprite.fromFrame("dice_" + this.color + ".png")
    this.dice.x = (text.width - this.dice.width) * 0.7;
    this.dice.y = text.height + 10;
	this.addChild(this.dice);

	this.dudo = new PIXI.Text("DUDO !");
	this.dudo.x = text.x + (text.width - this.dudo.width) / 2;
	this.dudo.y = this.dice.y + this.dice.height + 10;
	this.dudo.visible = false;
    this.addChild(this.dudo);
}

APlayer.prototype = Object.create(PIXI.Container.prototype);

APlayer.prototype.showProposition = function(numDices, diceValue) {

	this.deletePreviousProposition();

	var num = new PIXI.Text(numDices);
	num.x = this.dice.x - num.width - 20;
	num.y = this.dice.y + (this.dice.height - num.height) / 2;
	this.addChild(num);

	var diceValue = PIXI.Sprite.fromFrame(diceValue + Utils.blackOrWhite(this.color) + ".png");
	diceValue.x = this.dice.x + (this.dice.width - diceValue.width) / 2;
	diceValue.y = this.dice.y + (this.dice.height - diceValue.height) / 2;
	this.addChild(diceValue);
}

APlayer.prototype.deletePreviousProposition = function() {

	if (this.children.length > 3)
		this.removeChildren(3);
}

APlayer.prototype.showDudo = function() {

	this.dudo.visible = true;

	this.deletePreviousProposition();
}

APlayer.prototype.rollDice = function() {

	this.dudo.visible = false;

	this.dices = [];
	for (var i = 0; i < this.numDices; ++i)
		this.dices.push(Utils.randomIntFromInterval(1, 6));

	this.deletePreviousProposition();

	// on peut-être palifico à la fin d'une manche au moment où on perd un dé.
    // ensuite on relance les dés, on est toujours palifico.
    // la prochaine fois qu'on relancera encore les dés, on ne le sera plus, on stock donc ce n + 1 dans une variable.
	if (this.isPalifico) {

		if (this.turnPalifico == 0)
			this.turnPalifico = 1;
		else
			this.isPalifico = false;
	}

	console.log(this.name + " dés : " + this.dices);
}

APlayer.prototype.lostDice = function() {

	console.log(this.name + " a perdu un dé");
	--this.numDices;

	if (this.numDices == 1) {

		console.log(this.name + " est Palifico");

		this.emit('palifico', this);

	} else if (this.numDices == 0) {

		console.log(this.name + " est éliminé");

		this.emit('eliminated', this);

		this.deletePreviousProposition();
	}
}

APlayer.prototype.play = function() {

}