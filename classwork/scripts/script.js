$(document).ready(function () {
    $("a").mouseover(function (e) {
        $("#tooltip_container")
            .text($(this).attr('data-tip-source'))
            .css(
                {
                    'display': 'block',
                    'opacity': 0
                }
            ).animate({'opacity': 1}, 1000);
    }).mousemove(function (e) {
        $("#tooltip_container").css(
            {
                'top': e.pageY,
                'left': e.pageX
            });
    }).mouseout(function (e) {
        $('#tooltip_container').animate({"opacity": 0}, 1000, function () {
            $(this).css({'display': "none"}).text("");
        });
    })
});