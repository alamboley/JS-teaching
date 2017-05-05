function Grid() {

    PIXI.Container.call(this);

    this.grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    var bg = new PIXI.Graphics();
    bg.beginFill(0xFFFF00);
    bg.drawRect(0, 0, 600, 600);
    bg.endFill();

    bg.interactive = bg.buttonMode = true;

    this.addChild(bg);

    for (var i = 1; i < 3; ++i) {

    	var line = new PIXI.Graphics();
	    line.beginFill(0x000000);
	    line.drawRect(0, 0, bg.width, 20);
	    line.endFill();

	    line.y = i * 200;
	    this.addChild(line);
    }

    for (var i = 1; i < 3; ++i) {

    	var line = new PIXI.Graphics();
	    line.beginFill(0x000000);
	    line.drawRect(0, 0, 20, bg.height);
	    line.endFill();

	    line.x = i * 200;
	    this.addChild(line);
    }

    bg.click = function(evt) {
    	var pos = evt.data.getLocalPosition(bg);
    	console.log(Math.floor(pos.x / 200), Math.floor(pos.y / 200));
    }
}

Grid.prototype = Object.create(PIXI.Container.prototype);