$(document).ready(function () {
  const show_percent = true;
  var progressBars = $(".progress-bar");
  for (i = 0; i < progressBars.length; i++) {
    var progress = $(progressBars[i]).attr("aria-valuenow");
    $(progressBars[i]).width(progress + "%");
    if (show_percent) {
      $(progressBars[i]).text(progress + "%");
    }
    if (progress >= "90") {
      //90 and above
      $(progressBars[i]).addClass("bg-success");
    } else if (progress >= "30" && progress < "45") {
      $(progressBars[i]).addClass("bg-warning"); //From 30 to 44
    } else if (progress >= "45" && progress < "90") {
      $(progressBars[i]).addClass("bg-info"); //From 45 to 89
    } else {
      //29 and under
      $(progressBars[i]).addClass("bg-danger");
    }
  }
});