	function Main() {
	
	PIXI.Container.call(this);

	this.currentScreen = null;

	//chargement d'une spritesheet, on bind le contexte pour ne pas le perdre
	PIXI.loader.add("images/flappy_bird.json").load(this.onAssetsLoaded.bind(this));
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.update = function() {

	if (this.currentScreen != null)
		this.currentScreen.update();
}

Main.prototype.onAssetsLoaded = function() {

	// ajout fond
	this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("background.png")));

	//ajout écran intro
	this.gotoHome();
}

Main.prototype.gotoHome = function() {

	if (this.currentScreen != null) {

		this.currentScreen.destroy();
		this.removeChild(this.currentScreen);
	}

	this.currentScreen = new Home();
	this.addChild(this.currentScreen);
}

Main.prototype.gotoGame = function() {

	this.currentScreen.destroy();
	this.removeChild(this.currentScreen);

	this.currentScreen = new Game();
	this.addChild(this.currentScreen);
}

Main.prototype.gameOver = function() {

	this.currentScreen.destroy();
	this.removeChild(this.currentScreen);

	this.currentScreen = new EndGame();
	this.addChild(this.currentScreen);
}