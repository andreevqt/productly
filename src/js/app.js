import $ from "jquery";
import "slick-carousel";
import LazyLoad from "vanilla-lazyload";

new LazyLoad({
  elements_selector: ".lazy"
});

$(() => {
  const body = $(document.body);

  $(".b-header__toggle").click(() => {
    body.toggleClass("mobile-menu-is-shown");
  });

  const affix = $(".affix");
  const handleAffix = () => {
    affix.each((index, elem) => {
      const offset = $(elem).position().top;
      if ($(window).scrollTop() > offset) {
        affix.addClass("affix--active");
      } else {
        affix.removeClass("affix--active");
      }
    })
  }
  handleAffix();
  $(window).scroll(handleAffix);

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