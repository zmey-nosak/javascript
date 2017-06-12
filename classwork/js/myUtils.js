;(function () {
    window.SpaceInviders = function (el) {
        el.style.width = "800px";
        el.style.height = "800px";
        el.style.backgroundColor = 'black';
        el.style.position = 'relative';
        this.arrBullet = [];
        this.arrEnemy = [];
        this.gun = new Sprite(10, 350, 700, '../img/playerGun.png');
        el.appendChild(this.gun.elImg);
        this.el = el;
        for (var i = 0; i < 5; i++) {
            this.arrEnemy.push(new Sprite(5, 80 + 128 * i, 100, '../img/enemy1.png'));
            el.appendChild(this.arrEnemy[i].elImg);
        }

        var that = this;
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 37) {
                //vlevo
                that.gun.move(-1, 0);
            } else if (e.keyCode === 39) {
                that.gun.move(1, 0);
            } else if (e.keyCode === 38) {
                //vverh
                var bull = new Sprite(1, that.gun.x + 12, that.gun.y, '../img/bullet.png');
                that.arrBullet.push(bull);
                that.el.appendChild(bull.elImg);
            }
        });


        SpaceInviders.prototype.render = function () {
            that.gun.render();
            var dx = Math.round(Math.random() * 2 - 1);
            var dy = Math.round(Math.random() * 2 - 1);
            for (var i = 0; i < that.arrEnemy.length; i++) {
                that.arrEnemy[i].move(dx, dy);
                that.arrEnemy[i].render();
            }
            for (i = 0; i < that.arrBullet.length; i++) {
                that.arrBullet[i].move(0, -5);
                that.arrBullet[i].render();
            }
        };
        setInterval(that.render, 20);
    };

    function Sprite(speed, x, y, pathImg) {
        this.isAlive = true;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.pathImg = pathImg;

        this.elImg = document.createElement('img');
        this.elImg.style.position = 'absolute';
        this.elImg.src = this.pathImg;
        this.elImg.style.left = this.x + "px";
        this.elImg.style.top = this.y + "px";

        Sprite.prototype.move = function (dx, dy) {
            this.x += dx * this.speed;
            this.y += dy * this.speed;
        };

        Sprite.prototype.render = function () {
            this.elImg.style.left = this.x + "px";
            this.elImg.style.top = this.y + "px";
        };

        Sprite.prototype.death = function () {

        }
    }

}());