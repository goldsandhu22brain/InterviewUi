// Brand Slider
$(function () {
    $('.brands-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: false,
        autoplay: false,
        autoplayTimeout: 3000,

        responsive: {
            0: {
                items: 3.5
            },
            600: {
                items: 4.5
            },
            768: {
                items: 6.5
            },

            992: {
                items: 6,
                autoplay: true,
            },
            1200: {
                items: 8
            }
        }
    })
})

// Best Courses Slider

$(function () {
    $('.best-courses-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 2
            },

            992: {
                items: 3,
                autoplay: true,
            },
            1200: {
                items: 3
            }
        }
    })
})

// Best Courses Slider
$(function () {
    $('.testimonials-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        items: 1,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"]
    })
});


////



$(document).ready(function () {
    $(".marquee-slider").owlCarousel({
        autoplay: true,
        items: 6,
        margin: 10,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 5000,
        fluidSpeed: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsMobile: [479, 1],
        navigation: false,
        dots: false,
        loop: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            768: {
                items: 4
            },

            992: {
                items: 6,
                autoplay: true,
            },
            1200: {
                items: 6
            }
        }
    });


});


$(document).ready(function () {
    $(".marquee-tow-slider").owlCarousel({
        rtl: true,
        autoplay: true,
        items: 6,
        margin: 10,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 5000,
        fluidSpeed: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsMobile: [479, 1],
        navigation: false,
        dots: false,
        loop: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            768: {
                items: 4
            },

            992: {
                items: 6,
                autoplay: true,
            },
            1200: {
                items: 6
            }
        }
    });

});

//Details Page slider
$(function () {
    $('.brands-section-slider .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 2
            },

            992: {
                items: 3,
                autoplay: true,
            },
            1200: {
                items: 4
            }
        }
    })
})

// Show the first tab and hide the rest
$(function () {

    $('#tabs-nav li:first-child').addClass('active');
    $('.tab-content').hide();
    $('.tab-content:first-child').show();


    // Click function
    $('#tabs-nav li').click(function () {
        $('#tabs-nav li').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').hide();

        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
    });

})




/* ========================================== 
MENU RESPONSIVE
========================================== */
$(function () {
    const header = $('header').outerHeight();
    console.log(header);
    const burgerMenu = document.getElementById("burger");
    const navbarMenu = document.getElementById("menu-nav");

    // Show and Hide Navbar Menu
    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("is-active");
        navbarMenu.classList.toggle("is-active");

        if (navbarMenu.classList.contains("is-active")) {
            //   navbarMenu.style.height = 400+ "px";
            $("#menu").css("height", "calc(100vh - " + header + "px)")
            //  navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";

        } else {
            navbarMenu.removeAttribute("style");
        }
    });
});




/*
 * jQuery Pagination
 * Author: Austin Wulf (@austinwulf)
 *
 * Call the paginate method on an array
 * of elements. Accepts # of items per page
 * as an argument. Defaults to 5.
 *
 * Example:
 *     $(selector).paginate(3);
 *
 * Released under the MIT License.
 *
 * v 1.0
 */

