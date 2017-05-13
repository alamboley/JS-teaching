function Player(color) {

	this.name = "votre nom " + Math.floor(Math.random() * 100) / 100;

    APlayer.call(this, color);
}

Player.prototype = Object.create(APlayer.prototype);
