const mixin = {
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      window.LocomotiveScroll.scrollTo("#top--element");
    }, 500);
    next();
  },
  mounted() {
    if (process.client) {
      setTimeout(() => {
        window.LocomotiveScroll.update();
      }, 100);
    }
  }
};

export default mixin;
