$(document).ready(function () {
    let count = 0;
    const wordBank = new Set();
    let timer = 60;
    const countDownTimer = setInterval(countDown, 1000);
    $('form').on('submit', function (event) {
        event.preventDefault();
        axios({
                method: 'POST',
                url: '/check',
                data: {
                    word: $('#word').val()
                }
            })
            .then(function (res) {
                timer = 60;
                if (res.data.result) {
                    if (!$('#word').val()) {
                        return;
                    }
                    if (wordBank.has($('#word').val())) {
                        $('.msg').text(`"${$('#word').val()}" has already been found!`);
                        return;
                    }
                    if (res.data.result === "ok") {
                        wordBank.add($('#word').val());
                        count = count + $('#word').val().length;
                        showScore();
                        $('.msg').text(`"${$('#word').val()}" is a valid word!`);
                    } else if (res.data.result === "not-word") {
                        $('.msg').text(`"${$('#word').val()}" is not a word!`);
                    } else {
                        $('.msg').text(`"${$('#word').val()}" doesn't exist!`);
                    }
                } else {
                    $('.msg').text('Please input a valid word!');
                }
            });
    });

    function showScore() {
        $('.score').text(count);
    }

    function countDown() {
        if (timer > 0) {
            timer = timer - 1;
            $('.timer').text(timer);
        } else {
            checkTime();
        }
    }

    function checkTime() {
        disable();
        clearInterval(countDownTimer);
        alert("Game Over!");
    }

    function disable() {
        $('.add_word').hide();
    }

});