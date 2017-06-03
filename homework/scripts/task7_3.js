/**
 * Created by Echetik on 03.06.2017.
 */
var myUtils = (function () {
    return {
        min: function (arr) {
            var minIndex = 0;
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] < arr[minIndex]) {
                    minIndex = i;
                }
            }
            return arr[minIndex];
        },
        max: function (arr) {
            var maxIndex = 0;
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > arr[maxIndex]) {
                    maxIndex = i;
                }
            }
            return arr[maxIndex];
        },
        average: function (arr) {
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
            }
            return sum / arr.length;
        },
        clone: function (arr) {
            return arr.slice(0);
        }
    }
}());