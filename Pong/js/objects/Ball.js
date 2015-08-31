function Ball(playerLeft, playerRight) {

    PIXI.Graphics.call(this);

    this._playerLeft = playerLeft;
    this._playerRight = playerRight;

    this._VELOCITY_X = 5;
    this._velocityY = 0;

    this._movingToLeft = true;
    this._movingToTop = true;

    this.beginFill(0xFF0000);
    this.drawCircle(0, 0, 15);
    this.endFill();

}

Ball.prototype = Object.create(PIXI.Graphics.prototype);

Ball.prototype.updateBall = function() {

    this.x += this._movingToLeft ? - this._VELOCITY_X : this._VELOCITY_X;
    this.y += this._movingToTop ? this._velocityY : - this._velocityY;

    if (this._movingToLeft) {

        if (hitTest(this._playerLeft.x, this._playerLeft.y, this._playerLeft.width, this._playerLeft.height, this.x - this.width / 2, this.y, this.width, this.height)) {

            this._movingToLeft = false;

            _changeYBall.bind(this)(this._playerLeft);
        }

    } else {

        if (hitTest(this._playerRight.x, this._playerRight.y, this._playerRight.width, this._playerRight.height, this.x - this.width / 2, this.y, this.width, this.height)) {

            this._movingToLeft = true;

            _changeYBall.bind(this)(this._playerRight);
        }
    }

    if (this._movingToTop && this.y > renderer.height)
        this._movingToTop = false;

    else if (!this._movingToTop && this.y < 0)
        this._movingToTop = true;

    if (this.x < 0) {

        this.emit("win", 2);

    } else if (this.x > renderer.width) {

        this.emit("win", 1);
    }
};

function _changeYBall(player) {

    if (this.y > player.y + player.height * 0.75)
        this._velocityY = 10;

    else if (this.y < player.y + player.height * 0.25) {
        this._velocityY = 10;
        this._movingToTop = false;

    } else
        this._velocityY = 0;

}

function hitTest(x1, y1, w1, h1, x2, y2, w2, h2)  {

    if (x1 + w1 > x2)
        if (x1 < x2 + w2)
            if (y1 + h1 > y2)
                if (y1 < y2 + h2)
                    return true;

    return false;
}