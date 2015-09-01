function Cell(i, j, type, color) {

    this._i = i;
    this._j = j;
    this.type = type;
    this.color = typeof color !== 'undefined' ? color : 0;
}

Object.defineProperty(Cell.prototype, 'i', {

    get: function() {
        return this._i;
    }
});

Object.defineProperty(Cell.prototype, 'j', {

    get: function() {
        return this._j;
    }
});