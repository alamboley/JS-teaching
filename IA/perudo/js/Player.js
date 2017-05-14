function Player(color) {

	this.name = "votre nom " + Math.floor(Math.random() * 100) / 100;

    APlayer.call(this, color);
}

Player.prototype = Object.create(APlayer.prototype);

Player.prototype.play = function() {

	APlayer.prototype.play.call(this);

	if (this.parent.numDices == 0) {

		// début de partie, il faut faire une annonce

		this.emit('played', {numDices:2, diceValue:2});


	} else {

		// enchère ou bluff

		this.emit('played', {numDices:3, diceValue:3});
	}
}