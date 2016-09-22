function Main() {

    PIXI.Container.call(this);

    var graphics = new PIXI.Graphics();

    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, 800, 600);
    graphics.endFill();

    this.addChild(graphics);

    this.enemies = [];
    this.missiles = [];

    for (var i = 0; i < 15; ++i) {

        var enemy = new Enemy();

        enemy.x = i * 50;

        this.addChild(enemy);

        this.enemies.push(enemy);
    }

    this.interactive = true;
    this.on('mousedown', onDown);
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.update = function() {

    this.enemies.forEach(function(enemy) {

        enemy.update();
    });

    this.missiles.forEach(function(missile) {

        missile.update();
    });
};

function onDown(mouseData) {

    var mouse = mouseData.data.global;

    var missile = new Missile();

    missile.x = 800 / 2;
    missile.y = 600;

    missile.rotation = Math.atan2(mouse.y - missile.y, mouse.x - missile.x);

    this.addChild(missile);

    this.missiles.push(missile);
}