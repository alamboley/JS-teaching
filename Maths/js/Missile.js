function Missile() {

    PIXI.Container.call(this);

    this.graphics = new PIXI.Graphics();

    this.graphics.beginFill(0x00FF00);
    this.graphics.drawRect(0, 0, 20, 20);
    this.graphics.endFill();

    this.addChild(this.graphics);

    this.speed = 2;
}

Missile.prototype = Object.create(PIXI.Container.prototype);

Missile.prototype.update = function() {

	this.x += this.speed * Math.cos(this.rotation);
	this.y += this.speed * Math.sin(this.rotation);;
};