(function ($) {

    var paginate = {
        startPos: function (pageNumber, perPage) {
            // determine what array position to start from
            // based on current page and # per page
            return pageNumber * perPage;
        },

        getPage: function (items, startPos, perPage) {
            // declare an empty array to hold our page items
            var page = [];

            // only get items after the starting position
            items = items.slice(startPos, items.length);

            // loop remaining items until max per page
            for (var i = 0; i < perPage; i++) {
                page.push(items[i]);
            }

            return page;
        },

        totalPages: function (items, perPage) {
            // determine total number of pages
            return Math.ceil(items.length / perPage);
        },

        createBtns: function (totalPages, currentPage) {
            // create buttons to manipulate current page
            var pagination = $('<div class="pagination" />');

            // add a "first" button
            pagination.append('<span class="pagination-button"><i class="far fa-angle-left"></i></span>');

            // add pages inbetween
            for (var i = 1; i <= totalPages; i++) {
                // truncate list when too large
                if (totalPages > 5 && currentPage !== i) {
                    // if on first two pages
                    if (currentPage === 1 || currentPage === 2) {
                        // show first 5 pages
                        if (i > 5) continue;
                        // if on last two pages
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                        // show last 5 pages
                        if (i < totalPages - 4) continue;
                        // otherwise show 5 pages w/ current in middle
                    } else {
                        if (i < currentPage - 2 || i > currentPage + 2) {
                            continue;
                        }
                    }
                }

                // markup for page button
                var pageBtn = $('<span class="pagination-button page-num" />');

                // add active class for current page
                if (i == currentPage) {
                    pageBtn.addClass('active');
                }

                // set text to the page number
                pageBtn.text(i);

                // add button to the container
                pagination.append(pageBtn);
            }

            // add a "last" button
            pagination.append($('<span class="pagination-button"><i class="far fa-angle-right"></i></span>'));

            return pagination;
        },

        createPage: function (items, currentPage, perPage) {
            // remove pagination from the page
            $('.pagination').remove();

            // set context for the items
            var container = items.parent(),
                // detach items from the page and cast as array
                items = items.detach().toArray(),
                // get start position and select items for page
                startPos = this.startPos(currentPage - 1, perPage),
                page = this.getPage(items, startPos, perPage);

            // loop items and readd to page
            $.each(page, function () {
                // prevent empty items that return as Window
                if (this.window === undefined) {
                    container.append($(this));
                }
            });

            // prep pagination buttons and add to page
            var totalPages = this.totalPages(items, perPage),
                pageButtons = this.createBtns(totalPages, currentPage);

            container.after(pageButtons);
        }
    };

    // stuff it all into a jQuery method!
    $.fn.paginate = function (perPage) {
        var items = $(this);

        // default perPage to 5
        if (isNaN(perPage) || perPage === undefined) {
            perPage = 5;
        }

        // don't fire if fewer items than perPage
        if (items.length <= perPage) {
            return true;
        }

        // ensure items stay in the same DOM position
        if (items.length !== items.parent()[0].children.length) {
            items.wrapAll('<div class="pagination-items" />');
        }

        // paginate the items starting at page 1
        paginate.createPage(items, 1, perPage);

        // handle click events on the buttons
        $(document).on('click', '.pagination-button', function (e) {
            // get current page from active button
            var currentPage = parseInt($('.pagination-button.active').text(), 10),
                newPage = currentPage,
                totalPages = paginate.totalPages(items, perPage),
                target = $(e.target);

            // get numbered page
            newPage = parseInt(target.text(), 10);
            if (target.text() == '«') newPage = 1;
            if (target.text() == '»') newPage = totalPages;

            // ensure newPage is in available range
            if (newPage > 0 && newPage <= totalPages) {
                paginate.createPage(items, newPage, perPage);
            }
        });
    };

})(jQuery);
/* This part is just for the demo,
not actually part of the plugin */
$('.listing-page-content .list-item').paginate(12);
$('.details-page-list .list-item').paginate(4);



// Catagary on  click function
$(document).ready(function () {
    $(".dropdown-selected").click(function () {
        $(".dropdown-selected-box").toggleClass("d-flex");
        $(".dropdown-selected").toggleClass("clickitem-box");
    });

});





//////////////////////////////////

$(document).ready(function () {
    $(".filter-box").click(function () {
        $(".filter-box-row-downs-total-box").slideToggle("slow");
    });
});

// The function toggles more (hidden) text when the user clicks on "Read more". The IF ELSE statement ensures that the text 'read more' and 'read less' changes interchangeably when clicked on.
$(document).ready(function () {
    $('.moreless-button').click(function () {
        $('.moretext').slideToggle();
        if ($('.moreless-button').text() == "Show Less -") {
            $(this).text("Show More +")
        } else {
            $(this).text("Show Less -")
        }
    });
});