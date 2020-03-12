<template lang="pug">
  .section--block
    h2.section--title
      span.text_red WRITE
      span  ME
    form.form
      .form--group
        .form--element
          span
            span.text_red your
            span .
            span.text_blue name
          span
            span =
            span  "
            span
              m-input(
                :value="name"
                @input="name = $event"
              )
            span ";
        .form--element
          span
            span.text_red your
            span .
            span.text_blue mail
          span
            span =
            span  "
            span
              m-input(
                :value="email"
                @input="email = $event"
                :class="{'input--error': emailErrors.length > 0}"
                :required="true"
                :footerText="emailErrors[0]"
              )
            span ";
        .form--element
          span
            span.text_red your
            span .
            span.text_blue message
          span
            span =
            span  "
            span
              m-input(
                :value="message"
                @input="message = $event"
              )
            span ";
      .form--actions.d-flex.align-center.justify-end
        .button(
          @click="send"
          data-cursor-text=""
          data-cursor-class="cursor-button-link"
          :data-cursor-width="60"
          :data-cursor-height="60"
        )
          span.text_yellow(
            data-cursor-text=""
            data-cursor-class="cursor-button-link"
            :data-cursor-width="60"
            :data-cursor-height="60"
          ) sendMail()
          span ;
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

import mInput from "@/components/mInput";

export default {
  name: "MForm",

  components: {
    mInput
  },

  mixins: [validationMixin],

  validations: {
    email: {
      required,
      email
    }
  },

  data: () => ({
    name: "",
    email: "",
    message: ""
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail is not valid!");
      !this.$v.email.required && errors.push("Required field!");
      return errors;
    }
  },

  methods: {
    async send() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      const html = `
        <table>
          <tr>
            <td>NAME:</td>
            <td>${this.name}</td>
          </tr>

          <tr>
            <td>E-MAIL:</td>
            <td>${this.email}</td>
          </tr>

          <tr>
            <td>MESSAGE:</td>
            <td>${this.message}</td>
          </tr>
        </table>
      `;

      const data = {
        from: "<chaogen2@example.com>",
        to: "chaogen2@gmail.com", // help@multikey.studio
        subject: "Application from the site",
        text: "Application from the site",
        html
      };

      const response = await this.$axios.$post("/mail", data).catch(err => {
        console.log(err);
      });

      if (response && response.message === "OK") {
        this.name = "";
        this.email = "";
        this.message = "";
      }
    }
  }
};
</script>
