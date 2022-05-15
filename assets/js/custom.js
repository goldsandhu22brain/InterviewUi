/* Sticky Header */
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('header').addClass("sticky");
    }
    else {
        $('header').removeClass("sticky");
    }
});


$(document).ready(function () {
    $('.dropdown-submenu a.dropsub').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
});

$(document).ready(function () {
    $('.quiz').owlCarousel({
        loop: true,
        center: true,
        autoplay: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    $('.review').owlCarousel({
        loop: true,
        center: true,
        autoplay: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    
        // Portfolio Slider 
    $('.portfolio-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        nav: true,
        navText: [
            "<i class='fa fa-angle-left' aria-hidden='true'></i>",
            "<i class='fa fa-angle-right' aria-hidden='true'></i>"
        ],
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            }
        }
    })
});



// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function switchVisible() {
    $("#logindisplay").hide();
    $("#forgethide").show();
}

$('body').on("click touchstart", "#Button1", function (e) {
    $("#logindisplay, #forgethide").toggle();
});
$('body').on("click touchstart", "#Button2", function (e) {
    $("#forgethide, #logindisplay").toggle();
});

$(document).ready(function () {
    $("input").val()
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

$(document).ready(function () {
    if ($('#summernote') != null && $('#summernote').summernote != null) {

        $('#summernote').summernote({
            placeholder: 'Mail Body',
            tabsize: 2,
            height: 420,
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
    }
    if ($('#custom-time') != null && $('#custom-time').timezones != null) {
        $("#custom-time").timezones();
    }
});

$(function () {
    if ($('input[name="daterange"]') != null && $('input[name="daterange"]').daterangepicker != null) {
        $('input[name="daterange"]').daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            locale: {
                format: 'DD/MM/YYYY h:mm A'
            }
        });
    }
});


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})




    // BLog Post Carousel 
    $("#blog-post-carousel").owlCarousel({
        // BLog Post Carousel Settings
        navigation: false,
         items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        slideSpeed: 2000,
        paginationSpeed: 1000,
        singleItem: true,
        pagination: false,
        autoPlay: true,
        stopOnHover: true,
    });




/*!
 * Clone question
 *
 */


function Clone() {
  var clone = document.getElementById('thediv').cloneNode(true); // "deep" clone
  document.getElementById("main-ques").appendChild(clone);
}

function Delete(button) {
  var parent = button.parentNode;
  var grand_father = parent.parentNode;
  grand_father.removeChild(parent);
}


/*!
 * Clone question
 *
 */




/*!
 * Particleground
 *
 */
 if ( document.getElementById("particles") != null ) {


 document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#ffffff',
    lineColor: '#ffffff'
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 1 + 'px';
}, false);



