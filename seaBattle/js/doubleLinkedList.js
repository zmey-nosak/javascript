/**
 * Created by Echetik on 07.06.2017.
 */
;(function () {
    window.DoubleLinkedList = function () {
        this.length = 0;
        this.head = null;
        this.tail = null;
        this.put = function (key, value) {
            var tmp = new Node(key, value);
            if (this.length === 0) {
                this.head = tmp;
                this.tail = tmp;
            }
            else {
                tmp.next = this.head;
                this.head.prev = tmp;
                this.head = tmp;
            }
            this.length++;
        };
        this.pop = function () {
            if (this.length > 1) {
                var tmp = this.head;
                this.head = tmp.next;
                this.head.prev = null;
                this.length--;
                return tmp.key;
            } else if (this.length === 1) {
                this.length--;
                this.head = null;
                this.tail = null;
                return null;
            } else {
                return null;
            }
        };
        this.remove = function (key) {
            var node = this.head;
            while (node) {
                if (node.key.equals(key)) {
                    if (node === this.head && node !== this.tail) {
                        this.pop();
                    } else if (node === this.tail) {
                        this.shift();
                    } else {
                        node.prev.next = node.next;
                        node.next.prev = node.prev;
                        node.next = null;
                        node.prev = null;
                        this.length--;
                    }
                    break;
                } else
                    node = node.next;
            }

        };
        this.get = function (key) {
            var node = this.head;
            while (node) {
                if (node.key.equals(key))return node.value;
                node = node.next;
            }
        };
        this.containsKey = function (key) {
            var node = this.head;
            while (node) {
                if (node.key.equals(key))return true;
                node = node.next;
            }
            return false;
        };
        this.toString = function () {
            var str = "";
            var node = this.head;
            while (node) {
                str += node.key + ",";
                node = node.next;
            }
            return str.slice(0, str.length - 1);
        };
        this.unShift = function (key, value) {
            var tmp = new Node(key, value);
            if (this.length === 0) {
                this.head = tmp;
                this.tail = tmp;
            }
            else {
                tmp.prev = this.head;
                this.tail.next = tmp;
                this.tail = tmp;
            }
            this.length++;
        };
        this.shift = function () {
            if (this.length > 1) {
                var tmp = this.tail;
                this.tail = tmp.prev;
                this.tail.next = null;
                this.length--;
                return tmp.key;
            } else if (this.length === 1) {
                this.length--;
                this.head = null;
                this.tail = null;
                return null;
            } else {
                return null;
            }
        };
        this.toKeyArray = function () {
            var arr = [];
            var node = this.head;
            while (node) {
                arr.push(node.key);
                node = node.next;
            }
            return arr;
        };
    };

    var Node = function (key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    };
})();