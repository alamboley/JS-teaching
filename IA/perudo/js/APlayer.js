function APlayer(color) {

    PIXI.Container.call(this);

    this.color = color;
    this.numDices = 5;
    this.dices = [];

    var text = new PIXI.Text(this.name, {fill:Utils.getHexColor(this.color)});
    this.addChild(text);

    this.dice = PIXI.Sprite.fromFrame("dice_" + this.color + ".png")
    this.dice.x = (text.width - this.dice.width) * 0.7;
    this.dice.y = text.height + 15;
	this.addChild(this.dice);
}

APlayer.prototype = Object.create(PIXI.Container.prototype);

APlayer.prototype.showProposition = function(numDices, diceValue) {

	if (this.children.length > 2)
		this.removeChildren(2);

	var num = new PIXI.Text(numDices);
	num.x = this.dice.x - num.width - 20;
	num.y = this.dice.y + (this.dice.height - num.height) / 2;
	this.addChild(num);

	var diceValue = PIXI.Sprite.fromFrame(diceValue + "_white.png");
	diceValue.x = this.dice.x + (this.dice.width - diceValue.width) / 2;
	diceValue.y = this.dice.y + (this.dice.height - diceValue.height) / 2;
	this.addChild(diceValue);
}

APlayer.prototype.rollDice = function() {

	this.dices = [];
	for (var i = 0; i < this.numDices; ++i)
		this.dices.push(Utils.randomIntFromInterval(1, 6));

	console.log(this.name + " dés : " + this.dices);
}

APlayer.prototype.play = function() {

}