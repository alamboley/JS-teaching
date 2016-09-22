function Enemy() {

    PIXI.Container.call(this);

    this.graphics = new PIXI.Graphics();

    this.graphics.beginFill(0xFF0000);
    this.graphics.drawRect(0, 0, 20, 20);
    this.graphics.endFill();

    this.addChild(this.graphics);

    this.speed = 0.2;
}

Enemy.prototype = Object.create(PIXI.Container.prototype);

Enemy.prototype.update = function() {

	this.y += this.speed;
};