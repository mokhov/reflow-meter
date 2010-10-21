$(function(){
    $('.b-tour-small-image img').each(function(){
        $(this).hide().closest('.b-tour-small-image').css('background', 'url(' + $(this).attr('src') + ')');
    });
})