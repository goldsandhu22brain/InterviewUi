



/* Sticky Header */
$(window).scroll(function() {
 if ($(this).scrollTop() > 100){  
    $('header').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
  }
});



// // updated 2019
// const input = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-btn");

// const expand = () => {
//   searchBtn.classList.toggle("close");
//   input.classList.toggle("square");
// };

// searchBtn.addEventListener("click", expand);




//  old version / jquery
//
// function expand() {
//   $(".search").toggleClass("close");
//   $(".input").toggleClass("square");
//   if ($('.search').hasClass('close')) {
//     $('input').focus();
//   } else {
//     $('input').blur();
//   }
// }
// $('button').on('click', expand);
//


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


// $(document).ready(function(){
// 	$('.feature a').click( function(event) {
// 				event.preventDefault();
// 				$(".btn-close").click();
// 			});
// });


// /* global bootstrap: false */
// (function () {
//   'use strict'
//   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//   tooltipTriggerList.forEach(function (tooltipTriggerEl) {
//     new bootstrap.Tooltip(tooltipTriggerEl)
//   })
// })()

// //your javascript goes here
// var currentTab = 0;
// document.addEventListener("DOMContentLoaded", function(event) {


// showTab(currentTab);

// });

// function showTab(n) {
// var x = document.getElementsByClassName("tab");
// x[n].style.display = "block";
// if (n == 0) {
// document.getElementById("prevBtn").style.display = "none";
// } else {
// document.getElementById("prevBtn").style.display = "inline";
// }
// if (n == (x.length - 1)) {
// document.getElementById("nextBtn").innerHTML = "Submit";
// } else {
// document.getElementById("nextBtn").innerHTML = "Next";
// }
// fixStepIndicator(n)
// }

// function nextPrev(n) {
// var x = document.getElementsByClassName("tab");
// if (n == 1 && !validateForm()) return false;
// x[currentTab].style.display = "none";
// currentTab = currentTab + n;
// if (currentTab >= x.length) {
// // document.getElementById("regForm").submit();
// // return false;
// //alert("sdf");
// document.getElementById("nextprevious").style.display = "none";
// document.getElementById("all-steps").style.display = "none";
// document.getElementById("register").style.display = "none";
// document.getElementById("text-message").style.display = "block";




// }
// showTab(currentTab);
// }

// function validateForm() {
// var x, y, i, valid = true;
// x = document.getElementsByClassName("tab");
// y = x[currentTab].getElementsByTagName("input");
// for (i = 0; i < y.length; i++) { if (y[i].value=="" ) { y[i].className +=" invalid" ; valid=false; } } if (valid) { document.getElementsByClassName("step")[currentTab].className +=" finish" ; } return valid; } function fixStepIndicator(n) { var i, x=document.getElementsByClassName("step"); for (i=0; i < x.length; i++) { x[i].className=x[i].className.replace(" active", "" ); } x[n].className +=" active" ; }



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

