<template>
  <div class="wrapper">
    <AppHeader />

    <div class="about-page page">
      <AboutHeader :data="getData?.Main_about" />
      <AboutServiceNew :data="getData?.About_us" />
      <AboutSlider :data="getData?.About_us?.Photo_about_us?.data" />
      <AboutDetails
        :data="getData?.Investor_block"
        :dataForm="getData?.Form_investor"
      />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/common/AppHeader.vue";
import AppFooter from "~/components/common/AppFooter.vue";
import AboutHeader from "~/components/about/AboutHeader.vue";
import AboutServiceNew from "~/components/about/AboutServiceNew.vue";
import AboutSlider from "~/components/about/AboutSlider.vue";
import AboutDetails from "~/components/about/AboutDetails.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter,
    AboutHeader,
    AboutServiceNew,
    AboutSlider,
    AboutDetails,
  },
  async asyncData({ store }) {
    await store.dispatch("aboutPage/getData");
  },
  computed: {
    ...mapGetters("aboutPage", ["getData"]),
  },
  head() {
    return {
      title: this.getData?.Meta_tags_about?.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getData?.Meta_tags_about?.Description,
        },
        {
          hid: "title",
          name: "title",
          content: this.getData?.Meta_tags_about?.Title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.getData?.Meta_tags_about?.Title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.getData?.Meta_tags_about?.Description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${this.getApiUrl()}${
            this.getData?.Meta_tags_about?.Open_graph_photo?.data?.attributes
              ?.url
          }`,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: process.env.hostUrl + this.$route.fullPath,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${process.env.hostUrl}` + `${this.$route.fullPath}`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
