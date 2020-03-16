import $ from "jquery";
import "slick-carousel";

$(() => {
  const body = $(document.body);

  $(".b-header__toggle").click(() => {
    body.toggleClass("mobile-menu-is-shown");
  });

  $(".news-slider").slick({
    arrows: false,
    dots: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  });
})