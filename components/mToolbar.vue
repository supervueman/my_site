<template lang="pug">
  header.toolbar.justify-end.align-center
    a.link.js-button(
      @click.prevent="moveTo('#about-section')"
    )
      span.arr-literal [
      span.quote-double "
      span.string About
      span.quote-double "
      span.arr-literal ]
    a.link.js-button(
      @click.prevent="moveTo('#skills-section')"
    )
      span.arr-literal [
      span.quote-double "
      span.string Skills
      span.quote-double "
      span.arr-literal ]
    a.link.js-button(
      @click.prevent="moveTo('#works-section')"
    )
      span.arr-literal [
      span.quote-double "
      span.string Works
      span.quote-double "
      span.arr-literal ]
    a.link.js-button(
      @click.prevent="moveTo('#contacts-section')"
    )
      span.arr-literal [
      span.quote-double "
      span.string Contacts
      span.quote-double "
      span.arr-literal ]
</template>

<script>
export default {
  name: "MToolbar",

  methods: {
    moveTo(selector) {
      window.LocomotiveScroll.scrollTo(selector);
    }
  }
};
</script>
