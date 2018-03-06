require('fancybox')($);
require('owl.carousel');
//require("fancybox");

let thmb_dir = "assets/photo/thmb";
let full_dir = "assets/photo";
let fileextension = ".jpg";
$(function () {
  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: thmb_dir,
    success: function (data) {
      // console.log(data);
      //List all .png file names in the page
      $(data).find("a:contains(" + fileextension + ")").each(function () {
        let filename = this.href.replace(window.location.host, "").replace("http://", "");
        $("#sliderThmb").append("<a href='" + full_dir + filename + "'><img src='" + thmb_dir + filename + "'></a>");
      });
      let sliderThmb = $("#sliderThmb");
      sliderThmb.owlCarousel({
        margin: 6,
        nav: false,
        dots: false,
        loop:true,
        responsiveClass: true,
        responsive: {
          0: {items: 3},
          420: {items: 4},
          600: {items: 5},
          800: {items: 6},
          1000: {items: 10},
          1600: {items: 15}
        }
      });
      let src = sliderThmb.find(".owl-item").eq(0).find("a").attr('href');
      $("#sliderPic").html("<a href='" + src + "' data-fancybox data-width='1600' data-height='1067'><img src='" + src + "'></a>");

      sliderThmb.on('change.owl.carousel', function (event) {
        console.log(event);
        let current = event.item.index;
        let src = sliderThmb.find(".owl-item").eq(current).find("a").attr('href');
        image = $("#sliderPic").find("img");
        image.fadeOut('fast', function () {
          image.attr('src', src);
          image.fadeIn('fast');
          $("#sliderPic").find("a").attr("href",src);
        });
      });
      $('#sliderPrev').on("click",function() {
        sliderThmb.trigger('prev.owl.carousel', [300]);
      });
      $('#sliderNext').on("click",function() {
        sliderThmb.trigger('next.owl.carousel', [300]);
      });
      sliderThmb.find("a").on("click",function(e){
        e.preventDefault();
        let src = $(this).attr('href');
        image = $("#sliderPic").find("img");
        image.fadeOut('fast', function () {
          image.attr('src', src);
          image.fadeIn('fast');
          $("#sliderPic").find("a").attr("href",src);
        });
      });
      $("#sliderPic [data-fancybox]").fancybox({
        padding: 0,
        clickContent : function( current, event ) {
          return current.type === 'image' ? 'zoom' : false;
        },
      });
    }
  });
});