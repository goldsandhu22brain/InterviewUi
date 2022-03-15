/* Sticky Header */
$(window).scroll(function() {
 if ($(this).scrollTop() > 100){  
    $('header').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
  }
});





$(document).ready(function(){

$('.quiz').owlCarousel({
    loop:true,
	center: true,
	autoplay:true,
    margin:20,
    nav:false,
	dots: false,
	autoplayTimeout:4000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});
});

$(document).ready(function(){
$('.review').owlCarousel({
    loop:true,
	center: true,
	autoplay:true,
    margin:20,
    nav:false,
	dots: false,
	autoplayTimeout:4000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
});



// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();




$('body').on("click touchstart", "#Button1", function(e){
   $("#logindisplay, #forgethide").toggle();
});
$('body').on("click touchstart", "#Button2", function(e){
   $("#forgethide, #logindisplay").toggle();
});

$(document).ready(function(){
$("input").val()

});

$(document).ready(function(){
wow = new WOW();

wow.init();
    
    });




function myFunction() {
  var input, filter, div, span, li, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myTable");
  span = div.getElementsByTagName("span");
  for (i = 0; i < span.length; i++) {
    li = span[i].getElementsByTagName("li")[0];
    if (li) {
      txtValue = li.textContent || li.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        span[i].style.display = "";
      } else {
        span[i].style.display = "none";
      }
    }       
  }
}

 $(document).ready(function() {
 
  $('#summernote').summernote({
        placeholder: 'Mail Body',
        tabsize: 2,
        height: 120,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']]
        ]
      });
 
   });

 $(document).ready(function() {
     
  $("#custom-time").timezones();
     
        });

