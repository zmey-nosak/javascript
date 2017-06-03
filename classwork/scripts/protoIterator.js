;(function () {
    window.Iterator = function (from, to) {
        this.from = from;
        this.to = to;
        this.curr = from;
        Iterator.prototype.iterate = function () {
            if (this.curr === this.to) {
                return this.curr;
            } else if (this.from < this.to) {
                return this.curr++;
            } else if (this.to < this.from) {
                return this.curr--;
            }
        }
    }
    ;

    window.ReverseIterator = function (from, to) {
        Iterator.call(this, from, to);
        ReverseIterator.prototype.reverserIterate = function () {
            if (this.curr === this.to) {
                var tmp = this.to;
                this.to = this.from;
                this.from = tmp;
            }
            return this.iterate();
        }
    };

    ReverseIterator.prototype.__proto__ = Iterator.prototype;
}());