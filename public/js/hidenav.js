if ( $(window).width() > 769) {   
var mywindow = $(window);
var mypos = mywindow.scrollTop();
var up = false;
var newscroll;
mywindow.scroll(function () {
    newscroll = mywindow.scrollTop();
    if (newscroll > mypos && !up) {
        $('.slidd').stop().fadeOut(730);
        up = !up;
        console.log(up);
    } else if(newscroll < mypos && up) {
        $('.slidd').stop().fadeIn(300);
        up = !up;
    }
    mypos = newscroll;
});
}