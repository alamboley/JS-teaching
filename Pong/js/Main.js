function Main() {

    PIXI.Container.call(this);

    this.playerLeft = new Player(true);
    this.addChild(this.playerLeft);

    this.playerRight = new Player(false);
    this.addChild(this.playerRight);

    this.scorePlayerLeft = new PIXI.Text("0");
    this.scorePlayerRight = new PIXI.Text("0");

    this.scorePlayerLeft.x = 200;
    this.scorePlayerRight.x = 600;

    this.scorePlayerLeft.y = this.scorePlayerRight.y = 50;

    this.addChild(this.scorePlayerLeft);
    this.addChild(this.scorePlayerRight);

    this._addBall();
}

Main.prototype = Object.create(PIXI.Container.prototype);

Main.prototype.update = function() {

    this.playerRight.playerRightMovement();

    this.ball.updateBall();
};

Main.prototype._addBall = function () {

    this.ball = new Ball(this.playerLeft, this.playerRight);
    this.ball.x = renderer.width / 2;
    this.ball.y = renderer.height / 2;
    this.addChild(this.ball);

    this.ball.addListener("win", _win.bind(this));
}

function _win(data) {

    this.ball.removeListener("win", _win);
    this.removeChild(this.ball);

    if (data == 1)
        this.scorePlayerLeft.text = parseInt(this.scorePlayerLeft.text) + 1;
    else
        this.scorePlayerRight.text = parseInt(this.scorePlayerRight.text) + 1;

    this._addBall();
}