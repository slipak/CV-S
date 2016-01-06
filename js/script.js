function accordion(){
    $('.vacancy-name').bind("click", function(e){
        $(this).toggleClass('show');
        if($(this).hasClass('show')){
            $(this).siblings('.vacancy-desc').stop(true, true).slideDown();
        }else{
            $(this).siblings('.vacancy-desc').stop(true, true).slideUp();
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
                        '<a class="btn btn-default btn-sm" href="mailto:recruiting@corevalue.net">Send CV</a>' +
                        '<span class="btn btn-default btn-sm applyLinkedin" href="">Apply with LinkedIn</span>' +
                        '</div></div>').appendTo('.vacancies-description');
                }
            }else{
                $('.vacancies-description').html('');
                $('<h4 class="no-vacancies">No vacancies</h4>').appendTo('.vacancies-description');
            }
        }
    }
    $('.applyLinkedin').click(function() {
        var $this = $(this),
          vacancyTitle = $this.closest('.vacancy').find('.vacancy-name').text();

        function funcSuccess(data){
            var firstName = data.firstName,
              lastName = data.lastName,
              headline = data.headline,
              linkedInUrl = data.siteStandardProfileRequest.url,

              linkedInData = {

                  'LinkedInName': lastName + ' ' + firstName,
                  'LinkedInHeadline': headline,
                  'LinkedInProfile': linkedInUrl,
                  'vacancyTitle': vacancyTitle

              };

            $.ajax({
                type: "POST",
                url: "./php/mail.php",
                data:  linkedInData,
                success: function(message){
                    dialogPopup('Message has been send!');
                },
                error: function(message){
                    console.log('error');
                }
            });
        }

        function funcError(error){
            console.log(error);
        }

        function getProfileData() {
            IN.API.Raw("/people/~:").result(funcSuccess).error(funcError);
        }

        if(IN.User.isAuthorized()) {
            getProfileData();
        } else {
            IN.User.authorize(getProfileData);
        }
    });
};
// Equal Height
//-----------------------------------------------------------------------------------------------------------

(function( $ ) {
    $.fn.equalheight = function() {
        Array.max = function( array ){
            return Math.max.apply( Math, array );
        };
        var heights = this.map(function() {
            $(this).height('auto');
            return $(this).height();
        }).get();
        return this.height(Array.max(heights));
    };
})(jQuery);

function dialogPopup(text) {
    var dialogHtml = '<div class="dialog-popup"><div class="mask"></div>'+
      '<div class="popup-block">'+
      '<a href="#" class="close-btn"></a>'+
      '<div class="text-block">'+ text +'</div>'+
      '</div>'+
      '</div>';


    $('.dialog-popup').remove();
    $(dialogHtml).appendTo('body').fadeIn();

    $('.dialog-popup .close-btn, .dialog-popup .mask').on('click', function (evt) {
        evt.preventDefault();
        $(this).closest('.dialog-popup').fadeOut();
    });
}

function popupHeight(){
    if ($(window).height() < 700){
        $('.popup').css({'height': $(window).height(), 'marginTop': -($(window).height() / 2)});
        $('.popup-menu').css('height', $(window).height() - 143);
        $('.vacancies-description').css('height', $(window).height() - 143);
        $('.policy-description').css('height', $(window).height() - 180);

        if (  ($(window).height() - 143) <= $('.popup-menu ul').height()){
            $('.popup-menu').css('overflowY', 'scroll');
            $('.menu-border-fix').hide();
        }else{
            $('.popup-menu').css('overflowY', 'hidden');
            $('.menu-border-fix').show();
        }
    }else{
        $('.popup').css({'height': 700,'marginTop': -350});
        $('.popup-menu').css('height', 554);
        $('.vacancies-description').css('height', 554);
        $('.policy-description').css('height', 553);
        $('.popup-menu').css('overflowY', 'hidden');
        $('.menu-border-fix').show();

    }
}

