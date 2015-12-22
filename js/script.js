function accordion(){
    $('.vacancy-name').bind("click", function(e){
        $(this).toggleClass('show');
        if($(this).hasClass('show')){
            $(this).siblings('.vacancy-desc').slideDown();
        }else{
            $(this).siblings('.vacancy-desc').slideUp();
        }
    });
};
function insertVacancy(response, cityName){
    for(var propt in response){
        var objCity = response[propt];
        if(propt == cityName){
            if(objCity.length !== 0){
                $('.vacancies-description').html('');
                for(var proptInner in objCity){
                    $('<div class="vacancy">' +
                        '<h4 class="vacancy-name">' + objCity[proptInner].title + '</h4>' +
                        '<div class="vacancy-desc">' +
                         objCity[proptInner].content +
                        '<a class="btn red" href="mailto:recruiting@malkosua.com">Send CV</a>' +
                        '<span class="btn blue applyLinkedin" href="">Apply with LinkedIn</span>' +
                        '<script src="//platform.linkedin.com/in.js" type="text/javascript">' +
                            'api_key: hfr3bzpf13kw' +
                        '</script>' +
                        '<script type="IN/Apply" data-companyname="Malkos"' +
                        'data-jobtitle="' + objCity[proptInner].title + '"'+
                        'data-joblocation="Ukraine"' +
                        'data-themecolor="#ee1d24"' +
                        'data-email="recruiting@malkosua.com">'+
                        '</script>' +
                        '</div></div>').appendTo('.vacancies-description');
                }
            }else{
                $('.vacancies-description').html('');
                $('<h4 class="no-vacancies">No vacancies</h4>').appendTo('.vacancies-description');
            }
        }
    }
    $('.applyLinkedin').click(function() {
        $(this).parent().find('.IN-widget a').parent().click();
    });
};

function popupHeight(){
    if ($(window).height() < 700){
        $('.popup').css({'height': $(window).height(), 'marginTop': -($(window).height() / 2)});
        $('.popup-menu').css('height', $(window).height() - 86);
        $('.vacancies-description').css('height', $(window).height() - 86);
        $('.policy-description').css('height', $(window).height() - 126);

        if (  ($(window).height() - 86) <= $('.popup-menu ul').height()){
            $('.popup-menu').css('overflowY', 'scroll');
            $('.menu-border-fix').hide();
        }else{
            $('.popup-menu').css('overflowY', 'hidden');
            $('.menu-border-fix').show();
        }
    }else{
        $('.popup').css({'height': 700,'marginTop': -350});
        $('.popup-menu').css('height', 614);
        $('.vacancies-description').css('height', 600);
        $('.policy-description').css('height', 553);
        $('.popup-menu').css('overflowY', 'hidden');
        $('.menu-border-fix').show();

    }
}

function formResponce(text) {
    $('#HelloForm input:text,#HelloForm textarea').val("");
    $('#HelloFormMessage').text(text).delay(3000).fadeOut('slow');
    $('#HelloFormProcessing').hide();
}

function highlightActiveItem() {
    var scrollPos = $(document).scrollTop();
    $('.top-nav a').each(function (evt) {
        var $currentLink = $(this),
          refElement = $($currentLink.attr('href'));

        if(refElement.position().top <= scrollPos  + 110 && refElement.position().top + refElement.height() > scrollPos ) {
            $currentLink.addClass('active').closest('li').siblings().find('a').removeClass('active');
        }
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            var lastElId = $('.footer').attr('id');
            $('.top-nav a[href="#'+lastElId+'"]').addClass('active').closest('li').siblings().find('a').removeClass('active');;
        }
    });
}

function headerTini() {
    var scrollPos = $(document).scrollTop();
    if($(this).scrollTop() > 0 && scrollPos > 0){
        $('.header').addClass('tini');
    }else{
        $('.header').removeClass('tini');
    }
}

$(document).ready(function(){


    highlightActiveItem();
    headerTini();


    //
//    $('.top-header').videoBG({
//        mp4:'video/startup.mp4',
//        ogv:'video/startup.ogv',
//        webm:'video/startup.webm',
//        scale:true,
//        height:640,
//        zIndex:0,
//        opacity:0.6
//    });

    //prettyPhoto
    $(".gallery a[rel^='prettyPhoto']").prettyPhoto({
        animation_speed:'fast',
        slideshow:10000,
        hideflash: true,
        social_tools:false,
        deeplinking: false,
        opacity: 0.9
    });

    //popup
    $('.popup-show-policy').click(function(){
        $('.popup-bg').show();
        $('.popup-policy').show();
        return false;
    });
    $('.popup-show').click(function(){
        $('.popup-bg').show();
        $('.popup-vacancies').show();
        popupHeight();
        var dataCity = $(this).attr("data-city");

        $.ajax({
            url: "./php/vacancies.php",
            dataType: "json",
            beforeSend: function() {
                $('.vacancies-description').html('<p style="margin-top: 15px; margin-left: 30px;">Wait...</p>');
            },
            success: function(response){
                //menu
                $(".popup-menu ul").html("");
                for(var propt in response){
                    $("<li><a href=\"#\">" + propt + "</a></li>").appendTo(".popup-menu ul");
                }
                //show primary vacancy
                    $('.popup-menu li').removeClass('active');
                    $('.popup-menu li').each(function(){
                        if ($(this).children('a').html() == dataCity){
                            $(this).addClass('active');
                        }
                    });
                    insertVacancy(response, dataCity);
                //show vacancy
                $('.popup-menu ul li').click(function(){
                    $('.popup-menu li').removeClass('active');
                    $(this).addClass('active');
                    var listCity = $(this).text();
                    insertVacancy(response, listCity);
                    accordion();
                    IN.parse(document.body);
                    return false;
                });
                accordion();
            }
        });
    });
    $('.popup-close, .popup-bg').click(function(){
        $('.popup-bg').hide();
        $('.popup-vacancies, .popup-policy').hide();
    });

    //scrolling
    $('a[href*=#].anc').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 69
        }, 700);
        highlightActiveItem();
        e.preventDefault();
        if(history.pushState) {
            history.pushState(null, null, $(anchor.attr('href')).selector);
        }
        else {
            location.hash = $(anchor.attr('href')).selector;
        }
    });

    $('#HelloForm').submit(function(e) {
        $('.empty-field').each(function() {
            $(this).removeClass("empty-field");
        });

        var emptyTextBoxes = $('#HelloForm input:text,#HelloForm textarea').filter(function() { return $.trim(this.value) == ""; });
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
});

$(window).load(function(){
    highlightActiveItem();
    $(window).scroll(function(){
        headerTini();
        highlightActiveItem();
    });
});

$(window).resize(function(){
   popupHeight();
});




