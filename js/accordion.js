$(document).ready(function(){
    //popup accordion
    $('.vacancy-name').bind("click", function(e){
        $(this).toggleClass('show');
        if($(this).hasClass('show')){
            $(this).siblings('.vacancy-desc').slideDown();
        }else{
            $(this).siblings('.vacancy-desc').slideUp();
        }
    });
});