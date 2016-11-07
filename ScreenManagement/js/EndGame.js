function EndGame() {
	
	PIXI.Container.call(this);

	this.gameOver = new PIXI.Sprite(PIXI.Texture.fromFrame("game_over.png"));

	this.gameOver.x = (renderer.width - this.gameOver.width) / 2;
	this.gameOver.y = (renderer.height - this.gameOver.height) / 2;

	this.gameOver.interactive = true;
	this.gameOver.buttonMode = true;

	this.addChild(this.gameOver);

	this.gameOver.on('mousedown', this.onRestart.bind(this));

	TweenMax.to(this.gameOver, 0.5, {alpha:0.5, repeat:-1, yoyo:true});

}

EndGame.prototype = Object.create(PIXI.Container.prototype);

EndGame.prototype.update = function() {

}

EndGame.prototype.destroy = function() {

	TweenMax.killTweensOf(this.gameOver);
}

EndGame.prototype.onRestart = function() {

	this.parent.gotoHome();
}