;(function(window, document) {
  "use strict";
  var pluginName = 'particleground';

  function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  };

  var $ = window.jQuery;

  function Plugin(element, options) {
    var canvasSupport = !!document.createElement('canvas').getContext;
    var canvas;
    var ctx;
    var particles = [];
    var raf;
    var mouseX = 0;
    var mouseY = 0;
    var winW;
    var winH;
    var desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
    var orientationSupport = !!window.DeviceOrientationEvent;
    var tiltX = 0;
    var pointerX;
    var pointerY;
    var tiltY = 0;
    var paused = false;

    options = extend({}, window[pluginName].defaults, options);

    /**
     * Init
     */
    function init() {
      if (!canvasSupport) { return; }

      //Create canvas
      canvas = document.createElement('canvas');
      canvas.className = 'pg-canvas';
      canvas.style.display = 'block';
      element.insertBefore(canvas, element.firstChild);
      ctx = canvas.getContext('2d');
      styleCanvas();

      // Create particles
      var numParticles = Math.round((canvas.width * canvas.height) / options.density);
      for (var i = 0; i < numParticles; i++) {
        var p = new Particle();
        p.setStackPos(i);
        particles.push(p);
      };

      window.addEventListener('resize', function() {
        resizeHandler();
      }, false);

      document.addEventListener('mousemove', function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      }, false);

      if (orientationSupport && !desktop) {
        window.addEventListener('deviceorientation', function () {
          // Contrain tilt range to [-30,30]
          tiltY = Math.min(Math.max(-event.beta, -30), 30);
          tiltX = Math.min(Math.max(-event.gamma, -30), 30);
        }, true);
      }

      draw();
      hook('onInit');
    }

    /**
     * Style the canvas
     */
    function styleCanvas() {
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      ctx.fillStyle = options.dotColor;
      ctx.strokeStyle = options.lineColor;
      ctx.lineWidth = options.lineWidth;
    }

    /**
     * Draw particles
     */
    function draw() {
      if (!canvasSupport) { return; }

      winW = window.innerWidth;
      winH = window.innerHeight;

      // Wipe canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particle positions
      for (var i = 0; i < particles.length; i++) {
        particles[i].updatePosition();
      };
      // Draw particles
      for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
      };

      // Call this function next time screen is redrawn
      if (!paused) {
        raf = requestAnimationFrame(draw);
      }
    }

    /**
     * Add/remove particles.
     */
    function resizeHandler() {
      // Resize the canvas
      styleCanvas();

      var elWidth = element.offsetWidth;
      var elHeight = element.offsetHeight;

      // Remove particles that are outside the canvas
      for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].position.x > elWidth || particles[i].position.y > elHeight) {
          particles.splice(i, 1);
        }
      };

      // Adjust particle density
      var numParticles = Math.round((canvas.width * canvas.height) / options.density);
      if (numParticles > particles.length) {
        while (numParticles > particles.length) {
          var p = new Particle();
          particles.push(p);
        }
      } else if (numParticles < particles.length) {
        particles.splice(numParticles);
      }

      // Re-index particles
      for (i = particles.length - 1; i >= 0; i--) {
        particles[i].setStackPos(i);
      };
    }

    /**
     * Pause particle system
     */
    function pause() {
      paused = true;
    }

    /**
     * Start particle system
     */
    function start() {
      paused = false;
      draw();
    }

    /**
     * Particle
     */
    function Particle() {
      this.stackPos;
      this.active = true;
      this.layer = Math.ceil(Math.random() * 3);
      this.parallaxOffsetX = 0;
      this.parallaxOffsetY = 0;
      // Initial particle position
      this.position = {
        x: Math.ceil(Math.random() * canvas.width),
        y: Math.ceil(Math.random() * canvas.height)
      }
      // Random particle speed, within min and max values
      this.speed = {}
      switch (options.directionX) {
        case 'left':
          this.speed.x = +(-options.maxSpeedX + (Math.random() * options.maxSpeedX) - options.minSpeedX).toFixed(2);
          break;
        case 'right':
          this.speed.x = +((Math.random() * options.maxSpeedX) + options.minSpeedX).toFixed(2);
          break;
        default:
          this.speed.x = +((-options.maxSpeedX / 2) + (Math.random() * options.maxSpeedX)).toFixed(2);
          this.speed.x += this.speed.x > 0 ? options.minSpeedX : -options.minSpeedX;
          break;
      }
      switch (options.directionY) {
        case 'up':
          this.speed.y = +(-options.maxSpeedY + (Math.random() * options.maxSpeedY) - options.minSpeedY).toFixed(2);
          break;
        case 'down':
          this.speed.y = +((Math.random() * options.maxSpeedY) + options.minSpeedY).toFixed(2);
          break;
        default:
          this.speed.y = +((-options.maxSpeedY / 2) + (Math.random() * options.maxSpeedY)).toFixed(2);
          this.speed.x += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY;
          break;
      }
    }

    /**
     * Draw particle
     */
    Particle.prototype.draw = function() {
      // Draw circle
      ctx.beginPath();
      ctx.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, options.particleRadius / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      // Draw lines
      ctx.beginPath();
      // Iterate over all particles which are higher in the stack than this one
      for (var i = particles.length - 1; i > this.stackPos; i--) {
        var p2 = particles[i];

        // Pythagorus theorum to get distance between two points
        var a = this.position.x - p2.position.x
        var b = this.position.y - p2.position.y
        var dist = Math.sqrt((a * a) + (b * b)).toFixed(2);

        // If the two particles are in proximity, join them
        if (dist < options.proximity) {
          ctx.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY);
          if (options.curvedLines) {
            ctx.quadraticCurveTo(Math.max(p2.position.x, p2.position.x), Math.min(p2.position.y, p2.position.y), p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
          } else {
            ctx.lineTo(p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
          }
        }
      }
      ctx.stroke();
      ctx.closePath();
    }

    /**
     * update particle position
     */
    Particle.prototype.updatePosition = function() {
      if (options.parallax) {
        if (orientationSupport && !desktop) {
          // Map tiltX range [-30,30] to range [0,winW]
          var ratioX = (winW - 0) / (30 - -30);
          pointerX = (tiltX - -30) * ratioX + 0;
          // Map tiltY range [-30,30] to range [0,winH]
          var ratioY = (winH - 0) / (30 - -30);
          pointerY = (tiltY - -30) * ratioY + 0;
        } else {
          pointerX = mouseX;
          pointerY = mouseY;
        }
        // Calculate parallax offsets
        this.parallaxTargX = (pointerX - (winW / 2)) / (options.parallaxMultiplier * this.layer);
        this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10; // Easing equation
        this.parallaxTargY = (pointerY - (winH / 2)) / (options.parallaxMultiplier * this.layer);
        this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10; // Easing equation
      }

      var elWidth = element.offsetWidth;
      var elHeight = element.offsetHeight;

      switch (options.directionX) {
        case 'left':
          if (this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
            this.position.x = elWidth - this.parallaxOffsetX;
          }
          break;
        case 'right':
          if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth) {
            this.position.x = 0 - this.parallaxOffsetX;
          }
          break;
        default:
          // If particle has reached edge of canvas, reverse its direction
          if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth || this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
            this.speed.x = -this.speed.x;
          }
          break;
      }

      switch (options.directionY) {
        case 'up':
          if (this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
            this.position.y = elHeight - this.parallaxOffsetY;
          }
          break;
        case 'down':
          if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight) {
            this.position.y = 0 - this.parallaxOffsetY;
          }
          break;
        default:
          // If particle has reached edge of canvas, reverse its direction
          if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight || this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
            this.speed.y = -this.speed.y;
          }
          break;
      }

      // Move particle
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }

    /**
     * Setter: particle stacking position
     */
    Particle.prototype.setStackPos = function(i) {
      this.stackPos = i;
    }

    function option (key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }

    function destroy() {
      console.log('destroy');
      canvas.parentNode.removeChild(canvas);
      hook('onDestroy');
      if ($) {
        $(element).removeData('plugin_' + pluginName);
      }
    }

    function hook(hookName) {
      if (options[hookName] !== undefined) {
        options[hookName].call(element);
      }
    }

    init();

    return {
      option: option,
      destroy: destroy,
      start: start,
      pause: pause
    };
  }

  window[pluginName] = function(elem, options) {
    return new Plugin(elem, options);
  };

  window[pluginName].defaults = {
    minSpeedX: 0.1,
    maxSpeedX: 0.7,
    minSpeedY: 0.1,
    maxSpeedY: 0.7,
    directionX: 'center', // 'center', 'left' or 'right'. 'center' = dots bounce off edges
    directionY: 'center', // 'center', 'up' or 'down'. 'center' = dots bounce off edges
    density: 10000, // How many particles will be generated: one particle every n pixels
    dotColor: '#666666',
    lineColor: '#666666',
    particleRadius: 7, // Dot size
    lineWidth: 1,
    curvedLines: false,
    proximity: 100, // How close two dots need to be before they join
    parallax: true,
    parallaxMultiplier: 5, // The lower the number, the more extreme the parallax effect
    onInit: function() {},
    onDestroy: function() {}
  };

  // nothing wrong with hooking into jQuery if it's there...
  if ($) {
    $.fn[pluginName] = function(options) {
      if (typeof arguments[0] === 'string') {
        var methodName = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var returnVal;
        this.each(function() {
          if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
            returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
          }
        });
        if (returnVal !== undefined){
          return returnVal;
        } else {
          return this;
        }
      } else if (typeof options === "object" || !options) {
        return this.each(function() {
          if (!$.data(this, 'plugin_' + pluginName)) {
            $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
          }
        });
      }
    };
  }

})(window, document);

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
}());
     
 }
