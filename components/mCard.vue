<template lang="pug">
  a.card(
    :href="item.link"
  )
    .card--header
      h3.card--title {{item.title}}
      .card--delimetr

    .card--media
      .item--image
        img(:src="`/images/${item.image}`", :alt="item.title")
    .card--footer
      p {{item.tag}}
</template>

<script>
export default {
  name: "MCard",

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
