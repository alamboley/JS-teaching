function Point(posX, posY)
{
	PIXI.Graphics.call(this);

    this.beginFill(0xFFFFFF, 0.8);
    this.drawCircle(0, 0, 2);
    this.x = posX;
    this.y = posY;
    this.endFill();

    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
}

Point.prototype = Object.create(PIXI.Graphics.prototype);

Point.prototype.update = function()
{
    this.x += this.speedX;
    if (this.x < 0)
        this.x = 800;
    else if (this.x > 800)
        this.x = 0;

    this.y += this.speedY;
    if (this.y < 0)
        this.y = 600;
    else if (this.y > 600)
        this.y = 0;
}