/*!
 * Particleground End
 *
 */

$(document).ready(function(){
  $('.dropdown-submenu a.dropsub').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});


/* Code for previous and next buttons */
$(function() {
    var nextBtn = $("#nextBtn"),
        prevBtn = $("#prevBtn");
  
    nextBtn.on('click', function(e) {
        var active = $(".active");
        var next = active.next('.case');
        if (next.length) {
            active.removeClass('active');
            next.addClass('active');
        }
    });
    prevBtn.on('click', function(e) {
        var active = $(".active");
        var prev = active.prev('.case');
        if (prev.length) {
            active.removeClass('active');
            prev.addClass('active');
        }
    });
});




// FAQ Accordion JS
	$('.accordion').find('.accordion-title').on('click', function(){
		// Adds Active Class
		$(this).toggleClass('active');
		// Expand or Collapse This Panel
		$(this).next().slideToggle('fast');
		// Hide The Other Panels
		$('.accordion-content').not($(this).next()).slideUp('fast');
		// Removes Active Class From Other Titles
		$('.accordion-title').not($(this)).removeClass('active');		
	});

(function($) {
    $(function() {
        window.fs_test = $('.test').fSelect();
    });
})(jQuery);






/* fSelect 1.0.1 - https://github.com/mgibbs189/fselect */

