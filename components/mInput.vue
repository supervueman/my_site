<template lang="pug">
  .input--wrapper
    input.input(
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :required="required"
    )
    .input--footer(
      v-html="footerText"
      v-if="footerText"
    )
</template>

<script>
export default {
  name: "MInputComponent",

  props: {
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    footerText: {
      type: String,
      default: ""
    }
  },

  methods: {
    inputVal($event) {
      console.log($event.target.value);
    }
  }
};
</script>
