import $ from "jquery";
import "slick-carousel";

$(() => {
  const body = $(document.body);
  $(".b-header__toggle").click(() => {
    body.toggleClass("mobile-menu-is-shown");
  });
  $(".news-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
  })
})