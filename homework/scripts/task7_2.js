/**
 * Created by Echetik on 03.06.2017.
 */
function calc_(x) {
    return 1 / x + Math.sqrt(x);
}

describe("task_01 calc_sum_numbers_from_string", function () {
    var msg = "when x = 4 y= 2.25";
    it(msg, function () {
        var rez = calc_(4);
        expect(rez).toBe(2.25);
    });
});