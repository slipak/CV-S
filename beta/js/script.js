$(document).ready(function(){
    $('.contact-form input, .textarea textarea').focusin(function(){
      $(this).siblings('label').show();
    });
    $('.contact-form input, .textarea textarea').focusout(function(){
        $(this).siblings('label').hide();
    });

    /*form*/
    $('#HelloForm').submit(function(e) {
        $('.empty-field').each(function() {
            $(this).removeClass("empty-field");
        });

        var emptyTextBoxes = $('#HelloForm input:text, #HelloForm textarea').filter(function() { return $.trim(this.value) == ""; });
        if (emptyTextBoxes.length) {
            emptyTextBoxes.each(function() {
                $(this).addClass("empty-field");
            });
            return false;
        }

        $.ajax({
            type: "POST",
            url: "./php/mail.php",
            data: $(this).serialize(),
            beforeSend: function() {
                $('#HelloFormProcessing').show();
                $('#HelloFormMessage').stop().text('Sending...').show();
            },
            success: function(msg){
                var text = (msg == 1) ? 'Message sent. Thank you!' : 'Sending failed. Please try later.';
                formResponce(text);
            },
            error: function() {
                formResponce('Sending failed. Please try later.');
            }
        });

        return false;
    });
    /*popup*/
    //popup
    $('.popup-show-policy').click(function(){
        $('.popup-bg').show();
        $('.popup-policy').show();
        return false;
    });
    $('.popup-close').click(function(){
        $('.popup-bg').hide();
        $('.popup-vacancies, .popup-policy').hide();
    });

    $('a[href*=#].anc').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 700);
        e.preventDefault();
        if(history.pushState) {
            history.pushState(null, null, $(anchor.attr('href')).selector);
        }
        else {
            location.hash = $(anchor.attr('href')).selector;
        }
    });
});

function formResponce(text) {
    $('#HelloForm input:text,#HelloForm textarea').val("");
    $('#HelloFormMessage').text(text).delay(3000).fadeOut('slow');
    $('#HelloFormProcessing').hide();
}