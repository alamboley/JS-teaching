function Main() {

    PIXI.Container.call(this);

    this.grid = new Grid();
    this.grid.x = (width - this.grid.width) / 2;
    this.grid.y = (height - this.grid.height) / 2;
    this.addChild(this.grid);

    this.text = new PIXI.Text("Next simulation step!", new PIXI.TextStyle({fill:0xFF0000}));
    this.addChild(this.text);

    this.text.interactive = this.text.buttonMode = true;
    this.text.click = this.nextSimulationStep.bind(this);
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.nextSimulationStep = function (evt) {

	this.grid.nextStep();
}