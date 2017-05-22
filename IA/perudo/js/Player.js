function Player() {

    APlayer.call(this);

    this.name = "votre nom";
}

Player.prototype = Object.create(APlayer.prototype);

Player.prototype.play = function() {

	APlayer.prototype.play.call(this);

	if (this.parent.numDices == 0) {

		// début de partie, il faut faire une annonce

		this.emit('incremented', {numDices:2, diceValue:2});


	} else {

		// enchère ou bluff

		if (this.parent.numDices > 6)
			this.emit('dudo');

		else
			this.emit('incremented', {numDices:this.parent.numDices + 1, diceValue:2});
	}
}