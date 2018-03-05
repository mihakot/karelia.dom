// require("jquery");
// require('bootstrap');

let thmb_dir = "assets/photo/thmb/";
let full_dir = "assets/photo/";
let fileextension = ".jpg";
$(function () {
  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: thmb_dir,
    success: function (data) {
      console.log(data);
      //List all .png file names in the page
      $(data).find("a:contains(" + fileextension + ")").each(function () {
        let filename = this.href.replace(window.location.host, "").replace("http://", "");
        $("#sliderThmb").append("<a href='" + full_dir + filename + "'><img src='" + thmb_dir + filename + "'></a>");
      });
    }
  });
});
console.log('This is karelia.js');