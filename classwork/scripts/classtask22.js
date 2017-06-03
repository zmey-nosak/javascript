/**
 * Created by Echetik on 25.05.2017.
 */
var myUtils = (function () {
        return {
            remove: function (array, index) {
                var b = array.slice(0);
                b.splice(index, 1)
                return b;
            },
            repeat: function (str, count) {
                return new Array(count + 1).join(str);
            },
            pluck: function (array, property_name) {
                var mas = [];
                for (var i = 0; i < array.length; i++) {
                    if (typeof array[i] === 'object' && (property_name in array[i])) {
                        mas.push(array[i][property_name]);
                    }
                }
                return mas;
            }
        }


    }()



);