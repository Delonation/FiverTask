
$( window ).resize(function() {
    //Function
  
});


$(document).ready(function(){
    //Function
    

     // Nice Select
     $('select').niceSelect();
    

     //Menu Js
     $('.menu_toggle_btn').click(function(){
        $('.header_wrapper').toggleClass('open_menu');
        $('html').toggleClass('cm-overflow');
    });
    $('.close_menu_btn, .menu_block ul li a').click(function(){
        $('.header_wrapper').removeClass('open_menu');
        $('html').removeClass('cm-overflow');
    });

    $( window ).load(function() {
        $('body').addClass( "animation" );
      });
  

});




