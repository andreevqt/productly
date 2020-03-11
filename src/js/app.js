import $ from "jquery";

$(() => {
  const body = $(document.body);
  $(".b-header__toggle").click(() => {
    body.toggleClass("mobile-menu-is-shown");
  });
})