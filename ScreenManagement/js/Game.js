function Game() {
	
	PIXI.Container.call(this);

	var frames = [];
	for (var i = 0; i < 4; ++i)
		frames.push(PIXI.Texture.fromFrame("bird" + i + ".png"));

	this.flappy = new PIXI.extras.MovieClip(frames);

	this.flappy.y = renderer.height / 2;

	this.addChild(this.flappy);

}

Game.prototype = Object.create(PIXI.Container.prototype);

Game.prototype.update = function() {

	this.flappy.x += 3;

	if (this.flappy.x > renderer.width) {

		this.parent.gameOver();
	}
}

Game.prototype.destroy = function() {

}
