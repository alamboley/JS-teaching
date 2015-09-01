function Player(isPlayerLeft) {

    PIXI.Graphics.call(this);

    this._isPlayerLeft = isPlayerLeft;

    this._KEYBOARD_VELOCITY_Y = 10;

    this._moveUp = false;
    this._moveDown = false;

    this.addListener("added", _addedToStage);

    if (this._isPlayerLeft)
        this.interactive = true;
}

Player.prototype = Object.create(PIXI.Graphics.prototype);

function _addedToStage(data) {

    this.removeListener("added", _addedToStage);

    this.beginFill(0x000000, 1);
    this.drawRect(0, 0, 20, 150);
    this.endFill();

    this.x = this._isPlayerLeft ? 15 : renderer.width - this.width - 15;
    this.y = (renderer.height - this.height) / 2;

    if (this._isPlayerLeft)
        this.addListener('mousemove', _mouseMoveCallback);

    else {
        window.addEventListener('keydown', _keyDownCallback.bind(this));
        window.addEventListener('keyup', _keyDownCallback.bind(this));
    }
}

function _mouseMoveCallback(mouseData) {

    mouseData.target.y = mouseData.data.global.y;
}

function _keyDownCallback(keyData) {

    if (keyData.keyCode == KeyboardEvent.DOM_VK_UP)
        this._moveUp = keyData.type == "keydown";

    else if (keyData.keyCode == KeyboardEvent.DOM_VK_DOWN)
        this._moveDown = keyData.type == "keydown";
}

Player.prototype.playerRightMovement = function() {

    this.y += this._moveUp ? -this._KEYBOARD_VELOCITY_Y : this._moveDown ? this._KEYBOARD_VELOCITY_Y : 0;

    if (this.y < 0)
        this.y = 0;

    else if (this.y + this.height > renderer.height)
        this.y = renderer.height - this.height;
};
