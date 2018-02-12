$(function () {
    var start = $('#start');
    var startBtn = $('#startBtn');
    startBtn.on('click', function () {
        start.hide();
    });



    //
    // var nextQuestion = $('#nextQuestion');
    // var result = $('#result');
    // var wrap = $('#wrap');
    // nextQuestion.on('click', function () {
    //     wrap.hide();
    // });
    //
    //
    // var resultDetail = $('#resultDetail');
    // resultDetail.css('height', resultDetail.width() / 2 * 3);
    //

    var shareBtn = $('#shareBtn');
    var layer = $('#layer');
    shareBtn.on('click', function () {
        layer.toggle();
    });
    layer.on('click', function () {
        layer.toggle();
    });

});
