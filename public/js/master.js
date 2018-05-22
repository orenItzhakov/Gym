class Master{

  constructor(){
    this.loadNav();
  }

  loadNav(){
    $(".addNav").load("nav.html",() => {

      $('.arrow').click(() => {
          if($(".pages").hasClass("close-top-bar")){
            this.openNav();
            localStorage.setItem('navBarStatus', 1);
          }
          else {
            this.closeNav(800);
            localStorage.setItem('navBarStatus', 0);
          }
      });

      $('.upUser').click(function() {
          $(".userBox").toggleClass("showBox");
      });

      this.setNameFromLocalStorage();

      this.colorNav();

      if(localStorage.getItem('navBarStatus')=="0") this.closeNav(0);

      setTimeout(function(){$(".pages").css("transition", "0.5s");}, 800);
    });
  }

  datePicker(arr){
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      str += "#" + arr[i] + ",";
    }
    str = str.substring(0, str.length-1);
    $(str).datepicker();
  }

  colorNav(){
    var str = window.location.href;
    var page = str.substring(str.lastIndexOf("/")+1,str.lastIndexOf(".html"));
    if(page=="homepage") $(".homepageColor").addClass("choose");
    else if(page=="trainees") $(".traineesColor").addClass("choose");
    else if(page=="about-us") $(".about-usColor").addClass("choose");
  }

  setNameFromLocalStorage(){
    $(".userNameVal").html(localStorage.getItem('userNameVal'));
  }

  openNav(){
    $(".pages").removeClass("close-top-bar", 800);
    $(".top-bar span").toggle("fast");
    $(".arrow").removeClass("arrow-right", 800);
    $(".arrow i").removeClass("rotate", 800);
  }

  closeNav(time){
    $(".pages").addClass("close-top-bar", time);
    $(".top-bar span").toggle("fast");
    $(".arrow").addClass("arrow-right", time);
    $(".arrow i").addClass("rotate", time);
  }

  async loadTraineesPage(gymRepo,traineesRenderer){
    let data = await gymRepo.getTrainees();
    traineesRenderer.renderTrainees(data);
  }
}

export default Master;