function formResponce(text) {
    $('#HelloForm input,#HelloForm textarea').val("");
    $('#HelloFormMessage').text(text).delay(3000).fadeOut('slow');
    $('#HelloFormProcessing').hide();
}

function highlightActiveItem() {
    var scrollPos = $(document).scrollTop();
    $('.top-nav ul a').each(function (evt) {
        var $currentLink = $(this),
          refElement = $($currentLink.attr('href'));

        if(refElement.position().top <= scrollPos  + 110 && refElement.position().top + refElement.height() > scrollPos ) {
            $currentLink.addClass('active').closest('li').siblings().find('a').removeClass('active');
        }
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            var lastElId = $('.footer').attr('id');
            $('.top-nav ul a[href="#'+lastElId+'"]').addClass('active').closest('li').siblings().find('a').removeClass('active');
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

// adaptive technologies items
//-----------------------------------------------------------------------------------------------------------

function technologiesGrid() {

    var $technologieItem = $('.technologies-list .technologies-item'),
      containerWidth = $('.technologies-list').width(),
      technologieItemLength = $technologieItem.length,
      widthItem = $technologieItem.width(),
      numberItemInRow = (containerWidth / widthItem).toFixed();

    $technologieItem.each(function (index) {
        var $this = $(this);
        $this.removeClass('top-row bottom-row');
        if(index < numberItemInRow) $this.addClass('top-row');
        if(index >= technologieItemLength - numberItemInRow) $this.addClass('bottom-row');
    });

}

$(document).ready(function(){

    // Gallery Pretty Photo
    //-----------------------------------------------------------------------------------------------------------

    $(".gallery a[rel^='prettyPhoto']").prettyPhoto({
        animation_speed:'fast',
        slideshow:10000,
        hideflash: true,
        social_tools:false,
        deeplinking: false,
        opacity: 0.9
    });

    // Show custom popup
    //-----------------------------------------------------------------------------------------------------------

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
                $('.popup-menu ul li a').on('click', function (evt) {
                   evt.preventDefault();
                    var $this = $(this);
                    $this.closest('li').addClass('active').siblings().removeClass('active');
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

    // scroll to anchor
    //-----------------------------------------------------------------------------------------------------------

    $('a[href*=#].anc').bind("click", function(e){
        var anchor = $(this),
            headerHeight = $('.header.tini').outerHeight();
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - headerHeight
        }, 700);
        highlightActiveItem();
        e.preventDefault();
        if(history.pushState) {
            history.pushState(null, null, $(anchor.attr('href')).selector);
        }
        else {
            location.hash = $(anchor.attr('href')).selector;
        }
        if($(window).width() < 975) {
            $('.top-nav ul').slideUp();
            $('.top-nav-btn').removeClass('active');
        }
    });

    // Hello Form submit
    //-----------------------------------------------------------------------------------------------------------

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

    // mobile show/hide menu button
    //-----------------------------------------------------------------------------------------------------------

    $('.top-nav-btn').on('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var $this = $(this),
            $topNav = $('.top-nav ul');

        if($this.hasClass('active')) {
            $this.removeClass('active');
            $topNav.slideUp();
        } else {
            $this.addClass('active');
            $topNav.slideDown(function () {
                $(document).on('click.namespace', function(e) {
                    if($(e.target).closest('.top-nav ul').length == 0) {
                        $('.top-nav ul').slideUp();
                        $this.removeClass('active');
                        $(document).off('click.namespace');
                    }
                });
            });
        }

    });

});

$(window).on({
    load: function () {
        headerTini();
        highlightActiveItem();
        $(window).scroll(function(){
            headerTini();
            highlightActiveItem();
        });
        $('.branch-list .branch-item').equalheight();
        technologiesGrid();
    },
    resize: function () {
        popupHeight();
        $('.branch-list .branch-item').equalheight();
        technologiesGrid();
    }
});




