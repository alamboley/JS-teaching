function Home() {
	
	PIXI.Container.call(this);

	this.getReady = new PIXI.Sprite(PIXI.Texture.fromFrame("get_ready.png"));

	this.getReady.x = (renderer.width - this.getReady.width) / 2;
	this.getReady.y = (renderer.height - this.getReady.height) / 2;

	this.getReady.interactive = true;
	this.getReady.buttonMode = true;

	this.addChild(this.getReady);

	this.getReady.on('mousedown', this.play.bind(this));

	TweenMax.to(this.getReady, 0.5, {alpha:0.5, repeat:-1, yoyo:true});
}

Home.prototype = Object.create(PIXI.Container.prototype);

Home.prototype.update = function() {

}

Home.prototype.destroy = function() {

	TweenMax.killTweensOf(this.getReady);
}

Home.prototype.play = function(mouseData) {

	this.parent.gotoGame();
}