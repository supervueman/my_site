import Vue from 'vue';

Vue.mixin({
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  }
});
