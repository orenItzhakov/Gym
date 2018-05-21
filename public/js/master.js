$(function() {

    $(".addNav").load("nav.html",function() {
      $(".userNameVal").html(localStorage.getItem('userNameVal'));

      $('.arrow').click(function() {
          $(".pages").toggleClass("close-top-bar", 800);
          $(".top-bar span").toggle("fast");
          $(".arrow").toggleClass("arrow-right", 800);
          $(".arrow i").toggleClass("rotate", 800);
      });

      $('.upUser').click(function() {
          $(".userBox").toggleClass("showBox");
      });
    });


});
