import LocomotiveScroll from "locomotive-scroll";

if (process.client) {
  const scroll = new LocomotiveScroll({
    el: document.querySelector(".scroll-container"),
    smooth: true,
    smoothMobile: true
  });

  window.LocomotiveScroll = scroll;
}
