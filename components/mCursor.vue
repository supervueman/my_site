<template lang="pug">
  .cursor(
    :style="{left: `${coord.x-size.width/2}px`, top: `${coord.y-size.height/2}px`, width: `${size.width}px`, height: `${size.height}px`}"
    :class="[{'cursor-active': text !== '' && text !== null}, cursorClass]"
  )
    svg(:height="size.height" :width="size.width")
      circle(:cx="size.width / 2" :cy="size.height / 2" :r="size.width / 2" stroke-width="0")
    span.cursor-target(v-html="text")
</template>

<script>
import { TweenLite, Linear } from "gsap";

export default {
  name: "MCursorComponent",

  data() {
    return {
      coord: {
        x: 0,
        y: 0
      },
      text: "",
      size: {
        width: 10,
        height: 10
      },
      cursorClass: ""
    };
  },

  mounted() {
    this.move();
  },

  methods: {
    move() {
      window.addEventListener("mousemove", event => {
        this.text = event.target.getAttribute("data-cursor-text");
        this.cursorClass = event.target.getAttribute("data-cursor-class");

        const width = event.target.getAttribute("data-cursor-width");
        const height = event.target.getAttribute("data-cursor-height");

        if (width && height) {
          TweenLite.to(this.size, 0.3, {
            width,
            ease: Linear.ease
          });
          TweenLite.to(this.size, 0.3, {
            height,
            ease: Linear.ease
          });
        } else {
          TweenLite.to(this.size, 0.5, {
            width: 10,
            ease: Linear.ease
          });
          TweenLite.to(this.size, 0.5, {
            height: 10,
            ease: Linear.ease
          });
        }
        TweenLite.to(this.coord, 0.5, {
          x: event.x,
          ease: Linear.ease
        });
        TweenLite.to(this.coord, 0.5, {
          y: event.y,
          ease: Linear.ease
        });
      });
    }
  }
};
</script>