(function($) {

    String.prototype.unaccented = function() {
        var accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];
        var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

        var str = this;
        for (var i = 0; i < accent.length; i++) {
            str = str.replace(accent[i], noaccent[i]);
        }

        return str;
    }

    $.fn.fSelect = function(options) {

        if ('string' === typeof options) {
            var settings = options;
        }
        else {
            var settings = $.extend({
                placeholder: 'Select some options',
                numDisplayed: 3,
                overflowText: '{n} selected',
                searchText: 'Search',
                noResultsText: 'No results found',
                showSearch: true,
                optionFormatter: false
            }, options);
        }


        /**
         * Constructor
         */
        function fSelect(select, settings) {
            this.$select = $(select);
            this.settings = settings;
            this.create();
        }


        /**
         * Prototype class
         */
        fSelect.prototype = {
            create: function() {
                this.idx = 0;
                this.optgroup = 0;
                this.selected = [].concat(this.$select.val()); // force an array
                this.settings.multiple = this.$select.is('[multiple]');

                var search_html = '';
                var no_results_html = '';
                var choices_html = this.buildOptions(this.$select);

                if (this.settings.showSearch) {
                    search_html = '<div class="fs-search"><input type="text" placeholder="' + this.settings.searchText + '" /></div>';
                }
                if ('' !== this.settings.noResultsText) {
                    no_results_html = '<div class="fs-no-results hidden">' + this.settings.noResultsText + '</div>';
                }

                var html = '<div class="fs-label-wrap"><div class="fs-label"></div><span class="fs-arrow"></span></div>';
                html += '<div class="fs-dropdown hidden">{search}{no-results}<div class="fs-options">' + choices_html + '</div></div>';
                html = html.replace('{search}', search_html);
                html = html.replace('{no-results}', no_results_html);

                this.$select.wrap('<div class="fs-wrap' + (this.settings.multiple ? ' multiple' : '') + '" tabindex="0" />');
                this.$select.addClass('hidden');
                this.$select.before(html);
                this.$wrap = this.$select.closest('.fs-wrap');
                this.$wrap.data('id', window.fSelect.num_items);
                window.fSelect.num_items++;

                this.reloadDropdownLabel();
            },

            reload: function() {
                this.destroy();
                this.create();
            },

            destroy: function() {
                this.$wrap.find('.fs-label-wrap').remove();
                this.$wrap.find('.fs-dropdown').remove();
                this.$select.unwrap().removeClass('hidden');
            },

            buildOptions: function($element) {
                var $this = this;

                var choices = '';
                $element.children().each(function(i, el) {
                    var $el = $(el);

                    if ('optgroup' == $el.prop('nodeName').toLowerCase()) {
                        choices += '<div class="fs-optgroup-label" data-group="' + $this.optgroup + '">' + $el.prop('label') + '</div>';
                        choices += $this.buildOptions($el);
                        $this.optgroup++;
                    }
                    else {
                        var val = $el.prop('value');
                        var classes = $el.attr('class');
                        classes = ('undefined' !== typeof classes) ? ' ' + classes : '';

                        // exclude the first option in multi-select mode
                        if (0 < $this.idx || '' != val || ! $this.settings.multiple) {
                            var disabled = $el.is(':disabled') ? ' disabled' : '';
                            var selected = -1 < $.inArray(val, $this.selected) ? ' selected' : '';
                            var group = ' g' + $this.optgroup;
                            var row = '<div class="fs-option' + selected + disabled + group + classes + '" data-value="' + val + '" data-index="' + $this.idx + '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">' + $el.html() + '</div></div>';

                            if ('function' === typeof $this.settings.optionFormatter) {
                                row = $this.settings.optionFormatter(row);
                            }

                            choices += row;
                            $this.idx++;
                        }
                    }
                });

                return choices;
            },

            reloadDropdownLabel: function() {
                var settings = this.settings;
                var labelText = [];

                this.$wrap.find('.fs-option.selected').each(function(i, el) {
                    labelText.push($(el).find('.fs-option-label').html());
                });

                if (labelText.length < 1) {
                    labelText = settings.placeholder;
                }
                else if (labelText.length > settings.numDisplayed) {
                    labelText = settings.overflowText.replace('{n}', labelText.length);
                }
                else {
                    labelText = labelText.join(', ');
                }

                this.$wrap.find('.fs-label').html(labelText);
                this.$wrap.toggleClass('fs-default', labelText === settings.placeholder);
            }
        }


        /**
         * Loop through each matching element
         */
        return this.each(function() {
            var data = $(this).data('fSelect');

            if (!data) {
                data = new fSelect(this, settings);
                $(this).data('fSelect', data);
            }

            if ('string' === typeof settings) {
                data[settings]();
            }
        });
    }


    /**
     * Events
     */
    window.fSelect = {
        'num_items': 0,
        'active_id': null,
        'active_el': null,
        'last_choice': null,
        'idx': -1
    };

    $(document).on('click', '.fs-option:not(.hidden, .disabled)', function(e) {
        var $wrap = $(this).closest('.fs-wrap');
        var $select = $wrap.find('select');
        var do_close = false;

        // prevent selections
        if ($wrap.hasClass('fs-disabled')) {
            return;
        }

        if ($wrap.hasClass('multiple')) {
            var selected = [];

            // shift + click support
            if (e.shiftKey && null != window.fSelect.last_choice) {
                var current_choice = parseInt($(this).attr('data-index'));
                var addOrRemove = ! $(this).hasClass('selected');
                var min = Math.min(window.fSelect.last_choice, current_choice);
                var max = Math.max(window.fSelect.last_choice, current_choice);

                for (i = min; i <= max; i++) {
                    $wrap.find('.fs-option[data-index='+ i +']')
                        .not('.hidden, .disabled')
                        .each(function() {
                            $(this).toggleClass('selected', addOrRemove);
                        });
                }
            }
            else {
                window.fSelect.last_choice = parseInt($(this).attr('data-index'));
                $(this).toggleClass('selected');
            }

            $wrap.find('.fs-option.selected').each(function(i, el) {
                selected.push($(el).attr('data-value'));
            });
        }
        else {
            var selected = $(this).attr('data-value');
            $wrap.find('.fs-option').removeClass('selected');
            $(this).addClass('selected');
            do_close = true;
        }

        $select.val(selected);
        $select.fSelect('reloadDropdownLabel');
        $select.change();

        // fire an event
        $(document).trigger('fs:changed', $wrap);

        if (do_close) {
            closeDropdown($wrap);
        }
    });

    $(document).on('keyup', '.fs-search input', function(e) {
        if (40 == e.which) { // down
            $(this).blur();
            return;
        }

        var $wrap = $(this).closest('.fs-wrap');
        var matchOperators = /[|\\{}()[\]^$+*?.]/g;
        var keywords = $(this).val().replace(matchOperators, '\\$&');

        $wrap.find('.fs-option, .fs-optgroup-label').removeClass('hidden');

        if ('' != keywords) {
            $wrap.find('.fs-option').each(function() {
                var regex = new RegExp(keywords.unaccented(), 'gi');
                var formatedValue = $(this).find('.fs-option-label').text().unaccented();

                if (null === formatedValue.match(regex)) {
                    $(this).addClass('hidden');
                }
            });

            $wrap.find('.fs-optgroup-label').each(function() {
                var group = $(this).attr('data-group');
                var num_visible = $(this).closest('.fs-options').find('.fs-option.g' + group + ':not(.hidden)').length;
                if (num_visible < 1) {
                    $(this).addClass('hidden');
                }
            });
        }

        setIndexes($wrap);
        checkNoResults($wrap);
    });

    $(document).on('click', function(e) {
        var $el = $(e.target);
        var $wrap = $el.closest('.fs-wrap');

        if (0 < $wrap.length) {

            // user clicked another fSelect box
            if ($wrap.data('id') !== window.fSelect.active_id) {
                closeDropdown();
            }

            // fSelect box was toggled
            if ($el.hasClass('fs-label') || $el.hasClass('fs-arrow')) {
                var is_hidden = $wrap.find('.fs-dropdown').hasClass('hidden');

                if (is_hidden) {
                    openDropdown($wrap);
                }
                else {
                    closeDropdown($wrap);
                }
            }
        }
        // clicked outside, close all fSelect boxes
        else {
            closeDropdown();
        }
    });

    $(document).on('keydown', function(e) {
        var $wrap = window.fSelect.active_el;
        var $target = $(e.target);

        // toggle the dropdown on space
        if ($target.hasClass('fs-wrap')) {
            if (32 == e.which || 13 == e.which) {
                e.preventDefault();
                $target.find('.fs-label').trigger('click');
                return;
            }
        }
        // preserve spaces during search
        else if (0 < $target.closest('.fs-search').length) {
            if (32 == e.which) {
                return;
            }
        }
        else if (null === $wrap) {
            return;
        }

        if (38 == e.which) { // up
            e.preventDefault();

            $wrap.find('.fs-option.hl').removeClass('hl');

            var $current = $wrap.find('.fs-option[data-index=' + window.fSelect.idx + ']');
            var $prev = $current.prevAll('.fs-option:not(.hidden, .disabled)');

            if ($prev.length > 0) {
                window.fSelect.idx = parseInt($prev.attr('data-index'));
                $wrap.find('.fs-option[data-index=' + window.fSelect.idx + ']').addClass('hl');
                setScroll($wrap);
            }
            else {
                window.fSelect.idx = -1;
                $wrap.find('.fs-search input').focus();
            }
        }
        else if (40 == e.which) { // down
            e.preventDefault();

            var $current = $wrap.find('.fs-option[data-index=' + window.fSelect.idx + ']');
            if ($current.length < 1) {
                var $next = $wrap.find('.fs-option:not(.hidden, .disabled):first');
            }
            else {
                var $next = $current.nextAll('.fs-option:not(.hidden, .disabled)');
            }

            if ($next.length > 0) {
                window.fSelect.idx = parseInt($next.attr('data-index'));
                $wrap.find('.fs-option.hl').removeClass('hl');
                $wrap.find('.fs-option[data-index=' + window.fSelect.idx + ']').addClass('hl');
                setScroll($wrap);
            }
        }
        else if (32 == e.which || 13 == e.which) { // space, enter
            e.preventDefault();

            $wrap.find('.fs-option.hl').click();
        }
        else if (27 == e.which) { // esc
            closeDropdown($wrap);
        }
    });

    function checkNoResults($wrap) {
        var addOrRemove = $wrap.find('.fs-option:not(.hidden)').length > 0;
        $wrap.find('.fs-no-results').toggleClass('hidden', addOrRemove);
    }

    function setIndexes($wrap) {
        $wrap.find('.fs-option.hl').removeClass('hl');
        $wrap.find('.fs-search input').focus();
        window.fSelect.idx = -1;
    }

    function setScroll($wrap) {
        var $container = $wrap.find('.fs-options');
        var $selected = $wrap.find('.fs-option.hl');

        var itemMin = $selected.offset().top + $container.scrollTop();
        var itemMax = itemMin + $selected.outerHeight();
        var containerMin = $container.offset().top + $container.scrollTop();
        var containerMax = containerMin + $container.outerHeight();

        if (itemMax > containerMax) { // scroll down
            var to = $container.scrollTop() + itemMax - containerMax;
            $container.scrollTop(to);
        }
        else if (itemMin < containerMin) { // scroll up
            var to = $container.scrollTop() - containerMin - itemMin;
            $container.scrollTop(to);
        }
    }

    function openDropdown($wrap) {
        window.fSelect.active_el = $wrap;
        window.fSelect.active_id = $wrap.data('id');
        window.fSelect.initial_values = $wrap.find('select').val();
        $(document).trigger('fs:opened', $wrap);
        $wrap.find('.fs-dropdown').removeClass('hidden');
        $wrap.addClass('fs-open');
        setIndexes($wrap);
        checkNoResults($wrap);
    }

    function closeDropdown($wrap) {
        if ('undefined' == typeof $wrap && null != window.fSelect.active_el) {
            $wrap = window.fSelect.active_el;
        }
        if ('undefined' !== typeof $wrap) {
            // only trigger if the values have changed
            var initial_values = window.fSelect.initial_values;
            var current_values = $wrap.find('select').val();
            if (JSON.stringify(initial_values) != JSON.stringify(current_values)) {
                $(document).trigger('fs:closed', $wrap);
            }
        }

        $('.fs-wrap').removeClass('fs-open');
        $('.fs-dropdown').addClass('hidden');
        window.fSelect.active_el = null;
        window.fSelect.active_id = null;
        window.fSelect.last_choice = null;
    }

})(jQuery);
