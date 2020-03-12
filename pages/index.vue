<template lang="pug">
  main.main
    section.section.section--full-screen#main-section(
      data-scroll-call="mainSection"
      data-scroll
    )
      .container
        h1.title.title--main Hi, my name is
          span.text_red  Rinat.
        h1.title.title--main I'm a
          span.text_red  fullstack
          span  web developer.

    section.section#about-section(
      data-scroll-call="aboutSection"
      data-scroll
    )
      .container
        .grid.grid-2
          .section--block.d-flex.f-column.align-start.justify-center
            h2.section--title
              span.text_red ABOUT
              span  ME
            .section--text
              p Hi, my name is Rinat and i'm a fullstack web developer.
              p Долгое время я работал в сфере строительства на разных специальностях от инженера-проектировщика до начальника участка, пока в 2017 году не решил сменить профессию.
              p В данный момент я работаю в студии MULTIKEY специализирующейся на разработке сайтов, интернет-магазинов и сервисов на современных, прогрессивных технологиях.
              p Так же занимаюсь разработкой своих личных проектов таких как платформа
                a.link.text_red.js-button  VN-CMS
                span , сервис
                a.link.text_red.js-button  SCRUMDESK
                span  и другие.
          .section--block
            .item--image
              img(src="/images/avatar.jpg", alt="I am")

    m-skills

    section.section.f-column#works-section(
      data-scroll-call="worksSection"
      data-scroll
    )
      .container
        h2.section--title MY
          span.text_red  WORKS
      .container
        .grid.grid-2
          m-card.card(
            v-for="(item, i) in cases"
            :key="i"
            :item="item"
          )

    section.section#contacts-section(
      data-scroll-call="contactsSection"
      data-scroll
    )
      .container
        .grid.grid-2
          m-form
          m-contacts
</template>

<script>
import { mapGetters } from "vuex";

import mSkills from "@/components/mSkills";
import mCard from "@/components/mCard";
import mForm from "@/components/mForm";
import mContacts from "@/components/mContacts";

export default {
  name: "IndexPage",

  components: {
    mSkills,
    mCard,
    mForm,
    mContacts
  },

  data: () => ({
    cases: [
      {
        title: "VN-CMS",
        tag: "#cms",
        image: "case-1.png",
        link: ""
      },
      {
        title: "Labberry",
        tag: "#ecomerse",
        image: "case-2.png",
        link: ""
      },
      {
        title: "Profitsmart",
        tag: "#promosite",
        image: "case-3.png",
        link: ""
      },
      {
        title: "Kraft",
        tag: "#ecomerse",
        image: "case-4.png",
        link: ""
      }
    ]
  }),

  computed: {
    ...mapGetters("dictionary", ["dictionary"])
  },

  mounted() {
    if (process.client) {
      if (!localStorage.getItem("theme")) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          this.$store.dispatch("fetchTheme", "dark");
        } else {
          this.$store.dispatch("fetchTheme", "light");
        }
      } else {
        this.$store.dispatch("fetchTheme", localStorage.getItem("theme"));
      }
      document.body.classList.add(`theme--${this.$store.getters.getTheme}`);
    }
  }
};
</script>
