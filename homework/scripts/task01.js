/**
 * Created by Echetik on 25.05.2017.
 */
function calc_sum_numbers(str) {
    var sum = 0;
    for (var i = 0; i < str.length; i++) {
        x = parseInt(str[i]);
        if (!isNaN(x)) sum += x;
    }
    return sum;
}

function eps(x, y) {
    return (
        (1 + Math.pow(Math.sin(x + y),2))/(2 + Math.abs((x - 2 * x) / (1 - Math.pow(x,2) * Math.pow(y,2))))) + x

}


describe("task_01 calc_sum_numbers_from_string", function () {
    var inputStr = '11fdf11';
    var msg = "Sum numbers from " + inputStr + " is 4";
    it(msg, function () {
        var rez = calc_sum_numbers(inputStr);
        expect(rez).toBe(4);
    });
    it("1", function () {
        expect(eps(1, 1)).toBe(1);
    });
    it("1", function () {
        expect(eps(1, 1)).toBe(1);
    });
});