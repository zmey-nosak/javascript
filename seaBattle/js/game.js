/**
 * Created by Echetik on 07.06.2017.
 */
;(function () {
    window.Game = function () {
        Game.SHIPS_COUNT = 10;
        this.seaMapComputer = new SeaMap();
        this.seaMapUser = new SeaMap();

        this.compPlayer = new Player(this.seaMapComputer);
        this.userPlayer = new Player(this.seaMapUser);

        this.isGameOver = false;

        // Map.prototype.containsKey = function (key) {
        //     for (let k of this.keys()) {
        //         if (k.equals(key)) {
        //             return true;
        //         }
        //     }
        // };

        this.startGame = function () {
            this.seaMapComputer.show("computer_map");
            this.seaMapUser.show("user_map");
            this.compPlayer.generateShips();
            this.userPlayer.generateShips();
            var that = this;
            // for (var i = 0; i < 20; i++) {
            setInterval(function () {
                that.userPlayer.checkShoot(that.compPlayer.getRandomShoot(), that.compPlayer.lastCorrectShoots);
            }, 1000);
            // }
            $("#computer_map .cell").click(function (e) {
                var arr = $(this).attr("id").split(":");
                var shoot = new Point(parseInt(arr[0]), parseInt(arr[1]));
                that.compPlayer.checkShoot(shoot, this.userPlayer.lastCorrectShoots);
            });
            // document.write(this.compPlayer.ships);
            // document.write("<p>----------</p>");
            // document.write(this.userPlayer.ships);
            // this.seaMapComputer.showShips(this.seaBattle.ships);
        }
    };

    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.toString = function () {
            return "(" + x + "," + y + ")";
        }
    }

    function Ship(numOfDecks) {
        this.countOfDecks = numOfDecks;
        this.health = numOfDecks;
        this.startPoint = {};
        this.endPoint = {};
        this.isDestroy = false;
        this.isHorizontal = false;

        this.getCountOfDecks = function () {
            return this.countOfDecks;
        };

        this.getStartPoint = function () {
            return this.startPoint;
        };

        this.getEndPoint = function () {
            return this.endPoint;
        };

        this.setRandomPosition = function (arr) {
            var randIndex = Math.round(Math.random() * (arr.length - 1));
            var tmp = arr[randIndex] / 10;
            if (tmp < 1) {
                this.startPoint.x = arr[randIndex];
                this.startPoint.y = 0;
            } else {
                this.startPoint.x = arr[randIndex] % 10;
                this.startPoint.y = Math.trunc(tmp);
            }

            this.isHorizontal = Math.round(Math.random() * (1));
            // var max2 = (SeaMap.SIZE - 1);
            // var min = 0;
            this.directionX = 1;
            this.directionY = 1;
            console.log("generate " + this.countOfDecks + "-палубный...");
            console.log("isHorizontal " + this.isHorizontal);
            // this.startPoint.x = Math.round(Math.random() * (max2 - min) + min);
            // this.startPoint.y = Math.round(Math.random() * (max2 - min) + min);
            console.log("startPoint.x " + this.startPoint.x);
            console.log("startPoint.y " + this.startPoint.y);
            if (this.startPoint.x + (this.countOfDecks - 1) > (SeaMap.SIZE - 1)) {
                this.directionX = -this.directionX;
                console.log("directionX " + this.directionX);
            }
            if (this.startPoint.y + (this.countOfDecks - 1) > (SeaMap.SIZE - 1)) {
                this.directionY = -this.directionY;
                console.log("directionY " + this.directionY);
            }

            if (this.isHorizontal) {
                this.endPoint.x = this.startPoint.x + (this.countOfDecks - 1) * this.directionX;
                this.endPoint.y = this.startPoint.y;
                console.log("endPoint.x:" + this.endPoint.x);
                console.log("endPoint.y:" + this.endPoint.y)
            } else {
                this.endPoint.x = this.startPoint.x;
                this.endPoint.y = this.startPoint.y + (this.countOfDecks - 1) * this.directionY;
                console.log("endPoint.x:" + this.endPoint.x);
                console.log("endPoint.y:" + this.endPoint.y)
            }
            if ((this.isHorizontal === 1 && this.directionX < 0) || (this.isHorizontal === 0 && this.directionY < 0)) {
                var tmp = this.startPoint;
                this.startPoint = this.endPoint;
                this.endPoint = tmp;
            }
            return randIndex;
        };

        this.isIntersectWithAnotherShip = function (ship) {
            var isIntersectByX = true;
            var isIntersectByY = true;
            console.log("In the function of checking...");
            console.log(this.toString());
            console.log(ship.toString());

            if (this.startPoint.x > ship.endPoint.x + 1) {
                isIntersectByX = false;
            }
            if (this.endPoint.x < ship.startPoint.x - 1) {
                isIntersectByX = false;
            }
            if (this.startPoint.y > ship.endPoint.y + 1) {
                isIntersectByY = false;
            }
            if (this.endPoint.y < ship.startPoint.y - 1) {
                isIntersectByY = false;
            }
            console.log(isIntersectByX);
            console.log(isIntersectByY);
            console.log("result:" + isIntersectByX && isIntersectByY);
            return isIntersectByX && isIntersectByY;
        };

        this.setOwnCoordinates = function (map) {
            var setPoints = [];
            var point = {};
            if (!this.isHorizontal) {
                for (var i = 0; i < this.countOfDecks; i++) {
                    point = new Point(this.endPoint.x, this.endPoint.y - i);
                    map.set(point.toString(), this);
                    setPoints.push(parseInt(point.y + "" + point.x));
                    console.log("fill x, y:" + point.x + "," + point.y);
                }
            } else {
                for (var i = 0; i < this.countOfDecks; i++) {
                    point = new Point(this.endPoint.x - i, this.endPoint.y);
                    map.set(point.toString(), this);
                    setPoints.push(parseInt(point.y + "" + point.x));
                    console.log("fill x, y:" + point.x + "," + point.y);
                }
            }
            return setPoints;
        };

        this.lostHealth = function () {
            this.health--;
            if (this.health == 0) {
                this.isDestroy = true;
            }
        };

        this.toString = function () {
            var str = "</br>";
            switch (this.countOfDecks) {
                case 1:
                    str += "1-палубный корабль";
                    break;
                case 2:
                    str += "2-палубный корабль";
                    break;
                case 3:
                    str += "3-палубный корабль";
                    break;
                case 4:
                    str += "4-палубный корабль";
                    break;
            }
            return str += "(" + this.startPoint.x + "," + this.startPoint.y + "), (" + this.endPoint.x + "," + this.endPoint.y + ");";
        };

        this.getAllPoints = function () {
            var arr = [];
            var valueStart = parseInt(this.startPoint.y + "" + this.startPoint.x);
            if (this.startPoint.x === this.endPoint.x) {
                for (var i = -10; i <= 10 * this.countOfDecks; i += 10) {
                    this.calculatePoint(valueStart + i - 1, arr);
                    this.calculatePoint(valueStart + i, arr)
                    this.calculatePoint(valueStart + i + 1, arr);

                }
            } else {
                for (var i = -1; i <= this.countOfDecks; i++) {
                    this.calculatePoint(valueStart + 10 + i, arr);
                    this.calculatePoint(valueStart + i, arr);
                    this.calculatePoint(valueStart - 10 + i, arr);
                }
            }

            console.log(this.toString() + ": " + arr)
            return arr;
        };
        this.calculatePoint = function (value, arr) {
            if (value >= 0 && value <= 99) {
                arr.push(value);
            }
        }
    }

    function SeaMap() {
        SeaMap.SIZE = 10;
        SeaMap.EMPTYCELL = '.';
        SeaMap.DESTROYCELL = 43;
        SeaMap.SHIPCELL = 'X';
        SeaMap.MISSEDCELL = '*';

        this.cells = [];

        this.showString = function (s) {
            alert(s);
        };

        this.showDestroyFieldOnComputerMap = function (x, y) {
            var field = $(this.cells[y][x]);
            field.text(SeaMap.DESTROYCELL);

        };

        this.showMissedShootOnComputerMap = function (x, y) {
            var field = $(this.cells[y][x]);
            if (field.text() != SeaMap.DESTROYCELL) {
                field.text(SeaMap.MISSEDCELL);
            }
        };

        this.showMap = function (elId) {
            var el = document.getElementById(elId);
            var that = this;
            for (var y = 0; y < SeaMap.SIZE; y++) {
                this.cells[y] = [];
                for (var x = 0; x < SeaMap.SIZE; x++) {
                    var div = document.createElement("div");
                    div.setAttribute("id", x + ":" + y);
                    div.classList.add("cell");
                    el.appendChild(div);
                    this.cells[y][x] = div;
                }
            }
        };

        this.show = function (elId) {
            this.showMap(elId);
        };

        this.clearComputerMap = function () {
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    computerFields[i][j] = SeaMap.EMPTYCELL;
                }
            }
        };

        this.showShips = function (shipsArr) {
            for (var i = 0; i < shipsArr.length; i++) {
                var ship = shipsArr[i];
                if (!ship.isHorizontal) {
                    for (var j = 0; j < ship.countOfDecks; j++) {
                        var field = $(this.cells[ship.endPoint.y - j][ship.endPoint.x]);
                        field.text(SeaMap.SHIPCELL);
                    }
                } else {
                    for (var j = 0; j < ship.countOfDecks; j++) {
                        var field = $(this.cells[ship.endPoint.y][ship.endPoint.x - j]);
                        field.text(SeaMap.SHIPCELL);
                    }
                }
            }
        }
    }

    function Player(map) {
        this.map = map;
        this.coordinatesOfShips = new Map();
        this.lastCorrectShoots = [];
        this.mapForPossibleShoots = [];
        for (var i = 0; i < 100; i++) {
            this.mapForPossibleShoots.push(i);
        }


        this.isExistShips = function () {
            return this.coordinatesOfShips.isEmpty();
        };
        this.init = function () {
            this.clearMap();
            this.generateShips();
        };
        // this.doShoot = function () {
        //     var point = this.getRandomShoot();
        //     this.checkShoot(point);
        // };


        this.getRandomShoot = function () {
            var x = 0;
            var y = 0;
            Player.ALL_SIDES = 0;
            Player.LEFT = 1;
            Player.UP = 2;
            Player.RIGHT = 3;
            Player.DOWN = 4;
            console.log("lastCorrectShoots" + this.lastCorrectShoots);
            if (this.lastCorrectShoots.length === 0) {
                //Выстрел в случайное поле
                return this.getFinalShootPoint(this.mapForPossibleShoots);
            } else if (this.lastCorrectShoots.length === 1) {
                //Выстрел в случайное поле вокруг точки последнего попадания
                var lastShoot = this.lastCorrectShoots[0];
                var possibleShoots = this.getPossibleShoot(lastShoot.x, lastShoot.y, Player.ALL_SIDES);
                return this.getFinalShootPoint(possibleShoots);
            } else if (this.lastCorrectShoots.length > 1) {
                //определяем вертикально или горизонтально выставлен корабль
                if (this.lastCorrectShoots[0].x === this.lastCorrectShoots[1].x) {
                    var headOfShip = 0;
                    var tailOfShip = 0;
                    var min = 0;
                    var max = 0;
                    console.log("lastCorrectShoots:" + this.lastCorrectShoots);

                    for (var i = 1; i < this.lastCorrectShoots.length; i++) {
                        if (this.lastCorrectShoots[min].y > this.lastCorrectShoots[i].y) {
                            min = i;
                        }
                    }
                    for (var i = 1; i < this.lastCorrectShoots.length; i++) {
                        if (this.lastCorrectShoots[max].y < this.lastCorrectShoots[i].y) {
                            max = i;
                        }
                    }
                    console.log("min:" + min);
                    console.log("max:" + max);
                    headOfShip = this.lastCorrectShoots[min];
                    tailOfShip = this.lastCorrectShoots[max];
                    console.log("headOfShip:" + headOfShip);
                    console.log("tailOfShip:" + tailOfShip);
                    var possibleShoots = this.getPossibleShoot(headOfShip.x, headOfShip.y, Player.UP)
                        .concat(this.getPossibleShoot(tailOfShip.x, tailOfShip.y, Player.DOWN));
                    console.log("possibleShoots after:" + possibleShoots);
                    return this.getFinalShootPoint(possibleShoots);
                } else {
                    var min = 0;
                    var max = 0;
                    console.log("lastCorrectShoots:" + this.lastCorrectShoots);
                    for (var i = 1; i < this.lastCorrectShoots.length; i++) {
                        if (this.lastCorrectShoots[min].x > this.lastCorrectShoots[i].x) {
                            min = i;
                        }
                    }
                    for (var i = 1; i < this.lastCorrectShoots.length; i++) {
                        if (this.lastCorrectShoots[max].x < this.lastCorrectShoots[i].x) {
                            max = i;
                        }
                    }
                    console.log("min:" + min);
                    console.log("max:" + max);
                    headOfShip = this.lastCorrectShoots[min];
                    tailOfShip = this.lastCorrectShoots[max];
                    console.log("headOfShip:" + headOfShip);
                    console.log("tailOfShip:" + tailOfShip);
                    var arrayForPossibleShoots = this.getPossibleShoot(headOfShip.x, headOfShip.y, Player.LEFT)
                        .concat(this.getPossibleShoot(tailOfShip.x, tailOfShip.y, Player.RIGHT));
                    return this.getFinalShootPoint(arrayForPossibleShoots);
                }
            }
        };

        this.getFinalShootPoint = function (arr) {
            console.log("possible:" + arr);
            var randIndex = Math.round(Math.random() * (arr.length - 1));
            var value = arr[randIndex];
            if (value < 10) {
                x = value;
                y = 0;
            } else {
                x = value % 10;
                var tmp = value / 10;
                y = Math.trunc(tmp);
            }
            var indexForRemoving = 0;
            for (indexForRemoving = 0; indexForRemoving < this.mapForPossibleShoots.length; indexForRemoving++) {
                if (value === this.mapForPossibleShoots[indexForRemoving]) {
                    break;
                }
            }
            this.mapForPossibleShoots.splice(indexForRemoving, 1);
            console.log(x + "," + y);
            return new Point(x, y);

        };

        // this.checkShoot = function (point) {
        //     if (this.coordinatesOfShips.has(point.toString())) {
        //         var ship = this.map.coordinatesOfShips.get(point.toString());
        //         this.coordinatesOfShips.delete(point.toString());
        //         this.lastCorrectShoots.push(point);
        //         ship.lostHealth();
        //         var notify = "Попадание! ";
        //         this.map.showDestroyFieldOnComputerMap(point.x, point.y);
        //         if (ship.isDestroy) {
        //             notify = notify + ship.toString() + " потоплен";
        //             this.lastCorrectShoots.clear();
        //         }
        //         this.openEmptyFieldsAroundDestroyDeck(point, ship);
        //         console.log(notify);
        //     }
        //     else {
        //         this.map.showMissedShootOnComputerMap(point.x, point.y);
        //     }
        // };

        this.getPossibleShoot = function (x, y, direction) {
            var arr = [];
            var coordinates = parseInt(y + "" + x);
            switch (direction) {
                case Player.ALL_SIDES:
                    if (x - 1 >= 0) {
                        this.checkAndCollectPossiblePointsForShooting(coordinates - 1, arr);
                    }
                    this.checkAndCollectPossiblePointsForShooting(coordinates - 10, arr);
                    if (x + 1 <= 9) {
                        this.checkAndCollectPossiblePointsForShooting(coordinates + 1, arr);
                    }
                    this.checkAndCollectPossiblePointsForShooting(coordinates + 10, arr);
                    break;
                case Player.LEFT:
                    if (x - 1 >= 0) {
                        this.checkAndCollectPossiblePointsForShooting(coordinates - 1, arr);
                    }
                    break;
                case Player.RIGHT:
                    if (x + 1 <= 9) {
                        this.checkAndCollectPossiblePointsForShooting(coordinates + 1, arr);
                    }
                    break;
                case Player.UP:
                    this.checkAndCollectPossiblePointsForShooting(coordinates - 10, arr);
                    break;
                case Player.DOWN:
                    this.checkAndCollectPossiblePointsForShooting(coordinates + 10, arr);
                    break;
            }
            return arr;
        };

        this.checkAndCollectPossiblePointsForShooting = function (coordinates, arr) {
            if (coordinates >= 0 && coordinates <= 99) {
                for (var i = 0; i < this.mapForPossibleShoots.length; i++) {
                    if (coordinates === this.mapForPossibleShoots[i]) {
                        arr.push(coordinates);
                        return;
                    }
                }
            }
        };

        this.generateShips = function () {
            var ships = [];
            var coordinatesOfEmptyCells = [];
            for (var i = 0; i < 100; i++) {
                coordinatesOfEmptyCells.push(i);
            }
            var tmp = {};
            for (var i = 0; i < Game.SHIPS_COUNT; i++) {
                if (i < 1) {
                    tmp = new Ship(4);
                } else if (i < 3) {
                    tmp = new Ship(3);
                } else if (i < 6) {
                    tmp = new Ship(2);
                } else {
                    tmp = new Ship(1);
                }
                var isIntersect = true;
                var randIndex = 0;
                while (isIntersect) {
                    isIntersect = false;
                    randIndex = tmp.setRandomPosition(coordinatesOfEmptyCells);
                    for (var j = 0; j < i; j++) {
                        console.log("сравниваем " + tmp.toString() + " c " + ships[j].toString())
                        if (tmp.isIntersectWithAnotherShip(ships[j])) {
                            isIntersect = true;
                            break;
                        }
                    }
                }
                var arr = tmp.getAllPoints();
                ships[i] = tmp;
                tmp.setOwnCoordinates(this.coordinatesOfShips);
                var indexesForDeleting = [];
                for (var y = 0; y < arr.length; y++) {
                    for (var j = 0; j < coordinatesOfEmptyCells.length; j++) {
                        if (arr[y] === coordinatesOfEmptyCells[j]) {
                            indexesForDeleting.push(j);
                        }
                    }
                }
                for (var j = 0; j < indexesForDeleting.length; j++) {
                    coordinatesOfEmptyCells.splice(indexesForDeleting[j], 1);
                }
            }
        };

        // this.checkAndCollectPossiblePointsForShooting = function (val, arr) {
        //     if (val >= 0 && val <= 99) {
        //         arr.push(val);
        //     }
        // };

        // this.checkShoot = function (shoot) {
        //     if (this.coordinatesOfShips.has(shoot.toString())) {
        //         var ship = this.coordinatesOfShips.get(shoot.toString());
        //         var s = "Попадание! ";
        //         ship.lostHealth();
        //         map.showDestroyFieldOnComputerMap(shoot.x, shoot.y);
        //         this.coordinatesOfShips.delete(shoot.toString());
        //         if (ship.isDestroy) {
        //             s = s + ship.toString() + " потоплен";
        //         }
        //         this.openEmptyFieldsAroundDestroyDeck(shoot, ship);
        //     } else {
        //         map.showMissedShootOnComputerMap(shoot.x, shoot.y);
        //     }
        // };
        this.checkShoot = function (point, arr) {
            if (this.coordinatesOfShips.has(point.toString())) {
                var ship = this.coordinatesOfShips.get(point.toString());
                this.coordinatesOfShips.delete(point.toString());
                //say another player to push value in lastCorrectShoots
                arr.push(point);
                ship.lostHealth();
                var notify = "Попадание! ";
                this.map.showDestroyFieldOnComputerMap(point.x, point.y);
                if (ship.isDestroy) {
                    notify = notify + ship.toString() + " потоплен";
                    //say another player to clear lastCorrectShoots
                    arr.splice(0);
                }
                this.openEmptyFieldsAroundDestroyDeck(point, ship);
                console.log(notify);
            }
            else {
                this.map.showMissedShootOnComputerMap(point.x, point.y);
            }
        };

        this.openEmptyFieldsAroundDestroyDeck = function (shoot, ship) {
            if (shoot.y - 1 >= 0 && shoot.x - 1 >= 0) {
                // seaMap.showMissedShootOnComputerMap(shoot.y - 1, shoot.x - 1);
                map.showMissedShootOnComputerMap(shoot.x - 1, shoot.y - 1);
            }
            if (shoot.y + 1 < SeaMap.SIZE && shoot.x - 1 >= 0) {
                // seaMap.showMissedShootOnComputerMap(shoot.y + 1, shoot.x - 1);
                map.showMissedShootOnComputerMap(shoot.x - 1, shoot.y + 1);
            }
            if (shoot.y - 1 >= 0 && shoot.x + 1 < SeaMap.SIZE) {
                // seaMap.showMissedShootOnComputerMap(shoot.y - 1, shoot.x + 1);
                map.showMissedShootOnComputerMap(shoot.x + 1, shoot.y - 1);
            }
            if (shoot.y + 1 < SeaMap.SIZE && shoot.x + 1 < SeaMap.SIZE) {
                // seaMap.showMissedShootOnComputerMap(shoot.y + 1, shoot.x + 1);
                map.showMissedShootOnComputerMap(shoot.x + 1, shoot.y + 1);
            }
            if (ship.isDestroy) {
                if (ship.isHorizontal || ship.getCountOfDecks() == 1) {
                    if (ship.getStartPoint().x - 1 >= 0) {
                        map.showMissedShootOnComputerMap(ship.getStartPoint().x - 1, ship.getStartPoint().y);
                    }
                    if (ship.getEndPoint().x + 1 < SeaMap.SIZE) {
                        map.showMissedShootOnComputerMap(ship.getEndPoint().x + 1, ship.getEndPoint().y);
                    }
                }
                if (!ship.isHorizontal || ship.getCountOfDecks() == 1) {
                    if (ship.getStartPoint().y - 1 >= 0) {
                        map.showMissedShootOnComputerMap(ship.getStartPoint().x, ship.getStartPoint().y - 1);
                    }
                    if (ship.getEndPoint().y + 1 < SeaMap.SIZE) {
                        map.showMissedShootOnComputerMap(ship.getEndPoint().x, ship.getEndPoint().y + 1);
                    }
                }
            }
        };
    }
}());