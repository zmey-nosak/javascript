var myUtils = (function () {
        return {
            createGamePlace: function (id, n) {
                var arr = [];
                for (var i = 0; i < Math.pow(n, 2); i++) {
                    arr.push(i + 1);
                }
                var div = document.getElementById(id);
                var tbl = document.createElement("table");
                div.append(tbl);
                for (i = 0; i < n; i++) {
                    var tr = document.createElement("tr");
                    tbl.append(tr);
                    for (var j = 0; j < n; j++) {
                        var td = document.createElement("td");
                        fillField(td, n, arr);
                        td.style = getRandomStyle();
                        tr.append(td);
                    }
                }

                var a = 1;
                div.addEventListener('click', function (e) {
                    if (e.target.tagName === 'TD') {
                        var content = parseInt(e.target.innerText);
                        if(content===a){
                            a++;
                            e.target.style.backgroundColor="rgb(255,0,0)";
                        }
                    }
                }, false);
            }
        };
        function fillField(field, n, arr) {
            var index = rnd(0, arr.length - 1);
            field.innerText = arr[index] + "";
            arr.splice(index, 1);
        }

        function rnd(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        function getRandomStyle() {
            return "font-size:" + rnd(10, 34) + "px; color:" + getRandomColor() + ";";
        }

        function getRandomColor() {
            return "rgb(" + rnd(0, 255) + "," + rnd(0, 255) + "," + rnd(0, 255) + ")";
        }
    }()
);
